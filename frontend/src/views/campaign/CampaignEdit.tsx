import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Icon, { IconSize, ICONS } from '../../components/SVG/Icon';

import api from '../../services/apiServices';

import './CampaignView.scss';

const CampaignEdit: React.FC = () => {
  const { id } = useParams();

  const { data: dataItem, isLoading } = useQuery(['campaignItem', id], () => api.data.fetchDataById('campaign', id || ''));

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const [imageName, setImageName] = useState('');

  useEffect(() => {
    if (!isLoading && dataItem) {
      setImageName(dataItem.image_name);
    }
  }, [dataItem, isLoading]);

  const initialEditValues = {
    id: dataItem?.id,
    title: dataItem?.title,
    content: dataItem?.content,
    link: dataItem?.link,
    image_name: dataItem?.image_name,
    image: dataItem?.image,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
    link: Yup.string().required('링크를 입력해주세요.'),
    image: Yup.mixed().required('입력하세요.'),
  });

  const editDataMutation = useMutation((values: any) => api.data.editCampaignData('campaign', values), {
    onSuccess: () => {
      window.location.pathname = '/campaign';
    },
  });

  const editDataImageUnchanged = useMutation((values: any) => api.data.editData('campaign', values), {
    onSuccess: () => {
      window.location.pathname = '/campaign';
    },
  });

  const toolBarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'bullet' }, { list: 'ordered' }, 'blockquote'],
    ['link', 'image'],
  ];

  const modules = {
    toolbar: toolBarOptions,
  };

  return (
    <div className="campaign-view">
      <div className="campaign-view__top">
        <div className="campaign-view__content">
          <div className="campaign-view__grid-head">
            <div className="campaign-view__title">
              <h2 className="gradual-color-transition">캠페인 작성</h2>
            </div>
          </div>
          <div className="form-container">
            <Formik
              enableReinitialize
              initialValues={initialEditValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (values.image !== dataItem.image) {
                  editDataMutation.mutate(values);
                } else {
                  editDataImageUnchanged.mutate(values);
                }
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">제목</label>
                      <Field type="text" id="title" name="title" />
                    </div>
                  </div>
                  <ErrorMessage name="title" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <Field id="content" name="content">
                        {({ field }: { field: { value: string; onChange: (e: any) => void } }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={(value) => field.onChange({ target: { name: 'content', value } })}
                            className="content-area"
                            modules={modules}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <ErrorMessage name="content" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="link">링크</label>
                      <Field type="text" id="link" name="link" />
                    </div>
                  </div>
                  <ErrorMessage name="link" component="div" className="error" />
                  <div className="file-input-container">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event: any) => {
                        setFieldValue('image', event.target.files[0]);
                        setImageName(event.target.files[0]?.name);
                      }}
                      ref={fileInputRef}
                    />
                    <button type="button" onClick={handleFileInput} className="inputButton">
                      대표이미지 첨부
                    </button>
                    {imageName && (
                      <div className="inputLabel">
                        <label>{imageName}</label>
                        <button
                          type="button"
                          className="removeInputButton"
                          onClick={() => {
                            setFieldValue('image', null);
                            setImageName('');
                          }}
                        >
                          <Icon component={ICONS.SQUARE_X} size={IconSize.MD} />
                        </button>
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="image" component="div" className="error" />
                  <div className="form-button">
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      등록
                    </button>
                    <button type="button" className="cancel-button" onClick={() => window.location.assign('/campaign')}>
                      취소
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignEdit;
