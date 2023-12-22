import React, { useState } from 'react';
import "./../Component_css/Login.css";
import { Link , useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";
import {auth, addUser, dataBase, getUserRole} from "./../Firebase.js";

function Login() {
  const history = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const register = async (event) => {
    event.preventDefault();
    const selectedRadioButton = document.querySelector('input[name="role"]:checked');
    if (!selectedRadioButton) {
      // Access the value of the selected radio button
      alert('Please select a Role');
    }
    const role = selectedRadioButton.value;
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        alert(error.message)
      });
      addUser(email,role,name)
      history("/");
  };
  return (
    <div className='login'>
      <Link to="/">
      <img alt="Img not found" className="login__logo" src="https://i.imgur.com/18ZlPYe.png" />
      </Link>
      
      <div className="login__container">
        <h1>Sign In</h1>
        <form action="">
        <h5>User Name</h5>
          <input type="email" value ={name} onChange={event => setName(event.target.value)} />
          <h5>E-mail</h5>
          <input type="email" value ={email} onChange={event => setEmail(event.target.value)} />
          <h5>PassWord</h5>
          <input type="password" value = {password} onChange={event => setPassword(event.target.value)} />
          <h5>Seller or Buyer</h5>
          <div className="login__role__container">
          <div className="login__role">
          <input type="radio" value = "Buyer" name="role"  />
          <label htmlFor="role">Buyer</label>
          </div>
          <div className="login__role">
          <input type="radio" value = "Seller" name="role" />
          <label htmlFor="role">Seller</label>
          </div>
          </div>
        </form>
        <p>"Join us securely. By signing up, you agree to our terms. © Artisans-United 2023. Questions? Contact support@Artisans-United."</p>
        <button onClick={register}>Create Account</button>
      </div>
    </div>
  )
}

export default Login