import React , {Fragment, useEffect} from 'react'
import "./Home.css"
import Product from "./Product"
import MetaData from '../layout/MetaData';
import { getProducts } from '../../actions/productActions';
import {useDispatch , useSelector} from "react-redux"
import Loader from '../layout/loader/Loader';


// const product = {
//     name:"Tshirt Blue" , 
//     price:3000 ,
//     _id:"Adity", 
//     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}]
// };



export const Home = () => {

    const dispatch = useDispatch();
    const {loading , error , products} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    

  return (
    <>
        {loading ? (<Loader/>) : (<Fragment>

<MetaData title={"ItemKart"}/>


<div className='banner'>
    <p>Welcome to ItemKart</p>
    <h1>Find Amazing products below</h1>
    
    <a href='#container'>
        <button>
            scroll
        </button>
    </a>
</div>

<h2 className='homeHeading'>
    Featured Products
</h2>

<div className='container' id='container'>
    {
       products && products.map((product)=>(
            <Product product = {product}/>
       ))
    }
</div>
</Fragment>)}
    </>
  )
}
