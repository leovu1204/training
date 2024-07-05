import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { selectToken } from '../../services/controllers/common/UserSelector';

import { selectPostPassword } from '../../services/controllers/common/PostSelector';
import api from '../../services/apiServices';

import './BoardView.scss';
import { postLogout } from '../../services/controllers/common/PostSlice';

const BoardEdit: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectToken) !== null;
  const { id } = useParams();

  const postPassword = useSelector(selectPostPassword);

  const { data: dataItem } = useQuery(['boardItem', id], () => api.data.fetchDataById('free-board', id || ''));

  const userInitialEditValues = {
    author: dataItem?.author,
    password: postPassword,
    title: dataItem?.title,
    content: dataItem?.content,
  };

  const adminInitialEditValues = {
    title: dataItem?.title,
    content: dataItem?.content,
  };

  const userFormValidation = Yup.object().shape({
    password: Yup.string().required('비밀번호를 입력하세요.'),
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const adminFormValidation = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const editUserDataMutation = useMutation(
    (values: any) =>
      api.data.editdataById('free-board', id || '', { content: values.content, title: values.title, password: values.password }),
    {
      onSuccess: () => {
        dispatch(postLogout());
        window.location.pathname = '/board';
      },
    },
  );

  const editdataByIdMutation = useMutation((values: any) => api.data.editdataById('free-board/admin', id || '', values), {
    onSuccess: () => {
      window.location.pathname = '/board';
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
    <div className="board-view">
      <div className="board-view__top">
        <div className="board-view__content">
          <div className="board-view__table-head">
            <div className="board-view__title">
              <h2 className="gradual-color-transition">공지사항 수정</h2>
            </div>
          </div>
          <div className="form-container">
            {isLoggedIn ? (
              <Formik
                enableReinitialize
                initialValues={adminInitialEditValues}
                validationSchema={adminFormValidation}
                onSubmit={(values, { setSubmitting }) => {
                  editdataByIdMutation.mutate(values, {
                    onSuccess: () => {
                      setSubmitting(false);
                    },
                  });
                }}
              >
                {({ isSubmitting }) => (
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
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button type="button" className="cancel-button" onClick={() => window.location.assign('/board')}>
                        취소
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                enableReinitialize
                initialValues={userInitialEditValues}
                validationSchema={userFormValidation}
                onSubmit={(values, { setSubmitting }) => {
                  editUserDataMutation.mutate(values, {
                    onSuccess: () => {
                      setSubmitting(false);
                    },
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-column">
                        <div className="form-group">
                          <label htmlFor="author">작성자 이름</label>
                          <Field type="text" id="author" name="author" disabled />
                        </div>
                        <ErrorMessage name="author" component="div" className="error" />
                      </div>
                      <div className="form-column">
                        <div className="form-group">
                          <label htmlFor="password">비밀번호</label>
                          <Field type="password" id="password" name="password" disabled />
                        </div>
                        <ErrorMessage name="password" component="div" className="error" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <Field type="text" id="title" name="title" placeholder="제목을 입력해주세요." />
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
                              placeholder="내용을 입력하세요."
                              className="content-area"
                              modules={modules}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <ErrorMessage name="content" component="div" className="error" />
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button type="button" className="cancel-button" onClick={() => window.location.assign('/board')}>
                        취소
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardEdit;
