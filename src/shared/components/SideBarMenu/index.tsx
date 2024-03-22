import { Avatar, Box, Divider, Drawer,  List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { useDrawerContext } from "../../context/DrawerProvider/useDrawer";
import ListItemMenuLink from "./ListItemMenuLink";
import { useThemeContext } from "../../context/ThemeProvider/useTheme";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { getUserLocalStorage } from "../../context/AuthProvider/util";

interface SideBarMenuProps {
  children?: ReactNode; // 
}

export const SideBarMenu: React.FC<SideBarMenuProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const drawer = useDrawerContext()
  const appTheme = useThemeContext()
  const auth = useAuth()
  const user = getUserLocalStorage()
  
  const logout = async (event) => {
    event.preventDefault();
    try {
      await auth.logout()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <>
      {user && <Drawer open={drawer.isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={drawer.toggleDrawer}>
        <Box height="100%" width={theme.spacing(28)} display="flex" flexDirection="column">
          <Box width="100%" display="flex" alignItems="center" justifyContent="center" height={theme.spacing(20)}>
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} src="src\assets\avatar.jpg" />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawer.drawerOptions.map(drawerOption => (
                <ListItemMenuLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? drawer.toggleDrawer : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={appTheme.toggleTheme}>
                <ListItemIcon>
                  <DarkModeIcon />
                </ListItemIcon>
              <ListItemText primary='Change theme'/>
            </ListItemButton>
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
              <ListItemText primary='Logout'/>
            </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>}
      <Box height='100vh' marginLeft={smDown ? 0 :theme.spacing(28)}>
        {children}
      </Box>
      
    </>
  );
};

export default SideBarMenu; 