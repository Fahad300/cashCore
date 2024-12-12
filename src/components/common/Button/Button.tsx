import React from 'react';
import { Button as AntButton } from 'antd';
import classNames from 'classnames';
import styles from './Button.module.scss';

// Custom button extending AntD button with our styling
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode;
  [key: string]: any; // For other AntD Button props
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <AntButton
      className={classNames(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </AntButton>
  );
}; 