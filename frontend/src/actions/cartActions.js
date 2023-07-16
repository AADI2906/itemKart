import { CART_ADD , CART_REMOVE ,SAVE_SHIP_INFO } from "../constants/cartConstants";
import axios from "axios";

//Add to cart

export const addToCart = (id , quantity) =>async (dispatch , getState)=>{
       
        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:CART_ADD , 
            payload:{
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
        })

         localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems))
}

//Remove from cart...

export const removeFromCart = (id) =>async (dispatch , getState)=>{

    dispatch({
        type: CART_REMOVE , 
        payload:id
    })

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) =>async (dispatch , getState)=>{

    dispatch({
        type: SAVE_SHIP_INFO , 
        payload: data
    })

    localStorage.setItem("shippingInfo" , JSON.stringify(data));
}
