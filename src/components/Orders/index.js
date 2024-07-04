import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiCheckboxSquare } from "react-icons/bi";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";
import Header from "../Header";

import "./index.css";

const Order = () => {
  const { order } = useContext(CartContext);
  const [orderStatus, setOrderStatus] = useState("Order received");
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const username = Cookies.get("username");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining > 10 * 60) {
      setOrderStatus("Order Received");
    } else if (timeRemaining > 5 * 60) {
      setOrderStatus("Food Being Prepared");
    } else if (timeRemaining > 0) {
      setOrderStatus("Order Being Delivered");
    } else {
      setOrderStatus("Order Delivered");
    }
  }, [timeRemaining]);

  const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = order.reduce(
    (acc, item) => acc + item.costINR * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <h1 className="orders-heading"> Orders </h1>
      <div className="order-container">
        {order.length === 0 ? (
          <div className="empty-oredr-container">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/008/558/633/small_2x/order-now-button-order-now-text-web-banner-template-sign-icon-banner-vector.jpg"
              alt="order"
              className="order-img"
            />
            <p className="empty-order-desc">
              {" "}
              You haven't placed any order yet! order now!
            </p>
          </div>
        ) : (
          <div className="order-details-container">
            <h2 className="orders-sec-heading">
              Thank you for ordering from Food Munch!
            </h2>
            <p className="order-desc">
              Your order is placed. Here are the details:
            </p>
            <ul className="order-items-list">
              {order.map((item) => (
                <li key={item.foodId} className="order-item">
                  <img
                    src={item.imageUrl}
                    alt={item.foodName}
                    className="order-image"
                  />
                  <div className="order-item-details">
                    <div className="name-type-of-food-div">
                      <p className="order-item-desc">{item.foodName}</p>
                      {item.isVeg.includes("Veg") ? (
                        <BiCheckboxSquare className="veg-food-icon" />
                      ) : (
                        <BiCheckboxSquare className="non-veg-food-icon" />
                      )}
                    </div>
                    <p className="order-item-desc">Quantity: {item.quantity}</p>
                    <p className="order-item-desc">
                      Cost: RS {Number(item.costINR) * Number(item.quantity)}/-
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="cart-hr-line" />
            <div className="order-status">
              <h3 className="order-staus-head">Order Status:</h3>
              <p className="order-staus-desc">{orderStatus}</p>
              <p className="order-placed-name">
                {" "}
                Order Placed by:{" "}
                <span className="name-of-customer"> {username} </span>{" "}
              </p>
              <div className="time-cont">
                <p className="time">
                  Food will be delivered in: {Math.floor(timeRemaining / 60)}:
                  {timeRemaining % 60 < 10
                    ? `0${timeRemaining % 60}`
                    : timeRemaining % 60}
                </p>
              </div>
            </div>
            <div className="order-summary">
              <h3>Order Summary:</h3>
              <div className="order-summ">
                <p className="desc">Total Items: {totalItems}</p>
                <p className="desc">Total Amount: ₹{totalAmount}/-</p>
              </div>
            </div>
            <Link to="/">
              <button type="button" className="btn-3 btn-2">
                Continue Browsing
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
