import { Route, Routes } from 'react-router-dom';
import { ProtectedLayout } from '../shared/components/ProtectedLayout';
import { Dashboard, LoginPage, Products } from '../pages';
import { useEffect } from 'react';
import { useDrawerContext } from '../shared/context/DrawerProvider/useDrawer';

export function AppRoutes() {
  const drawer = useDrawerContext()

  useEffect(()=>{
    drawer.setDrawerOptions([{
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard"
      },
      {
        label: "Products",
        icon: "Inventory",
        path: "/products"
      }
    ])
  },[])
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/products" element={<ProtectedLayout><Products/></ProtectedLayout>} />

    </Routes>
  );
}