import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import SideBar from '../Component/Sidebar'
import { UserProfile } from '../Component'
import logo from '../assets/logo.png'
import Pins from './Pins'
import db from '../firebase'

const Home = () =>  {
  

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
 
  //we are getting decoded user info from our utility function fetchUser
  // const decoded = fetchUser();
  


   useEffect(() => {
    const userId = localStorage.getItem('user');
    // console.log(userId)

    const userRef = db.collection('users').doc(userId);
    const fun = async () => {
      try{
        const doc = await userRef.get();
        setUser(doc.data())
        // console.log(doc.data());
      }catch{
        // console.log("error in finding in db")
      }
    }
    fun();
  
  } ,  [] )

  // console.log(user);
  // useEffect(() => {
  //   // in the start we should be in the start of the page so setting it to the start
  //   scrollRef.current.scrollTo(0, 0)
  // } ,  [] )

  return (
    <div className='flex bg-grey-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial rounded-lg shadow-lg'>
        <SideBar user={user && user} />
      </div>

      
      <div className='flex md:hidden flex-row'>

        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu  fontSize={40} className="cursor-pointer" onClick={ () => setToggleSidebar(true) } />
          <Link to="/home">
            <img src={logo} alt="logo" className='w-28'  />
          </Link>
          <Link to={`user-profile/${user?.user_id}`}>
            <img src={user?.image} alt="logo" className='w-28 rounded-full'  />
          </Link>
        </div>

        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2 '>
              <AiFillCloseCircle fontSize={40}  className='cursor-pointer ' onClick={ () => setToggleSidebar(false) } />
            </div>
            <SideBar user={user && user} closeToggle={toggleSidebar}  />     
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll ' ref={scrollRef} >
        <Routes>
        <Route path='/home/search/user-profile/:userId' element={<UserProfile />} />
          <Route path='/home/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>

  )
}

export default Home
