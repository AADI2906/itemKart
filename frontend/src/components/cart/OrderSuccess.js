import React from 'react'
import "./OrderSuccess.css"
import {CheckCircle} from "@material-ui/icons"
import {  Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <>
        <div className='orderSuccess'>
            <CheckCircle/>
            <Typography>Your Order has been placed successfully</Typography>
            {/* <Link to="/orders" >View Orders</Link> */}
            <Link to="/orders">View Orders</Link>
        </div>
    </>
  )
}

export default OrderSuccess