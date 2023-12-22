import React from 'react';
import "./../Component_css/SubTotal.css";
import { NumericFormat } from 'react-number-format';
import {useStateValue} from "./../dataLayer/StateProvider";
import { getBasketTotal } from '../dataLayer/reducer';

function SubTotal() {
    const [{basket}, dispatch] = useStateValue();
  return (
    <div className='subtotal'>
    <NumericFormat
      renderText = {(value) =>(
        <>
        <p>
            SubTotal ({basket.length} items) : <strong>{`Subtotal : ${value}`}</strong><br /><br />
            <small className='subtotal__giftbox'>
                <input type="checkbox" />This order contains gift.
            </small><br />
        </p>
        </>
      )}
      decimalScale={2}
      value={getBasketTotal(basket)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />
      <button>Proceed to Checkout</button>
    </div>
  )
}

export default SubTotal
