import React, { useState, useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Utils/Context";
import './Login.css'

function Login(){
    const [isLogin, setIsLogin]=useState(true);
    const [isWaiting, setIsWaiting]=useState();
    const enteredEmail=useRef();
    const enteredPassword=useRef();
    const context=useContext(Context);
    const navigate=useNavigate();

    function hasNoAccount(){
        setIsLogin(!isLogin);
    }
    function handleSubmit(e){
        e.preventDefault();
        setIsWaiting(true);
        const email=enteredEmail.current.value;
        const password=enteredPassword.current.value;
        let url;
        if(isLogin){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfy4buFzNnM4xJsI5nog5RChaXeZt2e7U"
        }else{
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfy4buFzNnM4xJsI5nog5RChaXeZt2e7U";
        }fetch(url,{
            method:'POST',
            body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
            }),
            headers:{"Content-Type":"application/json"}
        }
        ).then(res =>{
            setIsWaiting(false);
            if(res.ok){
                res.json().then(async data => await context.login(data.idToken));
                navigate('/profile')
            }else{
                res.json().then(data =>{alert(data.error.message)})
                
            }
        })
    }

    return(
        <section>
        <form onSubmit={handleSubmit}>
            <h2>{isLogin? "Login" : "Sign Up"}</h2>
            <div>
                <label name="email">Your Email</label>
                <input type="email" name="email" ref={enteredEmail} />
            </div>
            <div>
                <label name="password">Your Password</label>
                <input type="password" name="password" ref={enteredPassword} />
            </div>
            <div className="buttons">
                <button type="submit" className={`${isWaiting?'submit-disable':'submit-active'}`} disabled={isWaiting}>{isLogin?"Login":"Create Account"}</button>
                <button type="button" className="switch" onClick={hasNoAccount}>{isLogin?"Create new account":"Login with existing account"}</button>
            </div>
        </form>
        </section>
    )
}
export default Login;