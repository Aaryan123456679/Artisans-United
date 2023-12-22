import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import { Route, Routes } from "react-router-dom";
import Checkout from './components/Checkout';
import Home from './components/Home';
import { useStateValue } from "./dataLayer/StateProvider";
import { useEffect } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import React, { useState } from 'react';
import {auth, getUserRole, getUserName} from "./Firebase.js";
import SellerProduct from './components/SellerProduct';
import Footer from './components/Footer';
import CreateUser from './components/CreateNewUser';


function App() {

  const [{basket, user, roleUser}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser });
        const role = await getUserRole(authUser.email);
        dispatch({ type: 'SET_ROLE', roleUser: role });
        const name = await getUserName(authUser.email);
        dispatch({type: 'SET_NAME', userName:name});

      } else {
        dispatch({ type: 'SET_USER', user: null });
        dispatch({ type: 'SET_ROLE', roleUser: null });
        dispatch({type:'SET_NAME', userName:"Guest"})
      }
    });
    return ()=>{
      unsubscribe();
    }
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        {console.log(roleUser)}
        <Route path="/" element={<><Header /><Home/><Footer /></>} />
        <Route path="/CreateUser" element={<Login />} />
        <Route path="/Login" element={<CreateUser />} />

        <Route path="/Checkout" element={<><Header /><Checkout /><Footer /></>} />
        <Route path="/Sell" element={<><Header /><SellerProduct /><Footer /></>} />
      </Routes>
    </div>
  )
}

export default App;