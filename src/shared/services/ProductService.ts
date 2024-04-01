import { IProduct } from "../components/ProductsTable/types";
import { Api } from "./api";
import axios from "axios"


async function getProducts(): Promise<IProduct[]> {
  const response = await Api.get('/products');
  return response.data;
}

async function addNewProduct(product: IProduct): Promise<IProduct> {
  product.createdAt = new Date();  
  product.id = (Math.floor(Math.random() * 100000000) + 1).toString();
  const response = await Api.post('/products', product);
  return response.data;
}

async function deleteProduct(productId: string): Promise<void> {
  const response = await axios.delete(`http://localhost:3001/products/${productId}`);
  console.log(response)
}

async function editProduct(productId: string, updatedProduct: IProduct): Promise<IProduct> {
  const response = await Api.put(`/products/${productId}`, updatedProduct);
  return response.data;
}

export { getProducts, addNewProduct, deleteProduct, editProduct };