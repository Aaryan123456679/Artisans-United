import React from "react";
import "./../Component_css/SellerProductComponent.css";
import { NumericFormat } from 'react-number-format';

function SellerProductComponent({ id, price, image, title }) {
  return (
    <div className="sellerProductComponent">
      <div className="sellerProduct__info">
      <>
        <p>{title}</p>
        <p className="sellerProduct__">
          <strong>{price}</strong>
        </p>
        </>
      </div>
      <img className="sellerProduct__image" src={image} alt ="Enter an image"/>
    </div>
  );
}

export default SellerProductComponent;