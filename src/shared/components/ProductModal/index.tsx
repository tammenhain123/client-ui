import React, { useContext, useState } from 'react';
import { Modal, TextField, Button, Grid, Typography } from '@mui/material';
import { IProduct } from '../ProductsTable/types';
import { useThemeContext } from '../../context/ThemeProvider/useTheme';
import CustomSnackbar from '../CustomSnackBar';
import { ProductContext } from '../../context/ProductProvider';


interface ProductModalProps {
  selectedProduct: IProduct | null;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ selectedProduct, openModal, setOpenModal, editMode }) => {
  const appTheme = useThemeContext();
  const { editProduct } = useContext(ProductContext);

  const backgroundColor = appTheme.themeName === 'dark' ? '#303134' : '#ffffff';
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [editedProduct, setEditedProduct] = useState<IProduct | null>(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    try {
      if (editedProduct) {
        await editProduct(editedProduct.id, editedProduct);
        setSnackbarMessage('Edited product');
        setSnackbarOpen(true);
        setOpenModal(false);
      }
    } catch (error) {
        setSnackbarMessage('Erro to edit product');
        setSnackbarOpen(true);
        setOpenModal(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      const { name, value } = event.target;
      setEditedProduct({
        ...selectedProduct,
        [name]: value
      });
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: backgroundColor, padding: '20px' }}>
          <Typography variant='h3'>{editMode ? 'Edit Product' : 'Product Details'}</Typography>
          {selectedProduct && (
            <Grid container spacing={2}>
              {selectedProduct.image && (<Grid item xs={12} md={6}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ maxWidth: '100%' }} />
              </Grid>)}
              <Grid item xs={12} md={6}>
                <Grid container direction="column">
                  <Grid item sx={{ marginBottom: '10px' }}>
                    <TextField
                      label="Name"
                      name="name"
                      defaultValue={selectedProduct.name}
                      variant="outlined"
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: '10px' }}>
                    <TextField
                      label="Price"
                      type='number'
                      name="price"
                      defaultValue={selectedProduct.price}
                      variant="outlined"
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: '10px' }}>
                    <TextField
                      label="Quantity"
                      name="quantity"
                      defaultValue={selectedProduct.quantity.toString()}
                      variant="outlined"
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item sx={{ marginBottom: '10px' }}>
                    <TextField
                      label="Description"
                      name="description"
                      defaultValue={selectedProduct.description}
                      variant="outlined"
                      onChange={handleInputChange}
                      disabled={!editMode}
                      multiline
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  {editMode && (
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
      </Modal>
      <CustomSnackbar
        open={snackbarOpen}
        type="success"
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default ProductModal;
