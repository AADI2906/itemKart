import { CART_ADD ,CART_REMOVE , SAVE_SHIP_INFO } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems:[] , shipInfo:{} } , action) =>{
    switch (action.type) {
        case CART_ADD:
              const item = action.payload;
        
              const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
              );
        
              if (isItemExist) {
                return {
                  ...state,
                  cartItems: state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                  ),
                };
              } else {
                return {
                  ...state,
                  cartItems: [...state.cartItems, item],
                };
              }

              case CART_REMOVE :
                return {
                  ...state ,
                  cartItems:state.cartItems.filter((i)=> i.product !== action.payload)
                }

              case SAVE_SHIP_INFO :
                return{
                  ...state , 
                  info: action.payload
                }
        
        default: 
        return state;
    }
}