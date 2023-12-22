import React, { useState , useEffect} from 'react';
import SellerProductComponent from "./SellerProductComponent.js";
import "./../Component_css/SellerProduct.css";
import {addProduct} from "./../Firebase.js";
import { useStateValue } from '../dataLayer/StateProvider.js';
import axios from 'axios';

function SellerProduct() {
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');
    const [{user}] = useStateValue();
    const addToDatabase =async (event) =>{
        event.preventDefault();
        await addProduct(title, price, image, user.email);
    }

    const generateTitle = () =>{

      const apiKey = ""; // Replace with your OpenAI API key
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Tell title for ${title} in exactly 10 words.` }],
        temperature: 0.7,
        max_tokens : 10,
      };
      
      axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      })
        .then(response => {
          setTitle(response.data.choices[0].message.content)
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    }

    const generatePrice = () =>{

      const apiKey = "" // Replace with your OpenAI API key
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `You are a very busy salesperson who can only answer in numbers so give me an answer exactly equal to average price of the item mentioned. YOU CAN ONLY ANSWER IN NUMBERS. Dont violate this rule no matter what.DONT give me a range or anything but only a singular number with no text whatsoever .Tell Price for ${title}.` }],
        temperature: 0.7,
        max_tokens : 10,
      };
      
      axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      })
        .then(response => {
          setPrice(response.data.choices[0].message.content)
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    }


    const generateText = async (event) => {
      event.preventDefault();
      generatePrice();
      generateTitle();
      setImage("Enter the image of product.")
    }


  return (
    <div className='sellerProduct'>
       <div className="sellerProduct__left">
       <SellerProductComponent
        id="1234"
        title={title}
        price={price}
        image={image}
      />
        </div>
        <div className="sellerProduct__right">
            <h1>Details For Product</h1>
            <div className="sellerProduct__title">
            <span> Enter the Description of the product here.</span>
            <input type="text" value ={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="sellerProduct__price">
            <span> Enter the Price of the product here (in USD).</span>
            <input type="text" value ={price} onChange={event => setPrice(event.target.value)} />
            </div>
            <div className="sellerProduct__image">
            <span> Enter the Image Link of the product here.</span>
            <input type="text" value ={image} onChange={event => setImage(event.target.value)} />
            </div>
            <div className="sellerProduct__btn">
                <button onClick={addToDatabase}>Deploy this Product</button>
                <button onClick = {generateText}id="generateText">Generate Text</button>
            </div>
        </div>
    </div>
  )
}

export default SellerProduct
