import React, { Component } from 'react';

const ProductListItem = (props) => {
  return (
    <li key={props.product.name}>{props.product.name} at a cost of {props.product.price} {props.product.sale}</li>
  )
};

export default ProductListItem;