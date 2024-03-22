import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarProps {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({ open, type, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
