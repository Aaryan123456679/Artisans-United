import React from 'react'
import StarIcon from "@mui/icons-material/Star";
import "./../Component_css/CheckoutProduct.css";
import {useStateValue} from "./../dataLayer/StateProvider";
function CheckoutProduct({id,title,image,price,rating}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () =>{
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id: id,
            
        })
    }

  return (
    <div className='CheckoutProduct'>
      <img className='CheckoutProduct__image' src={image} />
      <div className='CheckoutProduct__info'>
        <p className='CheckoutProduct__title'>{title}</p>
        <p className="CheckoutProduct__info__price">
        <small>$</small>
        <strong>{price}</strong>
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
        <button className='CheckoutProduct__button' onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
