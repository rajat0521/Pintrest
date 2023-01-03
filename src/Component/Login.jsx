import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import db from '../firebase';
import { auth, provider } from '../firebase';
import { useEffect } from 'react';


const Login = () => {
  const navigate = useNavigate();
  

  const handleAuth = () => {
    auth
        .signInWithPopup(provider)
        .then((result) => {
          const user = result?.user?.multiFactor?.user?.providerData[0];
          setUser(user);
        }).catch((error) => {
          console.log(error)
        });
  }

  const setUser = async (user) => {
    const data = {
      userName: user.displayName,
      email: user.email,
      image: user.photoURL,
      user_id: user.uid,
      save: []
    }
    const res= await db.collection('users/').doc(user.uid).set(data);
    navigate('/home');
    localStorage.setItem('user', user.uid )
  }
  
  return (
    <div className="flex justify-start items-center flex-col h-screen" >
      <div className="relative h-full w-full">
        <video 
          src={ shareVideo }
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay '>
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
            <div className='shadow-2xl mt-5'>
              <LoginComp onClick={handleAuth}>GOOGLE LOGIN</LoginComp>          
            </div>
          </div>

        </div>
  
      </div>

      

    </div>
  )
}

const LoginComp = styled.a`
  background-color: #ffffff;
  padding: 10px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease-out 0s;
  font-weight: bolder;

  &:hover{
    background-color: #f9f9f980;
    color: #000;
    cursor: pointer;
    border-color: transparent;
  }
  
`

export default Login
