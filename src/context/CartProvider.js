import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialState = {
  cart: [],
  order: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item.foodId === action.payload.foodId
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (item) => item.foodId !== action.payload.foodId
      );
      return { ...state, cart: updatedCart };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_ORDER":
      return {
        ...state,
        order: state.cart.map((item) => ({
          ...item,
          chefName: item.chefName,
        })),
        cart: [],
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (
    foodId,
    foodName,
    costINR,
    imageUrl,
    quantity,
    isVeg,
    category,
    chefName // Added chefName as a parameter
  ) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        foodId,
        foodName,
        costINR: Number(costINR),
        imageUrl,
        quantity: Number(quantity),
        isVeg,
        category,
        chefName, // Include chefName in payload
      },
    });
  };

  const removeFromCart = (foodId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { foodId },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setOrder = () => {
    dispatch({ type: "SET_ORDER" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        setOrder,
        order: state.order,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
