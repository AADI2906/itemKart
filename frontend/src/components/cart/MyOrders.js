import React, { useEffect } from 'react'
import {DataGrid} from "@material-ui/data-grid"
import "./Myorders.css"
import Loader from "../layout/loader/Loader"
import {useDispatch, useSelector} from "react-redux"
import { Typography } from '@material-ui/core'
import { myOrders } from '../../actions/orderActions'

const MyOrders = () => {

    const {user} = useSelector((state)=>state.user);
    const {loading , error , orders} = useSelector((state)=>state.myOrders);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(myOrders());
    }, [dispatch])

    const cols = [
        {
            field:"id" , 
            headerName:"Order Id",
            minWidth:300,
            flex : 1
        },
        {
            field:"status" , 
            headerName:"Order Status",
            minWidth:150,
            flex : 0.3
        },
        {
            field:"quantity" , 
            headerName:"Item Quantity",
            type:"number",
            minWidth:150,
            flex : 0.3
        },
        {
            field:"amount" , 
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex : 0.5
        },
    ];
    const rows = [];

    orders && orders.forEach((order , index) => {
        rows.push({
            quantity: order.orderItems.length , 
            id:order._id,
            amount:order.totalPrice,
            status:order.orderStatus
        })
    });
    

  return (
    <>
       {
        loading ? <Loader/> :(
            <div className='myOrdersPage'> 
                <DataGrid 
                    rows={rows}
                    columns={cols}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
                />

                <Typography>{user.name}'s Order</Typography>
            </div>
        )
       }
    </>
  )
}

export default MyOrders