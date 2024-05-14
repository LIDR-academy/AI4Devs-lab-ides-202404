import React, { ComponentProps } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button className={clsx('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded', className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

