import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import { loginSuccess } from '../../services/controllers/common/UserSlice';

import { routes } from '../../common/utils/routes';
import api from '../../services/apiServices';
import { storage } from '../../common/utils/storage';

import './LoginView.scss';

const LoginView: React.FC = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('아이디를 입력하세요.'),
    password: Yup.string().required('비밀번호를 입력하세요.'),
  });

  const handleSubmit = async (values: any) => {
    const userService = api.user;

    try {
      const response = await userService.login(values.username, values.password);
      storage.setToken(response.token);

      dispatch(loginSuccess({ id: response.id, role: response.role, token: response.token }));

      if (response.role === 'Normal') window.location.pathname = '/lab';
      else window.location.pathname = routes.DEFAULT;
    } catch (error) {
      toast.error('사용자를 찾을 수 없음', {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'toast-message',
      });
    }
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <Field type="text" id="username" name="username" placeholder="아이디를 입력하세요." />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <Field type={passwordVisible ? 'text' : 'password'} id="password" name="password" placeholder="비밀번호를 입력하세요." />
              <span onClick={togglePasswordVisibility}>
                <Icon component={passwordVisible ? ICONS.EYE_VISIBLE : ICONS.EYE_INVISIBLE} size={IconSize.LG} />
              </span>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>
                <Field type="checkbox" name="rememberUserId" />
                아이디 기억하기
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              확인
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/register" className="registration-button">
        리빙랩 회원가입
      </Link>
    </div>
  );
};

export default LoginView;
