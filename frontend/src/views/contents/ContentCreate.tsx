import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/apiServices';

import './ContentView.scss';

const ContentCreate: React.FC = () => {
  const initialValues = {
    video: '',
    title: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    video: Yup.string().required('링크를 입력하세요.'),
    title: Yup.string().required('제목을 입력하세요.'),
    description: Yup.string().required('제내용을 입력하세요.'),
  });

  const createDataMutation = useMutation((values: any) => api.data.postData('content', values), {
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.', {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      window.location.assign('/content');
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
    <div className="content-view">
      <div className="content-view__top">
        <div className="content-view__content">
          <div className="content-view__table-head">
            <div className="content-view__title">
              <h2 className="gradual-color-transition">콘텐츠 작성</h2>
            </div>
          </div>
          <div className="form-container">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => createDataMutation.mutate(values)}
            >
              {({ isSubmitting }) => (
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">제목</label>
                      <Field type="text" id="title" name="title" placeholder="제목을 입력하세요. (공백포함 50자이내)" />
                    </div>
                  </div>
                  <ErrorMessage name="title" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="video">링크</label>
                      <Field type="text" id="video" name="video" placeholder="링크를 입력해주세요." />
                    </div>
                  </div>
                  <ErrorMessage name="video" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <Field as="textarea" id="description" name="description" className="content-area" placeholder="내용을 입력하세요." />
                    </div>
                  </div>
                  <ErrorMessage name="description" component="div" className="error" />
                  <div className="form-button">
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      등록
                    </button>
                    <button type="button" className="cancel-button" onClick={() => window.location.assign('/content')}>
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

export default ContentCreate;
