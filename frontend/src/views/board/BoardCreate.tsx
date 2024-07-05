import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useSelector } from 'react-redux';
import { selectToken } from '../../services/controllers/common/UserSelector';

import api from '../../services/apiServices';

import './BoardView.scss';

const BoardCreate: React.FC = () => {
  const isLoggedIn = useSelector(selectToken) !== null;

  const userInitialValues = {
    author: '',
    password: '',
    title: '',
    content: '',
  };

  const adminInitialValues = {
    title: '',
    content: '',
  };

  const userFormValidation = Yup.object().shape({
    author: Yup.string().required('입력하세요.'),
    password: Yup.string().required('비밀번호를 입력하세요.'),
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const adminFormValidation = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const createAdminDataMutation = useMutation((values: any) => api.data.postData('free-board/admin', values), {
    onSuccess: () => {
      window.location.assign('/board');
    },
  });

  const createUserDataMutation = useMutation((values: any) => api.data.postData('free-board', values), {
    onSuccess: () => {
      window.location.assign('/board');
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
              <h2 className="gradual-color-transition">자유게시판 작성</h2>
            </div>
          </div>
          <div className="form-container">
            {isLoggedIn ? (
              <Formik
                initialValues={adminInitialValues}
                validationSchema={adminFormValidation}
                onSubmit={(values) => createAdminDataMutation.mutate(values)}
              >
                {({ isSubmitting }) => (
                  <Form className="form-create">
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
            ) : (
              <Formik
                initialValues={userInitialValues}
                validationSchema={userFormValidation}
                onSubmit={(values) => createUserDataMutation.mutate(values)}
              >
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-column">
                        <div className="form-group">
                          <label htmlFor="author">작성자 이름</label>
                          <Field type="text" id="author" name="author" placeholder="이름을 입력하세요." />
                        </div>
                        <ErrorMessage name="author" component="div" className="error" />
                      </div>
                      <div className="form-column">
                        <div className="form-group">
                          <label htmlFor="password">비밀번호</label>
                          <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." />
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

export default BoardCreate;
