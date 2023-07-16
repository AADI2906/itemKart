import React from 'react'
import "./Cart.css"
import CartItem from './CartItem'
import {useDispatch , useSelector} from "react-redux";
import { RemoveShoppingCart } from '@material-ui/icons'
import { addToCart , removeFromCart } from '../../actions/cartActions';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
    

    const { cartItems } = useSelector( (state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const decQty = (id , quantity, stock)=>{
        if(quantity<=0) return;
        let newQty = quantity - 1;
        dispatch(addToCart(id , newQty));
    }
    const incQty = (id, quantity , stock)=>{
        if(stock<=quantity) return;
        let newQty = quantity + 1;
        dispatch(addToCart(id , newQty));
    }

    let gross = 0;

    cartItems && cartItems.map((item)=>(
        gross += item.price*item.quantity
    ))

    const checkOutHandler=()=>{
        navigate("/shipping")
    }
    

  return (
    <>{cartItems.length===0 ? (
        <div className='emptyCart'>
            <RemoveShoppingCart />
            <Typography>No Product in your cart</Typography>
            <Link to='/products'>Shop Products</Link>
        </div>
    ) :
    <>
         <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {
                cartItems && cartItems.map((item)=>(
                    <div className='cartContainer' key={item.product}>
                    <CartItem item = {item} />

                    <div className='cartInput'>
                        <button onClick={()=>decQty(item.product , item.quantity , item.stock)}>-</button>
                        <input type='text' readOnly value={item.quantity} />
                        <button onClick={()=>incQty(item.product , item.quantity , item.stock)}>+</button>
                    </div>
                    <p className='cartSubtotal'>{`Cart Subtotal : Rs ${item.price*item.quantity}`}</p>
                    </div>
                ))
            }

            <div className='CartGrossTotal'>
                <div></div>
                <div className='CartGrossTotalBox'>
                    <p>Gross Total</p>
                    <p>{`Rs ${gross}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>

        </div>
    </>
}
    </>
   
  )
}

export default Cart