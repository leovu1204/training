import classNames from 'classnames';
import { t } from 'i18next';
import React, { useState } from 'react';

import { SortDirection } from '../../common/enum';
import Checkbox from '../Checkbox/Checkbox';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

import './Table.scss';

export interface ColumnState {
  label: string;
  dataId: string;
  styles?: React.CSSProperties;
  sortable?: boolean;
  icon?: React.ReactNode;
}

enum PaginateAction {
  Prev = 'Prev',
  Next = 'Next',
}

interface TableProps {
  columns: ColumnState[];
  data: any[];
  page?: number;
  pageSize?: number;
  total?: number;
  hasMore?: boolean;
  cellRenderer: (props: { data: any; dataId: string; index?: number }) => React.ReactElement;
  isAllRowSelected?: boolean;
  titleElement: React.ReactNode;
  loadMore?: (page: number) => Promise<void> | void;
  isCollapse?: boolean;
  maxHeight?: number | string;
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (sortBy: string, sortDirection: SortDirection) => void;
  className?: string;
  onSelectAll?: () => void;
  disableRows?: string[];
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  page = 1,
  hasMore = false,
  total,
  pageSize = 0,
  isAllRowSelected,
  cellRenderer,
  titleElement,
  loadMore,
  maxHeight,
  sortBy,
  sortDirection,
  onSort,
  onSelectAll,
  className,
  disableRows,
}) => {
  const [isHeaderHover, setIsHeaderHover] = useState(false);

  const previousButtonClasses = classNames({
    'custom-table__pagination--disabled': page === 1,
  });

  const nextButtonClasses = classNames({
    'custom-table__pagination--disabled': !hasMore,
  });

  const changePage = (action: PaginateAction) => {
    if (!loadMore) return;
    if (action === PaginateAction.Prev && page !== 1) {
      loadMore(page - 1);
    } else if (action === PaginateAction.Next && hasMore) {
      loadMore(page + 1);
    }
  };

  const headerCellClass = (col: ColumnState) => {
    return classNames('custom-table__cell--header', {
      'custom-table__cell--sortable': col.sortable,
      'custom-table__cell--sort-asc': sortBy === col.dataId && sortDirection === SortDirection.ASC,
    });
  };

  const handleSort = (col: ColumnState) => {
    if (!col.sortable || !onSort) return;
    if (col.dataId === sortBy) {
      onSort(sortBy, sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      onSort(col.dataId, SortDirection.DESC);
    }
  };

  const handleAllRowSelected = (col: ColumnState) => {
    if (onSelectAll) {
      onSelectAll();
    }
  };

  const tableClasses = classNames('custom-table', className);

  return (
    <div className={tableClasses}>
      <div className="custom-table__paper">
        {titleElement}
        <div className="custom-table__wrapper">
          <table className="custom-table__container">
            <thead>
              <tr onMouseEnter={() => setIsHeaderHover(true)} onMouseLeave={() => setIsHeaderHover(false)}>
                {columns.map((col) => (
                  <th
                    onClick={col.dataId !== 'checkbox' ? () => handleSort(col) : () => handleAllRowSelected(col)}
                    className={headerCellClass(col)}
                    style={col.styles}
                    key={col.label}
                  >
                    {col.dataId === 'checkbox' ? <Checkbox name="checkbox-table" readonly value={!!isAllRowSelected} /> : col.label}
                    {col.sortable ? (
                      <Icon component={sortBy !== col.dataId ? ICONS.SORT : ICONS.ARROW_DOWN_LONG} size={IconSize.SM} />
                    ) : null}
                    {(isHeaderHover && col.icon) || null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ maxHeight: maxHeight || '500px' }}>
              {data.length
                ? data.map((item, index) => {
                    const classes = classNames({
                      'custom-table__row-disable': disableRows?.includes(item.id),
                    });
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <tr key={index} className={classes}>
                        {columns.map((col) => (
                          <td style={col.styles} key={col.dataId}>
                            {cellRenderer({ data: item, dataId: col.dataId, index })}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
      {!total && !pageSize ? null : (
        <div className="custom-table__bottom">
          {/*
          <span className="custom-table__info">
            {total
              ? t('common.text.tableInfo', {
                  from: (page - 1) * pageSize + 1,
                  to: page * pageSize > total ? total : page * pageSize || 1,
                  total,
                  count: total,
                })  
              : t('common.text.showEmpty')}
          </span>
          */}
          <div className="custom-table__pagination">
            <div onClick={() => changePage(PaginateAction.Prev)} className={previousButtonClasses}>
              {t('common.text.previous')}
            </div>
            <p className="custom-table__pagination--page">{page}</p>
            <div onClick={() => changePage(PaginateAction.Next)} className={nextButtonClasses}>
              {t('common.text.next')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
