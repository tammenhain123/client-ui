import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { IListItemMenuLink } from "./types";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import * as Icons from "@mui/icons-material"; 

type IconMap = {
  [key: string]: React.ElementType;
};

const iconMap: IconMap = {
  Home: Icons.Home,
  Inventory: Icons.Inventory
  // list of icons that we gonna use
};

export const ListItemMenuLink: React.FC<IListItemMenuLink> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to)
  const match = useMatch({path: resolvedPath.pathname, end: false})
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : null;

  const handleClick = () => {
    navigate(to);
    onClick?.();
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      {IconComponent && (
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
      )}
      <ListItemText primary={label}/>
    </ListItemButton>
  );
};

export default ListItemMenuLink;
