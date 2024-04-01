import  { useContext, useState } from 'react';
import { BaseLayout } from "../../shared/layout";
import ProductTable from "../../shared/components/ProductsTable";
import ProductCard from "../../shared/components/ProductCard";
import { Box, Button, Grid } from "@mui/material";
import { ProductContext } from '../../shared/context/ProductProvider';

export const Products = () => {
  const { products } = useContext(ProductContext);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  return (
    <BaseLayout showAdd={true} title="Products">
      <Box display="flex" justifyContent="center" p={2}>
        <Button onClick={toggleViewMode} variant="outlined">
          {viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" p={2}>
        {viewMode === 'table' ? (
          <ProductTable products={products} />
        ) : (
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard
                  image={product.image ? product.image : ''}
                  name={product.name}
                  description={product.description}
                  value={product.price}
                  quantity={product.quantity}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </BaseLayout>
  );
};
