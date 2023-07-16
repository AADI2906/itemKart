import axios from "axios";
import { ALL_PRODUCT_SUCCESS , ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , CLEAR_ERRORS,ALL_DETAILS_REQUEST,
    ALL_DETAILS_FAIL, ALL_DETAILS_SUCCESS, REVIEW_FAIL,REVIEW_REQUEST,REVIEW_RESET,REVIEW_SUCCESS, ADMIN_PRODUCT_FAIL ,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS } from "../constants/productConstants"



export const getProductsDetails =(id)=> async(dispatch)=>{
    try {
        
        dispatch({
            type:ALL_DETAILS_REQUEST
        });

        const {data} =  await axios.get(`/api/v1/product/${id}`);
        
        dispatch({
            type:ALL_DETAILS_SUCCESS , 
            payload:data.product
        });

    } catch (error) {
        dispatch({
            type:ALL_DETAILS_FAIL , 
            payload:error.response.data.message
        })
    }
}

export const getProducts =(keyword="" , currentPage = 1 , price=[0,25000])=> async(dispatch)=>{
    try {
        
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        const {data} =  await axios.get(link);
        
        dispatch({
            type:ALL_PRODUCT_SUCCESS , 
            payload:data
        });

    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL , 
            payload:error.response.data.message
        })
    }
}


export const newReview =(reviewData)=> async(dispatch)=>{

    try {
        dispatch({ type: REVIEW_REQUEST });
    
        const config = {
          headers: { "Content-Type": "application/json" },
        };
    
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    
        dispatch({
          type: REVIEW_SUCCESS,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: REVIEW_FAIL,
          payload: error.response.data.message,
        });
      }

}

export const getAdminProducts =()=> async(dispatch)=>{
    try {
        dispatch({
            type:ADMIN_PRODUCT_REQUEST
        });

        const {data} =  await axios.get("/api/v1/admin/products");
        
        dispatch({
            type:ADMIN_PRODUCT_SUCCESS, 
            payload:data.products
        });

    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearErrors = async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS , 
    })
}
