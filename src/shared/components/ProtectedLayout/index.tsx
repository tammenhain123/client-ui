import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import CustomSnackbar from '../CustomSnackBar';
import { getUserLocalStorage } from '../../context/AuthProvider/util';

export const ProtectedLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const user = getUserLocalStorage()
    if (!user) {
      setSnackbarMessage('Invalid');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  }, [auth.email, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const invalidAccess = () => {
    setSnackbarMessage('Not permited');
    setSnackbarOpen(true);
  };

  return (
    <>
      {auth.email ? children : invalidAccess}
      <CustomSnackbar
        open={snackbarOpen}
        type="error"
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

