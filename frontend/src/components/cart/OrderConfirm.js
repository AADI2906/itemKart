import React , {useState} from 'react'
import ShipSteps from './ShipSteps'
import {useDispatch , useSelector} from "react-redux";
import "./orderConfirm.css"
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {  saveShippingInfo  } from '../../actions/cartActions';

const OrderConfirm = () => {
    const navigate = useNavigate();
    const {shipInfo , cartItems} = useSelector((state)=> state.cart)
    const {user} = useSelector((state) => state.user)
    const addresss = `${shipInfo.address} , ${shipInfo.city} , ${shipInfo.state} , ${shipInfo.country}`
    const dispatch = useDispatch();
    const subTotal = cartItems.reduce(
        (acc,item)=> acc + item.quantity*item.price , 0
    )

    const shipCharge = subTotal > 1000 ? 0 : 40 
    const tax = 0.18*subTotal;
    const total = tax + shipCharge + subTotal;
    const [address, setAddress] = useState(shipInfo.address);
    const [country, setCountry] = useState(shipInfo.country);
    const [state, setState] = useState(shipInfo.state);
    const [city, setCity] = useState(shipInfo.city);
    const [pinCode , setPinCode] = useState(shipInfo.pincode);
    const [phone , setPhone] = useState(shipInfo.phone);

    const proceedToPayment=()=>{
        dispatch(saveShippingInfo({
                address,
                country,
                state,
                city,
                pinCode,
                phone,
                shipCharge,
                tax,
                total
        }))
        navigate("/process/payment")
    }

  return (
   <>
     <ShipSteps step = {1} />
     <div className='confirmOrderPage'>
        <div>
            <div className='confirmshippingAreaBox'>
            <Typography>Shipping Address</Typography>
                <div>
                    <p>Name: </p>
                    <span>{user.name}</span>
                </div>
                <div>
                    <p>Phone Number: </p>
                    <span>{shipInfo.phone}</span>
                </div>
                <div>
                    <p>Address: </p>
                    <span>{addresss}</span>
                </div>
            </div>
        </div>

        <div className='confirmCartItems'>
        <Typography>Your Items</Typography>
        <div className='confirmCartItemsContainer'>
            {
                cartItems && cartItems.map((item)=>(
                    <div>
                        <img src={item.image}/>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                        <span>
                            {item.quantity} X {item.price} = {" "}
                            <b>Rs {item.price*item.quantity}</b>
                        </span>
                    </div>

                ))
            }
        </div>

        </div>

     </div>

{/* {} */}
     <div className='orderSummary'>
        <Typography>Order Summary</Typography>
        <div>
        <div>
            <p>Subtotal</p>
            <span>Rs {subTotal}</span>
        </div>
        <div>
            <p>Tax Charges</p>
            <span>Rs {tax}</span>
        </div>
        <div>
            <p>Shipping Charges</p>
            <span>Rs {shipCharge}</span>
        </div>
        <div>
        <div className='orderSummaryTotal'>
            
            <b>Total: </b>
            <span>Rs {total}</span>
            
            
           
            
        </div>
        
        <button 
        onClick={proceedToPayment}
        style={{backgroundColor:"tomato" , cursor:"pointer" , color:"white", borderRadius:"10%"}}>Proceed to payment</button>
    
        </div>
    </div>
     </div>

   </>
   
  )
}

export default OrderConfirm
