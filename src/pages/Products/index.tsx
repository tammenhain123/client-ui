import  { useState, useEffect } from 'react';
import { BaseLayout } from "../../shared/layout";
import ProductTable from "../../shared/components/ProductsTable";
import ProductCard from "../../shared/components/ProductCard";
import { Box, Button, Grid } from "@mui/material";
import { IProduct } from "../../shared/components/ProductsTable/types";
import { getProducts } from "../../shared/services/ProductService";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

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
