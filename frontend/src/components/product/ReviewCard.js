import React from 'react'
import "./ProductDetails.css"
import ReactStars from 'react-stars'
import appstore from "../../images/appstore.png" 
const ReviewCard = ({review}) => {
    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"blue",
        value:review.rating,
        isHalf:true
    }
     
  return (
    <>
    <div className='reviewCard'>
    <img src = {appstore}/>
    <br></br>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
    </>
  )
}

export default ReviewCard