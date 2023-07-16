import {createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk" ;
import {composeWithDevTools} from "redux-devtools-extension";
import { newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer , ProfileReducer, forgotReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducers";
import { myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

const middleWare = [thunk] ;
const initialState = {



    cart:{
        cartItems: localStorage.getItem("cartItems") ? 
        JSON.parse(localStorage.getItem("cartItems")) : [] , 
        shipInfo: localStorage.getItem("shippingInfo") ?
        JSON.parse(localStorage.getItem("shippingInfo")) : {} , 
    }

};

const reducer = combineReducers({
    product : productReducer , 
    details: productDetailsReducer,
    user:userReducer ,
    updateProfile : ProfileReducer,
    forgotPassword:forgotReducer,
    cart:cartReducer,
    order:newOrderReducer,
    myOrders: myOrdersReducer,
    newReviews:newReviewReducer
})

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleWare)));

export default store;