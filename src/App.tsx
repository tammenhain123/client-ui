import { AuthProvider } from './shared/context/AuthProvider'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppRoutes } from './routes/routes'
import { ThemeBaseProvider } from './shared/context/ThemeProvider'
import { SideBarMenu } from './shared/components/SideBarMenu'
import { DrawerProvider } from './shared/context/DrawerProvider'
import { useLocation } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <ThemeBaseProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<AppRoutes />} />
              <Route path="/*" element={<WithSidebarRoutes />} />
            </Routes>
          </BrowserRouter>
        </DrawerProvider>
      </ThemeBaseProvider>
    </AuthProvider>
  )
}

function WithSidebarRoutes() {
  const location = useLocation();

  const isRootOrLogin = location.pathname === '/' || location.pathname === '/login';

  return !isRootOrLogin && (
    <SideBarMenu>
      <AppRoutes />
    </SideBarMenu>
  );
}

export default App