import classNames from 'classnames';
import React, { SVGProps } from 'react';
import Icon, { IconSize } from '../SVG/Icon';
import './Button.scss';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Warning = 'warning',
  Subtle = 'subtle',
  Icon = 'icon',
  TextIcon = 'text-icon',
  IconText = 'search',
}

export enum ButtonIconPlacement {
  Left,
  Right,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  className?: string;
  children?: React.ReactNode;
  dataId?: string;
  icon?: React.FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  iconSize?: IconSize;
  iconRotation?: number;
  iconPlacement?: ButtonIconPlacement;
  fullWidth?: boolean;
  outline?: boolean;
  animated?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  buttonType = ButtonType.Primary,
  children,
  dataId,
  icon,
  iconPlacement,
  iconSize,
  iconRotation,
  fullWidth,
  outline,
  animated,
  ...rest
}) => {
  const classes = classNames('button', className, {
    'button--primary': buttonType === ButtonType.Primary,
    'button--secondary': buttonType === ButtonType.Secondary,
    'button--danger': buttonType === ButtonType.Danger,
    'button--warning': buttonType === ButtonType.Warning,
    'button--subtle': buttonType === ButtonType.Subtle,
    'button--has-icon': !!icon,
    'button--icon': buttonType === ButtonType.Icon,
    'button--fullWidth': !!fullWidth,
    [`button--${buttonType}--outline`]: !!outline,
    'button--animated': !!animated,
    'button--text-icon': buttonType === ButtonType.TextIcon,
    'button--icon-text': buttonType === ButtonType.IconText,
  });

  return (
    <button data-id={dataId} type="button" className={classes} {...rest}>
      {icon && (iconPlacement === ButtonIconPlacement.Left || buttonType === ButtonType.Icon) && (
        <Icon component={icon} size={iconSize} rotation={iconRotation} className="button__icon" />
      )}
      {children && <span className="button__content">{children}</span>}

      {icon && iconPlacement === ButtonIconPlacement.Right && (
        <Icon component={icon} size={iconSize} rotation={iconRotation} className="button__icon button__icon--right" />
      )}
    </button>
  );
};

export default Button;
