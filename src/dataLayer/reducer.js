export const initialState = {
    basket:[],
    user:null,
    roleUser : null,
    userName : "Guest",
    initialized: false,
};

export const getBasketTotal = (basket) =>
basket?.reduce((amount,item)=> parseInt(item.price)+parseInt(amount),0);

function reducer(state, action){
    console.log(action)
    switch(action.type){
        case "INITIALIZED":
            return {
                ...state,
                initialized: true,
            }
        case "SET_ROLE":
            return {
                ...state,
                roleUser : action.roleUser,
            }
        case "SET_NAME":
            return {
                ...state,
                userName : action.userName,
            }
        case "SET_USER":
            return {
                ...state,
                user : action.user,
            }
        case "ADD_TO_BASKET":
            //Logic to add
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case "REMOVE_FROM_BASKET":
            //Logic to remove
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((BasketItem) => BasketItem.id === action.id);
            if(index >= 0){
                newBasket.splice(index,1);
            }
            return {...state, basket:newBasket};
        default:
            return state;
    }
}

export default reducer