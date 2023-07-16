import { LOGIN_FAIL , LOGIN_SUCCESS , LOGIN_REQUEST,CLEAR_ERRORS , REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_REQUEST,LOAD_REQUEST ,LOAD_SUCCESS ,LOAD_FAIL,LOGOUT_SUCCESS , LOGOUT_FAIL , UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAIL , UPDATE_RESET , UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_REQUEST , UPDATE_PASSWORD_RESET , UPDATE_PASSWORD_SUCCESS , FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL , RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS ,RESET_PASSWORD_FAIL} from "../constants/userConstants";

export const userReducer = (state = {user:{}} ,action)=> {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_REQUEST:
            return{
                loading : true , 
                isAuth:false
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_SUCCESS:
            return{
                ...state,
                loading:false , 
                isAuth:true,
                user:action.payload
            };

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false , 
                isAuth:false , 
                user:null, 
                error:action.payload
            }

        case LOAD_FAIL:
            return{
                loading:false , 
                isAuth:false , 
                user:null, 
                error:action.payload
            }

            case CLEAR_ERRORS:{
                return{
                    ...state , 
                    error:null
                }                  
            };

            case LOGOUT_SUCCESS:
                return{
                    user:null , 
                    isAuth:false , 
                    loading:false
                }

            case LOGOUT_FAIL:
                return{
                    ...state , 
                    loading:false , 
                    error:action.payload
                }
            
            
    
        default:
            
        return state;
            
    }
}

export const ProfileReducer = (state = {} ,action)=> {
    switch (action.type) {
        case UPDATE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        
            return{
                ...state,
                loading : true ,
            };

        case UPDATE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        
            return{
                ...state,
                loading:false , 
                isUpdated:action.payload
            };

        case UPDATE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        
            return{
                ...state,
                loading:false , 
                error:action.payload
            }
 
            case UPDATE_RESET:
            case UPDATE_PASSWORD_RESET:
                return {
                    ...state , 
                    isUpdated:false,
                }
    
        default:
            
                return state;
            
    }
}

export const forgotReducer = (state = {} ,action)=> {

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading : true ,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
        
            return{
                ...state,
                loading:false , 
                message:action.payload
            }

        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false , 
                success:action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
                loading:false , 
                error:action.payload
            }

            
        
        default:
            return state;
        
    }

}