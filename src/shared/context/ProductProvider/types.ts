import { IProduct } from "../../components/ProductsTable/types";

export interface IProductProvider {
  children: JSX.Element;
}

export interface IProductContext {
  products: IProduct[];
  addProduct: (newProduct: IProduct) => void;
  removeProduct: (index: number) => void;
}