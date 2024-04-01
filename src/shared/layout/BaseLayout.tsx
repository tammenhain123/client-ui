import React, { useContext, useState } from 'react'
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDrawerContext } from '../context/DrawerProvider/useDrawer'
import NewProductModal from '../components/NewProductModal'
import { IProduct } from '../components/ProductsTable/types'
import { getUserLocalStorage } from '../context/AuthProvider/util'
import { ProductContext } from '../context/ProductProvider'

interface BaseLayoutProps {
  children: React.ReactNode
  title: string
  showAdd: boolean
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title, showAdd }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const user = getUserLocalStorage()
  const { addProduct } = useContext(ProductContext);

  const drawer = useDrawerContext()

  const [openAddModal, setOpenAddModal] = useState(false); 

  const handleAddButtonClick = () => {
    setOpenAddModal(true)
  };

  const handleAddProduct = async (newProduct :IProduct) => {
    try {
      await addProduct(newProduct)
      setOpenAddModal(false)
    } catch (error) {
      console.error('Error', error)
    } 
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="center" padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
        {smDown && <IconButton onClick={drawer.toggleDrawer}><MenuIcon /></IconButton>}
        <Typography 
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
        {user.role === 'admin' && showAdd && <IconButton style={{ color: 'green', fontSize: 28 }} onClick={handleAddButtonClick}><AddCircleOutlineIcon /></IconButton>}
      </Box>
      <Divider />
      <Box flex={1} overflow="auto">
        {children}
      </Box>
      <NewProductModal open={openAddModal} setOpen={setOpenAddModal} addProduct={handleAddProduct} />
    </Box>
  );
};

export default BaseLayout;
