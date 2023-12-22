import {createContext, useContext, useReducer} from "react";

// This is data layer
export const StateContext = createContext();

//Provider
export const StateProvider = ({reducer, initialState, children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
    {children}
    </StateContext.Provider>
)

// Use
export const useStateValue = ()=> useContext(StateContext);