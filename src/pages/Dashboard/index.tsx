import { Grid, useMediaQuery, useTheme } from "@mui/material"
import CardComponent from "../../shared/components/Card"
import { BaseLayout } from "../../shared/layout"
import { getUserLocalStorage } from "../../shared/context/AuthProvider/util";
import { ProductContext } from "../../shared/context/ProductProvider";
import { useContext } from "react";

export const Dashboard = () => {
  const user = getUserLocalStorage()
  const { products } = useContext(ProductContext);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <BaseLayout showAdd={false} title="Dashboard">
      <Grid container margin={2} spacing={2} style={{ maxWidth: "90%", width: "90%"}}>
        <Grid item xs={mdDown ? 12 : 4}>
          <CardComponent backgroundColor="green" title="Total Products" value={products.length} icon="Inventory" to={{to: '/products', param: 'all'}}/>
        </Grid>
        {user.role === 'admin' && <Grid item xs={mdDown ? 12 : 4}>
          <CardComponent backgroundColor="red" title="Out of stock" value={products.filter(product => product.quantity === 0).length} icon="ProductionQuantityLimits" to={{to: '/products', param: 'out'}}/>
        </Grid>}
      </Grid>
    </BaseLayout>
  )
}

