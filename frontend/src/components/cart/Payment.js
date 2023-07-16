import React, { useRef , useEffect} from 'react'
import ShipSteps from './ShipSteps';
import "./Payment.css"
import {CardNumberElement, CardCvcElement ,  CardExpiryElement, useElements , useStripe} from "@stripe/react-stripe-js"
import { Typography } from '@material-ui/core';
import { CreditCard , Event , VpnKey } from '@material-ui/icons';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createOrder ,clearErrors } from '../../actions/orderActions';

const Payment = () => {

  const {user} = useSelector((state)=>state.user);
  const {shipInfo , cartItems} = useSelector((state)=>state.cart);
  const{error} = useSelector((state)=> state.order)
  const dispatch = useDispatch();

  const paymentInfo = {
    amount: Math.round(shipInfo.total*100) ,
  }

  const order = {
    shippingInfo:shipInfo , 
    orderItems:cartItems,
    itemsPrice:shipInfo.total - shipInfo.tax - shipInfo.shipCharge,
    taxPrice:shipInfo.tax,
    shippingPrice:shipInfo.shipCharge,
    totalPrice:shipInfo.total
  }

  useEffect(() => {
    
    if(error){
      dispatch(clearErrors())
    }

  }, [dispatch , error])
  

  const payBtn = useRef(null);
  const elements = useElements();
  const stripe = useStripe();
  const total = shipInfo.total;
  const navigate = useNavigate();
  

  const submitHandler= async(e) =>{
    e.preventDefault();
    payBtn.current.disabled = true;


    try {
      const config = {
        Headers:{
          "Content-Type":"application/json"
        }
      }

      const {data} = await axios.post("/api/v1/process/payment",
        paymentInfo , 
        config
      )

      const client_secret = data.client_secret;
      
      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret , {
        payment_method:{
          card: elements.getElement(CardNumberElement),
          billing_details:{
            name:user.name , 
            email:user.email , 
            address:{
              line1:shipInfo.address , 
              city: shipInfo.city ,
              state: shipInfo.state , 
              country: shipInfo.country ,
              postal_code: shipInfo.pinCode
            }
          }
        }
      })
      
      if(result.paymentIntent.status==="succeeded"){
        order.paymentInfo={
          id:result.paymentIntent.id ,
          status:result.paymentIntent.status
        }

        dispatch(createOrder(order));
        navigate("/success");
      }
      else{
        payBtn.current.disabled = false;
      }

    

    } catch (error) {
      payBtn.current.disabled = false;
    }
    

  }


  return (<>

  <ShipSteps step = {2}/>

  <div className='paymentContainer'> 
    <form className='paymentForm' onSubmit={(e)=>submitHandler(e)}> 
      <Typography>Card Info</Typography>
      <div>
        <CreditCard />
        <CardNumberElement className='paymentInput'/>
      </div>
      <div>
        <Event />
        <CardExpiryElement className='paymentInput'/>
      </div>
      <div>
        <VpnKey />
        <CardCvcElement className='paymentInput'/>
      </div>

      <input 
        type='submit' 
        value={`pay - Rs ${total}`}
        ref={payBtn}
        className='paymentFormBtn'
      />

    </form>
  </div>

  </>
    
  )
}

export default Payment