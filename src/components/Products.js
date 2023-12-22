import React from "react";
import "./../Component_css/Product.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../dataLayer/StateProvider";
import { NumericFormat } from 'react-number-format';

function Products({ id, price, image, rating, title }) {
  const [{ basket, roleUser }, dispatch] = useStateValue();
  const addToBasket = () => {
    // Add item to Basket
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        price: price,
        image: image,
        rating: rating,
        title: title,
      },
    });
  };

  return ( 
    <div className="product">
          <NumericFormat
      renderText = {(value) =>(
        <>
              <div className="product__info">
        <p>{title}</p>
        <p className="product__">

          <strong>{value}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>
                <StarIcon
                  style={{
                    color: "orange",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1), rgba(64,0,0,1))",
                  }}
                />
              </p>
            ))}
        </div>
      </div>
      <img className="product__image" src={image} />
        </>
      )}
      decimalScale={2}
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />

      {roleUser === "Buyer" && <button className = "product__button" onClick={addToBasket}>Add to Cart</button>}
    </div>
  );
}

export default Products;