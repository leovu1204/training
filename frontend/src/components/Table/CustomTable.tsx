import React, { useState } from 'react';
import classNames from 'classnames';

import Icon, { ICONS, IconSize } from '../SVG/Icon';
import DateTimeDisplay from '../DateTimeDisplay/DateTimeDisplay';
import Modal, { ModalWidth } from '../Modal/DialogModal';

import './CustomTable.scss';

interface TableProps {
  className?: string;
  data: any[];
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  columns: { dataId: string; label: string }[];
  showAdminActions?: boolean;
  onCreateButton?: () => void;
  handleDelete?: () => void;
  handleEdit?: (itemId: string) => void;
  onRowClick: (itemId: string) => void;
  disableRowClick?: boolean;
  checkboxState: { [key: string]: boolean };
  onCheckboxChange: (itemId: string) => void;
  userDelete?: (itemId: string, fullname: string, username: string) => void;
  onFreeBoard?: boolean;
}

const CustomTable: React.FC<TableProps> = ({
  className,
  data,
  currentPage,
  totalPageCount,
  columns,
  onPageChange,
  showAdminActions,
  onCreateButton,
  handleDelete,
  handleEdit,
  onRowClick,
  disableRowClick,
  checkboxState,
  onCheckboxChange,
  userDelete,
  onFreeBoard,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPageCount);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditAction = () => {
    if (checkedNumber >= 2) {
      setEditModalOpen(true);
    }

    const editId = Object.keys(checkboxState).find((key) => checkboxState[key] === true);
    if (checkedNumber === 1 && editId) {
      if (handleEdit) {
        handleEdit(editId);
      }
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const checkedNumber = Object.values(checkboxState).filter((value) => value === true).length;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    if (checkedNumber > 0) setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const tableClasses = classNames('customized-table', { managerial: showAdminActions }, className);

  return (
    <div className={tableClasses}>
      <table>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => {
              if (columnIndex === 0 && !showAdminActions) {
                return null;
              }
              return <th key={column.dataId}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            <>
              {data.map((item, _) => (
                <tr key={item.id}>
                  {columns.map((column, columnIndex) => {
                    if (columnIndex === 0 && showAdminActions) {
                      return (
                        <td key={column.dataId}>
                          <input
                            type="checkbox"
                            checked={checkboxState[item.id]}
                            onChange={() => {
                              onCheckboxChange(item.id);
                            }}
                          />
                        </td>
                      );
                    }
                    if (!showAdminActions && columnIndex === 0) {
                      return null;
                    }

                    if (column.dataId === 'title') {
                      return (
                        <td key={column.dataId} className="title-column" onClick={!disableRowClick ? () => onRowClick(item.id) : undefined}>
                          {item[column.dataId]}
                          <p>
                            <DateTimeDisplay timestamp={item.updated_at} />
                          </p>
                        </td>
                      );
                    }

                    if (column.dataId === 'img') {
                      return (
                        <td key={column.dataId}>
                          <img src={item[column.dataId]} alt="img" />
                        </td>
                      );
                    }

                    if (column.dataId === 'updated_at') {
                      return (
                        <td key={column.dataId}>
                          <DateTimeDisplay timestamp={item.updated_at} />
                        </td>
                      );
                    }

                    if (column.dataId === 'actions') {
                      return (
                        <td key={column.dataId}>
                          <button
                            onClick={() => {
                              if (userDelete) userDelete(item.id, item.full_name, item.username);
                            }}
                          >
                            탈퇴
                          </button>
                        </td>
                      );
                    }

                    return (
                      <td key={column.dataId} onClick={!disableRowClick ? () => onRowClick(item.id) : undefined}>
                        {item[column.dataId]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ) : (
            <div className="empty-body">현재 사용 가능한 데이터가 없습니다.</div>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XL} />
            </button>
          </div>
        )}
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                onPageChange(index + 1);
              }}
              className={`number-button ${currentPage === index + 1 ? 'clicked' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentPage < totalPageCount && (
          <div className="icon-nav">
            <button onClick={handleNextPage} className="button-nav">
              <Icon component={ICONS.FORWARD} size={IconSize.XL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XL} />
            </button>
          </div>
        )}
        {showAdminActions && (
          <div className="admin-buttons">
            <button className="admin-buttons__edit" onClick={handleEditAction}>
              수정
            </button>
            <Modal dataId="" isOpen={editModalOpen} onClose={closeEditModal} className="dialog" width={ModalWidth.SM}>
              <div className="message">
                <span>한 번에 하나의 게시글만 수정가능합니다.</span>
                <span>하나의 게시글만 선택해주세요.</span>
              </div>
              <div className="dialog__buttons">
                <button onClick={closeEditModal} className="cancel-button">
                  취소
                </button>
                <button
                  onClick={() => {
                    closeEditModal();
                  }}
                  className="confirm-button"
                >
                  확인
                </button>
              </div>
            </Modal>
            <button className="admin-buttons__delete" onClick={openDeleteModal}>
              삭제
            </button>
            <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="dialog" width={ModalWidth.SM}>
              <div className="message">
                <span>{checkedNumber}건의 게시글을</span>
                <span>삭제 하시겠습니까?</span>
              </div>
              <div className="dialog__buttons">
                <button onClick={closeDeleteModal} className="cancel-button">
                  취소
                </button>
                <button
                  onClick={() => {
                    if (handleDelete) {
                      handleDelete();
                    }
                    closeDeleteModal();
                  }}
                  className="confirm-button"
                >
                  확인
                </button>
              </div>
            </Modal>
            <button className="admin-buttons__create" onClick={onCreateButton}>
              글쓰기
            </button>
          </div>
        )}
        {onFreeBoard && (
          <div className="admin-buttons">
            <button className="admin-buttons__create" onClick={onCreateButton}>
              글쓰기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
