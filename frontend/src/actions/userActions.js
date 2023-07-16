import { LOGIN_FAIL , LOGIN_SUCCESS , LOGIN_REQUEST,CLEAR_ERRORS ,REGISTER_FAIL, REGISTER_REQUEST,REGISTER_SUCCESS, LOAD_SUCCESS , LOAD_REQUEST,LOAD_FAIL ,LOGOUT_SUCCESS , LOGOUT_FAIL , UPDATE_FAIL,UPDATE_REQUEST,UPDATE_SUCCESS ,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS ,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/userConstants";

import axios from "axios";

export const login = (email , password)=>async (dispatch)=>{

    try {
        dispatch({
            type:LOGIN_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post(`/api/v1/login` , 
            {email , password} , 
            config
        );

        dispatch({
            type:LOGIN_SUCCESS , 
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type:LOGIN_FAIL , 
            payload:error.response.data.message
        })
    }
};

export const register = (userdata) => async(dispatch)=>{
    

    try {
        dispatch({
            type:REGISTER_REQUEST 
        })
    
    
        const config = {headers:{"Content-Type":"multipart/form-data"}};
    
        const {data} = await axios.post(`/api/v1/createUser` , 
            userdata , 
            config
        );
    
        dispatch({
            type:REGISTER_SUCCESS , 
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL , 
            payload: error.response.data.message
        })
    }
}

//Load user

export const load = () => async(dispatch)=>{
    
    try {
        dispatch({
            type:LOAD_REQUEST
        });
        
        const {data} = await axios.get(
            `/api/v1/me`
        )
        
        dispatch({
            type:LOAD_SUCCESS ,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:LOAD_FAIL , 
            payload: error.response.data.message
        })
    }
}

export const logout = () => async(dispatch)=>{

    try {
        await axios.get(`/api/v1/logout`);
        dispatch({
            type:LOGOUT_SUCCESS
        }) 
    }
    catch (error) {
        dispatch({
            type:LOGOUT_FAIL
        })
    }
}

// update profile

export const update = (userdata) => async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_REQUEST
        });
        
        const config = {headers:{"Content-Type":"multipart/form-data"}};
    
        const {data} = await axios.put(`/api/v1/me/updateProfile` , 
            userdata , 
            config
        );
        
        dispatch({
            type:UPDATE_SUCCESS ,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_FAIL , 
            payload: error.response.data.message
        })
    }    
}

export const updatePassword = (passwords) => async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST
        });
        
        const config = {headers:{"Content-Type":"application/json"}};
    
        const {data} = await axios.put(`/api/v1/password/updatePassword` , 
            passwords , 
            config
        );
        
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS ,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL , 
            payload: error.response.data.message
        })
    }    
}


export const forgot = (email) =>async (dispatch)=>{

    try {
        dispatch({
            type:FORGOT_PASSWORD_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post(`/api/v1/password/forgot` , 
            email, 
            config
        );

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS , 
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL , 
            payload:error.response.data.message
        })
    }
};

export const resetPass = (passwords , token) =>async (dispatch)=>{

    try {
        dispatch({
            type:RESET_PASSWORD_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put(`/api/v1/password/reset/${token}` , 
            passwords, 
            config
        );

        dispatch({
            type:RESET_PASSWORD_SUCCESS , 
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL , 
            payload:error.response.data.message
        })
    }
};




    


export const clearErrors = ()=>async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}