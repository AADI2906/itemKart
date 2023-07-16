import { ALL_PRODUCT_SUCCESS , ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , CLEAR_ERRORS,ALL_DETAILS_REQUEST,
    ALL_DETAILS_FAIL, ALL_DETAILS_SUCCESS , REVIEW_FAIL , REVIEW_REQUEST,REVIEW_RESET,REVIEW_SUCCESS,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_SUCCESS } from "../constants/productConstants"

export const productReducer = (state = {products:[]} ,action)=> {
    switch (action.type) {
        case ALL_PRODUCT_SUCCESS:
        case ADMIN_PRODUCT_SUCCESS:
            {
            return {
                loading : false ,
                products:action.payload.products,
                count:action.payload.count,
                maxProducts:action.payload.maxProducts
            }
        }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            {
            return {
                loading : false ,
                error:action.payload
            }
        }
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            {
            return {
                loading : true ,
                products:[]
            }
        }
        
        case CLEAR_ERRORS:{
            return{
                ...state , 
                error:null
            }                  
        };
            
    
        default:
        {
            return state;
        }
    }
}
export const productDetailsReducer = (state = {product:{}} ,action)=> {
    switch (action.type) {
        case ALL_DETAILS_REQUEST:{
            return {
                loading : true ,
                ...state
            }
        }
        case ALL_DETAILS_SUCCESS:{
            return {
                loading : false ,
                product:action.payload
            }
        }
        case ALL_DETAILS_FAIL:{
            return {
                loading : false ,
                error:action.payload
            }
        }
        
        case CLEAR_ERRORS:{
            return{
                ...state , 
                error:null
            }                  
        };

        default:
        {
            return state;
        }
    }
}

export const newReviewReducer = (state = {} ,action)=> {
    switch (action.type) {
        case REVIEW_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case REVIEW_SUCCESS:
          return {
            loading: false,
            success: action.payload,
          };
        case REVIEW_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        case REVIEW_RESET:
          return {
            ...state,
            success: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}


