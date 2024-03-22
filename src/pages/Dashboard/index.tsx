import { Grid, useMediaQuery, useTheme } from "@mui/material"
import CardComponent from "../../shared/components/Card"
import { BaseLayout } from "../../shared/layout"
import { useEffect, useState } from "react";
import { IProduct } from "../../shared/components/ProductsTable/types";
import { getProducts } from "../../shared/services/ProductService";
import { getUserLocalStorage } from "../../shared/context/AuthProvider/util";

export const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [outOfStock, setOutOfStock] = useState(0);
  const user = getUserLocalStorage()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        const outOfStock = productList.filter(product => product.quantity === 0);
        setOutOfStock(outOfStock.length);
        setProducts(productList);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <BaseLayout showAdd={false} title="Dashboard">
      <Grid container margin={2} spacing={2} style={{ maxWidth: "90%", width: "90%"}}>
        <Grid item xs={mdDown ? 12 : 4}>
          <CardComponent backgroundColor="green" title="Total Products" value={products.length} icon="Inventory" to={{to: '/products', param: 'all'}}/>
        </Grid>
        {user.role === 'admin' && <Grid item xs={mdDown ? 12 : 4}>
          <CardComponent backgroundColor="red" title="Out of stock" value={outOfStock} icon="ProductionQuantityLimits" to={{to: '/products', param: 'out'}}/>
        </Grid>}
      </Grid>
    </BaseLayout>
  )
}

