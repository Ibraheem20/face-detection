import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Clarifai from 'clarifai';
import './Profile.css';
import { Context } from "../../Utils/Context";

function Profile(){
    const app = new Clarifai.App({
        apiKey: 'YOUR API KEY HERE'
       });
    const context=useContext(Context);
    const [url,setUrl]=useState('');
    function onInputChange(e){
        setUrl(e.target.value);
    }
    function detection(){
    app.models.predict(Clarifai.FACE_DETECT_MODEL,url)
    .then(resp => {
        console.log(resp);
      })
    .catch(err => console.log("33333",err));
    }

    return(
        <div className="profile-container">
            <div>
                <h1>Welcome on Board!</h1>
            </div>
            <div className="input-field">
                <input type="text" onChange={onInputChange} style={{width:'500px',marginRight:'10px',padding:'10px'}} />
                <button className="detectBtn" onClick={detection} > Detect !</button> 
            </div>
            <div className="image">
                <img src={url} alt="" />
            </div>
        </div>
    )
}
export default Profile;