import React, { useState , useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import {useDispatch , useSelector} from "react-redux"
import { getProductsDetails, newReview } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css"
import ReactStars from 'react-stars';
import ReviewCard from './ReviewCard';
import Loader from '../layout/loader/Loader';
import { addToCart } from '../../actions/cartActions';
import { Dialog ,DialogActions , DialogContent , Button , DialogTitle } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle=()=>{
    open ? setOpen(false) : setOpen(true)
  }




  const {product , loading , error} = useSelector((state)=>state.details)
  const {success} = useSelector((state)=>state.newReviews);
 
  useEffect(() => {

    //like there was req.params.id wese hi in fronend there is match.params.id
    dispatch(getProductsDetails(id));

    if(success){
      dispatch({
        type:REVIEW_RESET
      })
    }

  }, [dispatch , id , success])
  
  const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"blue",
    value:product.ratings,
    isHalf:true
}

const [quantity, setQuantity] = useState(1);

const decreaseQuantity=()=>{
  if(quantity<=1) return;

  let qty = quantity - 1;
  setQuantity(qty);
}

const increaseQuantity=()=>{
  if(product.stock <= quantity) return;
  let qty = quantity + 1;
  setQuantity(qty);
}

const addToCartHandler =()=>{
  dispatch(addToCart(id , quantity));
}

const closeHandler=()=>{
  setOpen(false);
}

const reviewSubmitHandler=()=>{
  const myForm = new FormData();
  myForm.set("rating" , rating);
  myForm.set("comment" , comment);
  myForm.set("productId" , id);

  dispatch(newReview(myForm));
  setOpen(false);
}
 

  return (
    
    <>

    {
      loading ? (<Loader/>) : (
        <>
        <div className='ProductDetails'>
    
        
        <Carousel>
            {
              product.images && 
              product.images.map((item , i)=>(
                
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
              ))
            }
            </Carousel>
       
        

        <div>
          <div className='detailsBlock-1'>
            <h2>{product.name}</h2>
            <p>Product id : {product._id}</p>
          </div>

          <div className='detailsBlock-2'>
            <ReactStars {...options}/>
            <span>({product.reviewNum})</span>
          </div>
        </div>

         <div className="detailsBlock-3"> 
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity}>-</button>
              <input style={{width:"20px" , alignItems: "center"}} readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
              </div>
              {" "}
              <button disabled={product.stock<1 ? true:false} onClick={addToCartHandler}>Add to cart</button>
            </div>

            <p> status :{" "}
              <b className={product.stock<1 ? "redColor" : "greenColor"}>
                {product.stock<1 ? "Out of Stock" : "In stock"}
              </b>
            </p>

            <div className='detailsBlock-4'>  
            <p>
              Description : {product.desc}
            </p>

            </div>

            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
          
          </div>  
    </div>

    <Dialog open={open} onClose={submitReviewToggle}>
      <DialogContent className='submitDialog'>
          <Rating
            onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size='large'
          />

          <textarea className='submitDialogTextArea' rows='5' cols='30'
            value={comment} onChange={(e)=>setComment(e.target.value)}
          ></textarea>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={closeHandler}>Cancel</Button>
        <Button onClick={reviewSubmitHandler}>Submit</Button>
      </DialogActions>
    </Dialog>

    <h3 className='reviewsHeading'>Reviews</h3>    
    {
              product.reviews && product.reviews[0] ? (
                
                <div className='reviews'>
                  {product.reviews && 
                  product.reviews.map((review)=>(
                    <ReviewCard review = {review}/>
                  ))}
                </div>
              ):(
                <p className = "noReviews">No Reviews Yet</p>
              )
            }
            </>
      )
    }

    
    </>
  )
}

export default ProductDetails