import React, {useState} from 'react';
import "./../Component_css/CreateUser.css";
import { Link , useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";
import {auth, addUser, dataBase, getUserRole} from "./../Firebase.js";

function CreateUser() {

    const history = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const login = async (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
          .then((auth) => {
            history('/');
          })
          .catch((error) => {
            alert(error.message);});
      };


  return (
    <div className='createUser'>
      <Link to="/">
      <img alt="Img not found" className="login__logo" src="https://i.imgur.com/18ZlPYe.png" />
      </Link>
      
      <div className="login__container">
        <h1>Sign In</h1>
        <form action="">
          <h5>E-mail</h5>
          <input type="email" value ={email} onChange={event => setEmail(event.target.value)} />
          <h5>PassWord</h5>
          <input type="password" value = {password} onChange={event => setPassword(event.target.value)} />
          <button type='submit' onClick={login}>Sign In</button>
        <Link to="/CreateUser">
        <button className='createUser__btn'>Create Account</button>
        </Link>
        </form>
      </div>
    </div>
  )
}

export default CreateUser
