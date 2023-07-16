import React , {useEffect , useState} from 'react'
import "./Products.css"
import Loader from '../layout/loader/Loader'
import { getProducts } from '../../actions/productActions';
import {useDispatch , useSelector} from "react-redux"
import Product from '../home/Product';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import {Slider , Typography}  from '@material-ui/core';


const Products = () => {

    const [currentPage, setcurrentPage] = useState(1);
    const [price, setprice] = useState([0 , 100000]);



    const setCurrentPageNo = (e)=>{
        setcurrentPage(e);
    }

    const priceHandler = (event , newPrice ) =>{
        setprice(newPrice);
    }

    const dispatch = useDispatch();
    const {products , loading , count , maxProducts} = useSelector((state) => state.product)

    const {keyword} = useParams();
    
    useEffect(() => {

      dispatch(getProducts(keyword , currentPage , price));
    }, [dispatch, keyword , currentPage , price] );
    
    

  return (
    <>
        {
            loading?(<Loader/>):(
                <>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {
                        products && (
                                products.map((product)=>(
                                    <Product key = {product._id} product={product}/>
                                ))
                            
                        )
                    }
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                />
                </div>
                
                
                
                


                {
                    count>maxProducts &&  <div className='paginationBox'>
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={maxProducts}
                        totalItemsCount={count}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"

                    />
                </div>
                }

               

                </>
            )
        }
    </>
  )
}

export default Products