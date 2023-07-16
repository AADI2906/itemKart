import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
// import {FaUserAlt} from "react-icons/fa"
// import { FaUserAlt} from "react-icons/fa";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "7vmax",
  navColor1: "grey",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.7vmax",
  link1Color: "#fff",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#fff",
  searchIconColorHover: "#fff",
  cartIconColorHover: "#fff",
  cartIconMargin: "1.9vmax",
  profileIconUrl: "/login", 
  profileIcon:true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle, 
  searchIcon:true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement:MdAddShoppingCart,
  
}

export const Header = () => {
  return (
    <ReactNavbar {...options}
    />
  )
}
