import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Modal, { ModalWidth } from '../../components/Modal/DialogModal';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import TableRowDetails from '../../components/Table/TableRowDetails';

import { postLoginSuccess, postLogout } from '../../services/controllers/common/PostSlice';

import api from '../../services/apiServices';

import './BoardView.scss';

const BoardItem: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const [passPhrase, setPassPhrase] = useState('');

  const { data: dataItem, error } = useQuery(['boardItem', id], () => api.data.fetchDataById('free-board', id || ''));

  if (error) {
    console.log(error);
  }

  const handleDisplayItem = (itemId: string) => {
    navigate(`/board/${itemId}`);
  };

  const [modalAction, setModalAction] = useState<string>();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = (actionType: string) => {
    if (actionType === 'edit') setModalAction('edit');
    if (actionType === 'delete') setModalAction('delete');
    setPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('비밀번호를 입력하세요.'),
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const dataMutation = useMutation((values: any) => api.user.boardLogin(id ?? '', values.password), {
    onSuccess: () => {
      if (modalAction === 'edit') {
        closePasswordModal();
        window.location.assign(`/board/edit/${id}`);
      }
      if (modalAction === 'delete') {
        closePasswordModal();
        openDeleteModal();
      }
    },
    onError: () => {
      toast.error('권한 거부됨', {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'toast-message',
      });
    },
  });

  const deleteDataMutation = useMutation((itemId: string) => api.data.deleteBoardData(itemId, { password: passPhrase }), {
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.', {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      window.location.assign('/board');
    },
  });

  const handleDelete = () => {
    try {
      deleteDataMutation.mutate(id ?? '');
      dispatch(postLogout());
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  return (
    <div className="board-view">
      <div className="board-view__top">
        <div className="board-view__content">
          <div className="board-view__table-head">
            <div className="board-view__title">
              <h2 className="gradual-color-transition">자유게시판</h2>
            </div>
          </div>
          {dataItem && (
            <TableRowDetails
              author={dataItem.author}
              content={dataItem.content}
              createdAt={dataItem.created_at}
              id={dataItem.id}
              title={dataItem.title}
              updatedAt={dataItem.updated_at}
              userId={dataItem.user_id}
              onNextItem={() => handleDisplayItem(dataItem.next ?? '')}
              onPrevItem={() => handleDisplayItem(dataItem.previous ?? '')}
              onAction={openPasswordModal}
              hasNext={!!dataItem.next}
              hasPrev={!!dataItem.previous}
              onFreeBoard
            />
          )}
          <Modal dataId="" isOpen={passwordModalOpen} onClose={closePasswordModal} className="password-modal" width={ModalWidth.SM}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dataMutation.mutate(values);
                setPassPhrase(values.password);
                dispatch(postLoginSuccess({ password: values.password }));
              }}
            >
              <Form className="form-password">
                <div className="form-group">
                  <label htmlFor="password">비밀번호를 입력하세요.</label>
                  <div>
                    <Field type={passwordVisible ? 'text' : 'password'} id="password" name="password" />
                    <span onClick={togglePasswordVisibility}>
                      <Icon component={passwordVisible ? ICONS.EYE_VISIBLE : ICONS.EYE_INVISIBLE} size={IconSize.LG} />
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className="password-modal__buttons">
                  <button type="button" className="cancel-button" onClick={closePasswordModal}>
                    취소
                  </button>
                  <button type="submit" className="confirm-button">
                    확인
                  </button>
                </div>
              </Form>
            </Formik>
          </Modal>
          <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="delete-modal" width={ModalWidth.SM}>
            <span>건의 게시글을 삭제 하시겠습니까?</span>
            <div className="delete-modal__buttons">
              <button onClick={closeDeleteModal} className="cancel-button">
                취소
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  closeDeleteModal();
                }}
                className="confirm-button"
              >
                확인
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
