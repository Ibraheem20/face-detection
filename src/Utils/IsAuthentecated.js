import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";

function IsAuthentecated(props){
    const context=useContext(Context);
    const navigate=useNavigate();
    return(
        <>
            {context.token?
            props.children
            :
            navigate('/login')}
        </>
    )
}
export default IsAuthentecated;