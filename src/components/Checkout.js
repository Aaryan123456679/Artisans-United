import React from 'react';
import "./../Component_css/Checkout.css";
import {useStateValue} from "./../dataLayer/StateProvider";
import CheckoutProduct from './CheckoutProduct';
import SubTotal from './SubTotal';

function Checkout() {
  const [{basket}, dispatch] = useStateValue();
  return (
    <div className='checkout'>
      <div className="checkout__left">
      <img alt="" className="checkout__ad" src="https://i.imgur.com/7wUqSKi.png"/>
      {basket?.length === 0 ?(
        <div className='checkout__title'>
          <h2>Your Basket is empty</h2>
          <p>To add items to your basket click the <b>ADD TO CART</b> button on items.</p>
        </div>
      ):(
        <div>
          <h2 className='checkout__title'>Your Basket</h2>
          {basket?.map(item =>(
            <CheckoutProduct
            id = {item.id}
            title = {item.title}
            image = {item.image}
            price = {item.price}
            rating = {item.rating}
            />
          ))}
        </div>
      )}
      </div>
      {basket?.length > 0 &&(
              <div className="checkout__right">
                <SubTotal />
              </div>
      )}
    </div>
  )
}

export default Checkout