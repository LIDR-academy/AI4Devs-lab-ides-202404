import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@material-ui/core';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ children, loading, ...props }) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};

export default LoadingButton;
