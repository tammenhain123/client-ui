import React from 'react';
import './style.css';
import { Typography } from '@mui/material';

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  value: number;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  description,
  value,
  quantity,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <Typography variant='h5' className="product-name">{name}</Typography>
        <Typography className="product-description">{description}</Typography>
        <Typography className="product-price">Price: ${value}</Typography>
        <Typography className="product-quantity">Available Quantity: {quantity}</Typography>
      </div>
    </div>
  );
};

export default ProductCard;