import React from 'react'
import Sidebar from './Sidebar'
import "./dashboard.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {Doughnut , Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';



const DashBoard = () => {

  const lineState = {
    labels:["Initial amount" , "Earnings"] , 
    datasets:[
      {
        label:"Total Amount",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197 , 72 , 49)"],
        data:[0,4000]
      }
    ]
  }

  const doughnutState={
    labels:["InStock" , "Out of Stock"] , 
    datasets:[
      {
        label:"Total Amount",
        backgroundColor:["#00A6B4" , "#6800B4"],
        hoverBackgroundColor:["$4B5000" , "#35014F"],
        data:[2,10]
      }
    ]
  }

  return (
    <>
      
      <div className='dashboard'>
      <Sidebar />
      <div className='dashboardContainer'>
        <Typography component='h1'>DashBoard</Typography>
        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount Rs <b>2000</b>
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>10</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
    </>

  )
}

export default DashBoard