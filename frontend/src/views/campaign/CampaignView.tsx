import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import GalleryImageDetails from '../../components/ImageGallery/GalleryImageDetails';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

import { CampaignData } from '../../services/constants/constants';

import './CampaignView.scss';

const CampaignView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const isManagerial = userRole === 'admin';

  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  type TableSearchColumn = 'title' | 'author';

  const [filteredData, setFilteredData] = useState(CampaignData);
  const [editMode, setEditMode] = useState(false);

  const updateFilteredData = () => {
    const newFilteredData = CampaignData.filter((row) => {
      const cellValue = row[selectedSearchColumn];
      return cellValue.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(newFilteredData);
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateFilteredData();
    }
  };

  const handleDelete = () => {
    const dataToKeep = CampaignData.filter((item) => !item.selected);
    setFilteredData(dataToKeep);
  };

  const handleEdit = (itemId: string) => {
    navigate(`edit/${itemId}`);
    setEditMode(true);
  };

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('create');
  };

  const { contentType } = useParams();
  const currentItem = CampaignData.find((item) => item.id === contentType);

  const [selectedDropdownText, setSelectedDropdownText] = useState('제목');
  const [searchText, setSearchText] = useState('');
  const [selectedSearchColumn, setSelectedSearchColumn] = useState<TableSearchColumn>('title');

  const handleDropdownItemClick = (itemText: string) => {
    if (itemText !== selectedDropdownText) {
      setSelectedDropdownText(itemText);
      if (itemText === '제목') {
        setSelectedSearchColumn('title');
      } else {
        setSelectedSearchColumn('author');
      }
      setSearchText('');
    }
  };

  const initialValues = {
    file: null,
    title: '',
    content: '',
    link: '',
  };

  const initialEditValues = {
    file: currentItem ? currentItem.image : '',
    title: currentItem ? currentItem.id : '',
    content: currentItem ? currentItem.description : '',
    link: currentItem ? currentItem.link : '',
  };

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

  const handleCancel = () => {
    window.history.back();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
    link: Yup.string().required('링크를 입력하세요.'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  useEffect(() => {
    if (!contentType) {
      setEditMode(false);
      const updatedData = CampaignData.map((item) => ({ ...item, selected: false }));
      setFilteredData(updatedData);
    }
  }, [contentType]);

  if (!contentType) {
    return (
      <div className="campaign-view">
        <div className="campaign-view__top">
          <div className="campaign-view__image">
            <img src="/campaign_bn.png" alt="campaignBG" />
            {!isManagerial && (
              <>
                <div className="campaign-view__image__overlay" />
                <div className="campaign-view__image__icon">
                  <img src="/icon_campaign.svg" alt="campaignIcon" />
                  <p>깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
                </div>
              </>
            )}
          </div>
          <div className="campaign-view__content">
            <div className="campaign-view__grid-head">
              <div className="campaign-view__title">
                <h2 className="gradual-color-transition">캠페인</h2>
              </div>
              <div className="campaign-view__search-container">
                <Dropdown
                  elementAction={
                    <Button icon={ICONS.ARROW_DOWN} iconPlacement={ButtonIconPlacement.Right} className="button--text-icon">
                      {selectedDropdownText || '제목'}
                    </Button>
                  }
                >
                  {isManagerial ? (
                    <>
                      <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedDropdownText === '제목'}>
                        제목
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDropdownItemClick('작성자')} isSelected={selectedDropdownText === '작성자'}>
                        작성자
                      </DropdownItem>
                    </>
                  ) : (
                    <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedDropdownText === '제목'}>
                      제목
                    </DropdownItem>
                  )}
                </Dropdown>
                <div className="campaign-view__search-area">
                  <TextInput
                    dataId="author"
                    placeholder="캠페인 검색"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <Button
                    icon={ICONS.MAGNIFIER}
                    iconPlacement={ButtonIconPlacement.Left}
                    iconSize={IconSize.XL}
                    className="button--icon-text"
                    onClick={updateFilteredData}
                  >
                    검색
                  </Button>
                </div>
              </div>
            </div>
            {!isManagerial && <ImageGallery data={filteredData} userRole={userRole} onCreateButton={handleCreatePost} />}
            {isManagerial && (
              <CustomTable
                data={filteredData}
                itemsPerPage={10}
                columns={columns}
                showAdminActions={isManagerial}
                onCreateButton={handleCreatePost}
                setData={setFilteredData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                disableRowClick={isManagerial}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!editMode && currentItem) {
    return (
      <div className="campaign-view">
        <div className="campaign-view__top">
          <div className="campaign-view__content">
            <div className="campaign-view__grid-head">
              <div className="campaign-view__title">
                <h2 className="gradual-color-transition">캠페인</h2>
              </div>
            </div>
            <GalleryImageDetails
              id={currentItem.id}
              selected={currentItem.selected}
              numbering={currentItem.numbering}
              image={currentItem.image}
              title={currentItem.title}
              author={currentItem.author}
              date={currentItem.date}
              link={currentItem.link}
              description={currentItem.description}
            />
          </div>
        </div>
      </div>
    );
  }

  if (contentType === 'create') {
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
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                        <Field as="textarea" id="content" name="content" placeholder="내용을 입력하세요." className="content-area" />
                      </div>
                    </div>
                    <ErrorMessage name="content" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="link">링크</label>
                        <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="link" component="div" className="error" />
                    <div>
                      <input id="file" name="file" type="file" accept="image/*" />
                    </div>
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button className="cancel-button" onClick={handleCancel}>
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
  }

  if (editMode) {
    return (
      <div className="campaign-view">
        <div className="campaign-view__top">
          <div className="campaign-view__content">
            <div className="campaign-view__table-head">
              <div className="campaign-view__title">
                <h2 className="gradual-color-transition">공지사항 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                        <Field as="textarea" id="content" name="content" placeholder="내용을 입력하세요." className="content-area" />
                      </div>
                    </div>
                    <ErrorMessage name="content" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="link">링크</label>
                        <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="link" component="div" className="error" />
                    <div>
                      <input id="file" name="file" type="file" accept="image/*" />
                    </div>
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button className="cancel-button" onClick={handleCancel}>
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
  }

  return (
    <div className="campaign-view">
      <div className="campaign-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default CampaignView;
