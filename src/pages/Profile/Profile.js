import React from "react";
import { useState } from "react";
import './Profile.css';
function Profile(){
    const [url,setUrl]=useState('');
    const [bounding_box, setBounding_box]=useState({top_row:'',left_col:'',bottom_row:'',right_col:''})
    function onInputChange(e){
        setUrl(e.target.value);
        setBounding_box({
            top_row: '',
            left_col: '',
            bottom_row: '',
            right_col: ''
            })
    }
    function detection(){
        
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": 'x9791522exr9',
                "app_id": 'Face-detection_app'
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": url
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + 'ef3ab15fee3042ca87ee7d15fc21bc76',
            },
            body: raw
        };

        fetch("https://api.clarifai.com/v2/models/"+"celebrity-face-detection"+"/outputs",requestOptions)
        .then(response => response.json())
        .then(result => {
            let bounderies=result.outputs[0].data.regions[0].region_info.bounding_box;
            const image=document.getElementById('face-image');
            const width = Number(image.width);
            const height = Number(image.height);
            console.log(width,height)
            setBounding_box({
            top_row: bounderies.top_row * height,
            left_col: bounderies.left_col * width,
            bottom_row: height - (bounderies.bottom_row * height),
            right_col: width - (bounderies.right_col * width)
            }) 
        })
        .catch(error => console.log('error', error));

        
    }

    return(
        <div className="profile-container">
            <div>
                <h1>Welcome on Board!</h1>
            </div>
            <div>
                <h1>Simple Face Detection App</h1>
            </div>
            <div className="input-field">
                <input type="text" onChange={onInputChange} placeholder='image URL ...  ' style={{width:'500px',marginRight:'10px',padding:'10px'}} />
                <button className="detectBtn" onClick={detection} > Detect !</button> 
            </div>
            <div className="image">
                <img src={url} alt="" id='face-image' />
                <div className="detecting-box"
                     style={{
                        top: bounding_box.top_row,
                        right: bounding_box.right_col, 
                        bottom: bounding_box.bottom_row, 
                        left: bounding_box.left_col
                    }}           
                    >
                </div>
            </div>                        
        </div>
    )
}
export default Profile;