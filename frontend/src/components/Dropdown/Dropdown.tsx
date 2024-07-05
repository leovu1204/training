import classNames from 'classnames';
import React from 'react';

import LazyTippy from '../../common/utils/LazyTippy';

import { DropdownItemProps } from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import './Dropdown.scss';

interface ChildrenProps {
  onClose: () => void;
}
export interface DropdownProps {
  hideOnClickMenu?: boolean;
  elementAction: React.ReactNode;
  children: React.FC<ChildrenProps> | React.ReactElement<DropdownItemProps, any> | React.ReactElement<DropdownItemProps, any>[];
  classActivated?: string;
  placement?: any;
  offset?: [number, number];
  onClickOutside?: () => void;
  onClickDropdown?: () => void;
  onClose?: () => void;
  dropdownClassName?: string;
  disabled?: boolean;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  children,
  onClickOutside,
  elementAction,
  classActivated,
  placement,
  offset,
  onClickDropdown,
  onClose,
  dropdownClassName,
  hideOnClickMenu,
  disabled = false,
}) => {
  const [isVisible, setVisible] = React.useState(false);

  const onHideMenu = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleClickOutside = () => {
    onHideMenu();
    if (onClickOutside) {
      onClickOutside();
    }
  };

  const dropdownClasses = classNames('dropdown', dropdownClassName);

  const onClickContent = () => {
    setVisible(false);
  };

  return (
    <LazyTippy
      className={dropdownClasses}
      content={
        <DropdownMenu toggleMenu={onHideMenu}>
          <div onClick={onClickContent}>{typeof children === 'function' ? children({ onClose: onHideMenu }) : children}</div>
        </DropdownMenu>
      }
      interactive
      visible={isVisible}
      placement={placement || 'bottom'}
      onClickOutside={handleClickOutside}
      offset={offset}
      disabled={disabled}
    >
      <div
        className={`dropdown-elm ${isVisible && classActivated}`}
        onClick={(e) => {
          e.stopPropagation();
          setVisible(!isVisible);
          if (onClickDropdown) {
            onClickDropdown();
          }
        }}
      >
        {elementAction}
      </div>
    </LazyTippy>
  );
};

export default Dropdown;
