import { BaseLayout } from "../../shared/layout"
import ProductTable from "../../shared/components/ProductsTable";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IProduct } from "../../shared/components/ProductsTable/types";
import { getProducts } from "../../shared/services/ProductService";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  
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


  return (
    <BaseLayout showAdd={true} title="Products">
      <Box display="flex" justifyContent="center" p={2}>
        <ProductTable products={products} />
      </Box>
    </BaseLayout>
  )
}