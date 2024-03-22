import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Grid, Typography } from '@mui/material';
import { IProduct } from '../ProductsTable/types';
import { useThemeContext } from '../../context/ThemeProvider/useTheme';
import CustomSnackbar from '../CustomSnackBar';


interface NewProductModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (product: IProduct) => void;
}

const NewProductModal: React.FC<NewProductModalProps> = ({ open, setOpen, addProduct }) => {
  const appTheme = useThemeContext()
  const backgroundColor = appTheme.themeName === "dark" ? '#303134' : '#ffffff';
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [productData, setProductData] = useState<IProduct>({
    id: '0',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
    createdAt: new Date()
  });

  useEffect(() => {
    if (open) {
      setProductData({
        id: '0',
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image: '',
        createdAt: new Date()
      });
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProductData({ ...productData, image: reader.result as string });
      };
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddProduct = () => {
    if (
      productData.name.trim() === '' ||
      productData.description.trim() === '' ||
      productData.price === 0 ||
      productData.quantity === 0 ||
      productData.image === ''
    ) {
      setSnackbarMessage('Fill in all fields');
      setSnackbarOpen(true);
      return;
    }
  
    addProduct(productData);
    setOpen(false);
  };
  
  return (<>

    <Modal open={open} onClose={() => setOpen(false)}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: backgroundColor, padding: '20px' }}>
        <Typography variant='h3'>Add Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
            >
              Select Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {productData.image && (
              <img src={productData.image} alt="Product" style={{ maxWidth: '20%', marginTop: '10px' }} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
    <CustomSnackbar
        open={snackbarOpen}
        type="error"
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default NewProductModal;
