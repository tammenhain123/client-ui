import  { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { IProductContext, IProductProvider } from "./types";
import { Box } from "@mui/material";
import { addNewProduct, getProducts } from "../../services/ProductService";
import { IProduct } from "../../components/ProductsTable/types";

export const ProductContext = createContext<IProductContext>({} as IProductContext);

export const ProductProvider = ({ children }: IProductProvider) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = useCallback((newProduct: IProduct) => {
    const response =  addNewProduct(newProduct)
    setProducts(prevProducts => [...prevProducts, newProduct]);
  }, []);

  const removeProduct = useCallback((index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  }, []);

  const productContextValue = useMemo(() => {
    return {
      products,
      addProduct,
      removeProduct
    };
  }, [products, addProduct, removeProduct]);

  return (
    <ProductContext.Provider value={productContextValue}>
      <Box height='100vh'>
        {children}
      </Box>
    </ProductContext.Provider>
  );
};
