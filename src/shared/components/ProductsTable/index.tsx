import React, { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  Badge,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { IProduct } from './types';
import ProductModal from '../ProductModal';
import { getUserLocalStorage } from '../../context/AuthProvider/util';
import { ProductContext } from '../../context/ProductProvider';

const ProductTable = ({ products }: { products: IProduct[] }) => {
  const { removeProduct } = useContext(ProductContext);

  const user = getUserLocalStorage()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof IProduct>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteProduct = async (index: number) => {
    removeProduct(index)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof IProduct) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleRowClick = (product: IProduct, event: React.MouseEvent<HTMLTableRowElement>) => {
    const target = event.target as HTMLElement;
    setSelectedProduct(product);
    if (target.closest('.edit-button')) {
      setOpenModal(true);
      setEditMode(true);
    } else if(target.closest('.delete-button')){
      return
    }else{
      setOpenModal(true);
      setEditMode(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = order === 'asc'
  ? filteredProducts.slice().sort((a, b) => (a[orderBy] && b[orderBy] ? (a[orderBy]! < b[orderBy]! ? -1 : 1) : 0))
  : filteredProducts.slice().sort((a, b) => (a[orderBy] && b[orderBy] ? (a[orderBy]! > b[orderBy]! ? -1 : 1) : 0));
  return (
    <Paper>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Created At</TableCell>
              {user.role === 'admin' && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={index} onClick={(event) => handleRowClick(product, event)} style={{ cursor: 'pointer' }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>$ {product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align='center'>
                    <Badge color={product.quantity < 5 ? 'error' : 'primary'} badgeContent={product.quantity} />
                  </TableCell>
                  <TableCell>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : ''}</TableCell> 
                  {user.role === 'admin' &&  <TableCell className="actions">
                    <IconButton aria-label="edit" className="edit-button">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" className='delete-button' onClick={() => handleDeleteProduct(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <ProductModal selectedProduct={selectedProduct} openModal={openModal} setOpenModal={setOpenModal} editMode={editMode} />
    </Paper>
  );
};

export default ProductTable;
