import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import {Link , useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/loader/Loader';

import "./Profile.css"


const Profile = () => {

  
  const {user , isAuth , loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(isAuth===false){
      navigate('/login');
    }

  }, [isAuth , navigate])
  

  return (
<>
  {loading ? 

  (<Loader/>):
  
  ( <>
    <MetaData title={`${user.name}'s Profile`}/>

    <div className='profileContainer'>
    <div>
      <h1>My Profile</h1>
      <img style={{borderRadius:"100%" , height:"300px" , width:"300px"}} src={user.avatar.url} alt={user.name}/>
      <Link to='/me/update'>Edit Profile</Link>
    </div>

    <div>
      <div>
        <h4>Full Name</h4>
        <p>{user.name}</p>
      </div>
    
      <div>
        <h4>Email</h4>
        <p>{user.email}</p>
      </div>
    
      <div>
        <Link to='/orders'>My Orders</Link>
        <Link to='/password/updatePassword'>Change Password</Link>
      </div>
      </div>
      
    </div>
  </>)}
</>

  
  )
}

export default Profile