import React, { useContext } from "react";
import { BiCheckboxSquare } from "react-icons/bi";
import { IoTrashBin } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";
import Header from "../Header";
import "./index.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, setOrder, clearCart } = useContext(CartContext);
  const history = useHistory();

  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cart.reduce(
    (total, item) => total + item.costINR * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const username = Cookies.get("username");

      const orderDetails = cart.map((item) => ({
        foodName: item.foodName,
        foodId: item.foodId,
        category: item.isVeg,
        costINR: item.costINR,
        quantity: item.quantity,
        quantity_cost: item.costINR * item.quantity,
        chefName: item.chefName, // Include chefName in order details
      }));

      const response = await fetch("http://localhost:3008/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          customerName: username,
          orderDetails: orderDetails,
        }),
      });

      if (response.ok) {
        setOrder(orderDetails);
        clearCart();
        history.push("/order");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h2 className="cart-heading">Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
              alt="cart"
              className="cart-img"
            />
          </div>
        ) : (
          <div className="cart-items-div">
            <ul className="cart-items-list">
              {cart.map((item) => (
                <li key={item.foodId} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.foodName}
                    className="cart-image"
                  />
                  <div className="cart-item-details">
                    <div className="details-div">
                      <div className="name-type-of-food-div">
                        <p className="cart-item-desc">{item.foodName}</p>
                        <div>
                          {item.isVeg.includes("Veg") ? (
                            <BiCheckboxSquare className="veg-food-icon" />
                          ) : (
                            <BiCheckboxSquare className="non-veg-food-icon" />
                          )}
                        </div>
                      </div>
                      <p className="cart-item-desc">
                        Quantity: {item.quantity}
                      </p>
                      <p className="cart-item-desc">
                        Cost: RS {item.costINR * item.quantity}/-
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.foodId)}
                        className="remove-btn"
                      >
                        <IoTrashBin className="remove-icon" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="cart-hr-line" />
            <div className="amount-items-div">
              <p> Total Items: {totalProducts} </p>
              <p> Total Amount: {totalAmount} </p>
            </div>
            <div>
              <Link to="/order">
                <button type="button" onClick={placeOrder} className="btn-2">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
