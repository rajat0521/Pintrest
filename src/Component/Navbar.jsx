import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import styled from "styled-components";
import { auth } from '../firebase';


const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  
  // console.log(searchTerm)
  // console.log(setSearchTerm)
  // console.log(user)
  const navigate= useNavigate();
  if(user==null) return null;

  const handleAuth = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      navigate('/');
    }).catch((err) => {
      console.log(err) 
    })
  }

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input 
          type="text"
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          placeholder="Search"
          value={searchTerm}
          onFocus={ () => navigate('/home/search')}
          className='p-2 w-full bg-white rounded-md outline-none border-b-2 border-black'
          
        />
      </div>
      <div className='flex gap-3'>
        <SignOut>
          <Link to={`/home/user-profile/${user?.user_id}`} className='shadow-2xl rounded-full hidden md:block w-12 h-12 md:w-14 md:h-12 md:rounded-full' >
            <img src={user.image} alt="user" className='rounded-full' />
          </Link>
          <DropDown>
            <span onClick={handleAuth}>Sign Out</span>
          </DropDown>
        </SignOut>
        
        <Link to='/home/create-pin' className='bg-black text-white rounded-lg  w-10 h-10 md:w-14 md:h-12 flex justify-center items-center' >
          <IoMdAdd />
        </Link>
      </div>

    </div>
  )
}

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgb(19,19,19);
  border: 1px solid rgba(151,151,151,0.34);
  border-radius: 6px;
  /* box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px; */
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 110px;
  opacity: 0;
  align-items: center;
  justify-content: center;
`
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover{
    ${DropDown}{
      opacity: 1;
      transition-duration: 1sec ;
      background-color: white;
      font-weight: bolder;
      border: 2px solid gray;
    }
  }
`

export default Navbar
