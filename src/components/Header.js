import React from 'react';
import "./../Component_css/Header.css";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useStateValue} from "./../dataLayer/StateProvider";
import {auth} from "./../Firebase";
function Header() {
    const [{basket, user, roleUser, userName}] = useStateValue();

    const login = () =>{
        if(user){auth.signOut()}
    }

    const search = async (event) =>{
        event.preventDefault();
        alert("Searched");
    }

  return (
    <nav className="header">
        <Link to="/">
        <img alt="Img not found" className="header__logo" src="https://i.imgur.com/18ZlPYe.png" />
        </Link>


        <div className="header__search">
        <input type="text" className="header__searchInput" />
        <button onClick={search}className="header__SearchIcon"><SearchIcon ></SearchIcon></button>
        </div>


        <div className="header__nav">
            <Link className='header__link' to={!user && "/Login"}>
            <div className="header__option" onClick={login}>
                <span className='header__option__line1'>Hello {userName ? userName : 'Guest'}</span>
                <span className='header__option__line2'>{user ?"Sign Out" :"Sign In"}</span>
            </div>
            </Link>
            <Link className='header__link' to="/">
            <div className="header__option">
                <span  className='header__option__line1'>Return</span>
                <span className='header__option__line2'>& Orders</span>
            </div>
            </Link>
            <Link className='header__link' to="/">
            <div className="header__option">
                <span className='header__option__line1'>Your</span>
                <span className='header__option__line2'>Prime</span>
            </div>
            </Link>
        {(roleUser == "Buyer") ? (<Link className='header__link' to="/Checkout">
            <div className="header__optionBasket">
                <ShoppingCartIcon />
                <span className='header__option__line2 header__optionBasket__count'>{basket?.length}</span>
            </div>
            </Link>):(<Link className='header__link' to="/Sell">
            <div className="header__optionBasket">
                <AddToPhotosIcon />
            </div>
            </Link>)}
        </div>
    </nav>
  )
}

export default Header
