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
        <p className="product-description">{description}</p>
        <p className="product-price">Price: ${value}</p>
        <p className="product-quantity">Available Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;