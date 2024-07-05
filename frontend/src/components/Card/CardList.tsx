import classNames from 'classnames';
import React from 'react';

import Icon from '../SVG/Icon';

import './Card.scss';

export interface CardListProps {
  className?: string;
  children: React.ReactNode;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  actions?: React.ReactNode;
}

const CardList: React.FunctionComponent<CardListProps> = ({ children, className, icon, actions }): React.ReactElement => {
  const classes = classNames('card-list', className);

  return (
    <div className={classes}>
      <div className="card-list__content">
        {icon ? <Icon component={icon} className="card-list__prefix-icon" /> : null}
        {children}
      </div>
      <div className="card-list__actions">{actions}</div>
    </div>
  );
};

export default CardList;
