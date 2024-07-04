import React, { Component } from "react";
import { BiCheckboxSquare } from "react-icons/bi";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

import CartContext from "../../context/CartContext";

import "./index.css";

class MenuItemCard extends Component {
  static contextType = CartContext;

  state = {
    productQuantity: 0,
  };

  onDecreaseQuantity = () => {
    const { productQuantity } = this.state;
    if (productQuantity > 0) {
      this.setState((prevState) => ({
        productQuantity: prevState.productQuantity - 1,
      }));
    }
  };

  onIncreaseQuantity = () => {
    this.setState((prevState) => ({
      productQuantity: prevState.productQuantity + 1,
    }));
  };

  handleAddToCart = () => {
    const { itemDetails } = this.props;
    const { foodId, foodName, costINR, imageUrl, isVeg, category, chefName } =
      itemDetails; // Ensure chefName is retrieved from itemDetails
    const { productQuantity } = this.state;
    const { addToCart } = this.context;

    addToCart(
      foodId,
      foodName,
      costINR,
      imageUrl,
      productQuantity,
      isVeg,
      category,
      chefName // Pass chefName to addToCart
    );
    this.setState({ productQuantity: 0 }); // Reset quantity after adding to cart
  };

  render() {
    const { productQuantity } = this.state;
    const { itemDetails } = this.props;
    const { foodName, isVeg, costINR, imageUrl } = itemDetails;

    const isVegetarian = isVeg.includes("Veg");
    return (
      <li className="menu-card-item">
        <img src={imageUrl} alt={foodName} className="food-image" />
        <div className="food-item-details">
          <p className="food-name"> {foodName} </p>
          <BiCheckboxSquare
            className={`food-icon ${
              isVegetarian ? "veg-icon" : "non-veg-icon"
            }`}
          />
        </div>
        <div className="food-cost-and-quantity-div">
          <p className="food-cost"> RS {costINR}/- </p>
          <div className="buttons-container">
            <button
              type="button"
              onClick={this.onDecreaseQuantity}
              className="quantity-btn"
              data-testid="minus"
            >
              {" "}
              <BsDashSquare className="icon" />{" "}
            </button>
            <p className="quantity"> {productQuantity} </p>
            <button
              type="button"
              onClick={this.onIncreaseQuantity}
              className="quantity-btn"
              data-testid="plus"
            >
              {" "}
              <BsPlusSquare className="icon" />{" "}
            </button>
          </div>
        </div>
        <Link to="/cart">
          <button
            type="button"
            className="add-btn"
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </button>
        </Link>
      </li>
    );
  }
}

export default MenuItemCard;
