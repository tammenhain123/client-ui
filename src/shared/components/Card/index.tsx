import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import { ICardProps } from './types';
import * as Icons from "@mui/icons-material"; 
import { useMediaQuery, useTheme } from '@mui/material';

interface ITo {
  to: string
  param: string
}

type IconMap = {
  [key: string]: React.ElementType;
};

const iconMap: IconMap = {
  ProductionQuantityLimits: Icons.ProductionQuantityLimits,
  Inventory: Icons.Inventory,
  // list of icons that we gonna use
};

const CardComponent = ({ title, value, icon, backgroundColor, to }: ICardProps & { to: ITo }) => {
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : null;
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link to={to.to} style={{ textDecoration: 'none' }}>
      <Card 
        style={{ 
          backgroundColor: backgroundColor, 
          opacity: hovered ? 1 : 0.7, 
          transition: 'opacity 0.3s ease-in-out',
          cursor: hovered ? 'pointer' : 'default' 
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {IconComponent && (
              <IconComponent style={{ fontSize: 40, marginRight: 10 }} />
            )}
            <div style={{ marginLeft: 10 }}>
              <Tooltip title={title}>
                <Typography variant={smDown ? "h6" : mdDown ? "h5" : "h4"} component="div" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {title}
                </Typography>
              </Tooltip>
              <Typography variant={smDown ? "h6" : mdDown ? "h5" : "h4"} component="div" gutterBottom style={{ whiteSpace: 'nowrap' }}>
                {value}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardComponent;