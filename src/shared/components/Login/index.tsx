import { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate  } from 'react-router-dom';
import CustomSnackbar from '../CustomSnackBar';

export const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.authenticate(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      setSnackbarMessage('Invalid username or password');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // opcional: para ocupar a altura total da viewport
    }}>
      <Box
        sx={{  
          width: "100%",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%"}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        type="error"
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  )
};