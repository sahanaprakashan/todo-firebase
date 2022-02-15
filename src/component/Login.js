import React from 'react'
import { useNavigate } from "react-router-dom";

import "./style/dasboard.css"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import image from "../assets/Vector.png";



const provider = new GoogleAuthProvider();

const auth = getAuth();

function Login() {
  const navigate = useNavigate()


const login = () =>{
  signInWithPopup(auth, provider)
  .then((result) => { 
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    if(token){
      localStorage.setItem('token', token)  
      localStorage.setItem('user', JSON.stringify(user) )  
      navigate('/dashboard')

    }
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
  

  });

}

  return (
    <div>
      <div className='m-xxl-5'>
        <img src={image} alt="" />
      </div>
      <div className="main-login">
      <div className='main-head'>LOGIN</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at
          eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae
          faucibus nibh dolor dui.</p>
          </div>
      <div className='main-head' >
      <button className='button' onClick={login}>Sign in with google</button>
      </div>
      
    </div>
  )
}

export default Login