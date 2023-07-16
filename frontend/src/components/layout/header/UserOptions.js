import React from 'react';
import { useState } from 'react';
import { Backdrop } from "@material-ui/core";
import {SpeedDial , SpeedDialAction} from "@material-ui/lab"
import {Dashboard , Person , ExitToApp , ListAlt } from "@material-ui/icons"
import "./Header.css"
import {useNavigate} from "react-router-dom"
import {useDispatch , useSelector} from "react-redux"
import { logout } from '../../../actions/userActions';
import Cart from '../../cart/Cart';

const UserOptions = ({user}) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const options = [
    
    {icon:<Person/> ,name: "Profile" , func : account} ,
    {icon:<ListAlt/> ,name: "Orders" , func : orders} ,
    {icon:<ExitToApp/> ,name: "Logout" , func : logOut} ,
    
  ]
  
  if(user.role==="admin"){
    options.unshift({icon:<Dashboard/> ,name: "DashBoard" , func : dashboard})
  }
  const [open, setOpen] = useState(false);

  function account(){
    navigate("/account");
  }
 

  function dashboard(){
    navigate("/admin/dashboard");
  }

  function orders(){
    navigate("/orders");
  }

  function logOut(){
    dispatch(logout());
    navigate("/");
  }
  
  return (
    <>
    <Backdrop open = {open} style={{zIndex : "10"}}/>
      <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      className='speedDial'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open = {open}
        direction='down'
        style={{zIndex:11}}
        
        icon = {
          <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/logo512.png"}/> 
        }
      >
      {
        options.map((option)=>(
          <SpeedDialAction icon={option.icon } tooltipTitle ={option.name} onClick={option.func}/>
        ))
      }
      </SpeedDial>


    </>
  )
}

export default UserOptions