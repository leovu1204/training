import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import './LabView.scss';
import TableRowDetails from '../../components/Table/TableRowDetails';

const LabView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/lab/create');
  };

  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  const data = [
    {
      id: '1',
      numbering: 1,
      title:
        '공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사',
      author: '관리자 1',
      date: '2023-05-05',
      body: '글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기.',
    },
    { id: '2', numbering: 2, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '3', numbering: 3, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '4', numbering: 4, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '5', numbering: 5, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '6', numbering: 6, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '7', numbering: 7, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '8', numbering: 8, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '9', numbering: 9, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '10', numbering: 10, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '11', numbering: 11, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '12', numbering: 12, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
  ];

  const indexes = data.map((item) => item.id);

  const { contentType } = useParams();
  const currentItem = data.find((item) => item.id === contentType);

  if (!contentType) {
    return (
      <div className="lab-view__top">
        <div className="lab-view__image">
          <div className="lab-view__image__overlay" />
          <img src="/lab_bn.png" alt="labBG" />
          <div className="lab-view__image__icon">
            <img src="icon_lab.svg" alt="labIcon" />
            <p>깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </div>
        <div className="lab-view__content">
          <div className="lab-view__table-head">
            <h2 className="gradual-color-transition">리빙랩</h2>
            <div className="lab-view__drop-down">
              <Dropdown
                elementAction={
                  <Button
                    icon={ICONS.ARROW_DOWN}
                    iconPlacement={ButtonIconPlacement.Right}
                    iconSize={IconSize.LG}
                    className="button--text-icon"
                  >
                    {selectedItemText || '제목'}
                  </Button>
                }
              >
                <DropdownItem onClick={() => handleDropdownItemClick('제목')}>제목</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('작성자')}>작성자</DropdownItem>
              </Dropdown>
              <div className="lab-view__search-area">
                <TextInput dataId="" placeholder="공지사항 검색" />
                <Button
                  icon={ICONS.MAGNIFIER}
                  iconPlacement={ButtonIconPlacement.Left}
                  iconSize={IconSize.XL}
                  className="button--icon-text"
                >
                  제목
                </Button>
              </div>
            </div>
          </div>
          <CustomTable columns={columns} data={data} itemsPerPage={10} userRole={userRole} onCreateButton={handleCreatePost} />
        </div>
      </div>
    );
  }

  if (currentItem) {
    return (
      <div className="lab-view">
        <div className="lab-view__top">
          <div className="lab-view__content">
            <div className="lab-view__table-head">
              <h2 className="gradual-color-transition">리빙랩</h2>
            </div>
            <TableRowDetails
              id={currentItem.id}
              title={currentItem.title}
              numbering={currentItem.numbering}
              author={currentItem.author}
              description={currentItem.body}
              date={currentItem.date}
              indexes={indexes}
            />
          </div>
        </div>
      </div>
    );
  }

  if (contentType === 'create') {
    return (
      <div className="lab-view__top">
        <h1>Create New Item</h1>
        <h1>Create New Item</h1>
      </div>
    );
  }

  return (
    <div className="lab-view">
      <div className="lab-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default LabView;
