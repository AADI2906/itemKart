import React from 'react'
import "./CartItem.css"
import {Link} from "react-router-dom"
import {  removeFromCart } from '../../actions/cartActions';
import {useDispatch } from "react-redux";


const CartItem = ({item}) => {
  const dispatch = useDispatch();
  const removeItem =(id)=>{
    dispatch(removeFromCart(id));
  }

  return (
    <>
        <div className='CartItemCard'>
            <img src={item.image} alt='Item'/>
            <div>
                <Link to={`/product/${item.product}`} >{item.name}</Link>
                <span>{`Price: Rs ${item.price}`}</span>
                <p onClick={()=> removeItem(item.product)}>Remove</p>
            </div>
        </div>
    </>
    
  )
}

export default CartItem