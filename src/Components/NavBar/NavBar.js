import React from "react";
import './NavBar.css';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Utils/Context";
import { useEffect } from "react";

function NavBar(){
    const [isLogged, setIsLogged]=useState(false);
    const [navItem,setNavItem]=useState('/');
    const context=useContext(Context);
    const location=useLocation();
    useEffect(()=>{
        console.log(context)
        if(context.token){
            setIsLogged(true);
            console.log(isLogged," -- ", location.pathname," -- ",navItem)

        }
        setNavItem(location.pathname);
    },[location])
    // const [activeButton,setActiveButton]=useState(context.navFocus);
    // console.log(context.navFocus);
    function loginOrOut(e){
        setNavItem(e.target.name);
        if(e.target.name==='login' && context.token){
            context.logout();
            setIsLogged(false);
        }
    }
    return(
        <header className="container">
            <Link to={'/'} className="title">
                <h2>React Auth</h2>
            </Link>
            {isLogged?
            <Link to={'/profile'} name='/profile' className="home" id={`${navItem === '/profile' ? 'active-button' : ''}`} onClick={loginOrOut}>Profile</Link>
                :
                null
            }
            <Link to='/' name='/login' className="login" id={`${navItem === '/login' ? 'active-button' : ''}`} onClick={loginOrOut}>{`${context.token? 'Logout':'Login'}`}</Link>
           
        </header>
    )
}
export default NavBar;