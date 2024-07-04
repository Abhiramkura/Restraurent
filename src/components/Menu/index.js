import { Component } from "react";
import Loader from "react-loader-spinner";

import Header from "../Header";
import FooterComp from "../FooterComp";
import MenuItemCard from "../MenuItemCard";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Menu extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    menuItems: [],
    originalMenuItems: [],
    sortOption: "",
  };

  componentDidMount() {
    this.getMenu();
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  getMenu = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const apiUrl = "http://localhost:3008/food";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const updatedData = data.map((eachFood) => ({
        foodId: eachFood.food_id,
        foodName: eachFood.food_name,
        category: eachFood.category,
        isVeg: eachFood.is_veg,
        costINR: eachFood.cost_INR,
        chefId: eachFood.chef_id,
        chefName: eachFood.chef_name,
        imageUrl: eachFood.image_url,
      }));

      const shuffledData = this.shuffleArray(updatedData);

      this.setState({
        menuItems: shuffledData,
        originalMenuItems: shuffledData,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      console.error("Error fetching food data:", error);
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value }, this.sortMenuItems);
  };

  sortMenuItems = () => {
    const { originalMenuItems, sortOption } = this.state;
    let sortedMenuItems = [];

    if (sortOption === "Sanjeev Kapoor") {
      sortedMenuItems = originalMenuItems.filter(
        (item) => item.chefName === "Sanjeev Kapoor"
      );
    } else if (sortOption === "Ritu Dalmia") {
      sortedMenuItems = originalMenuItems.filter(
        (item) => item.chefName === "Ritu Dalmia"
      );
    } else if (sortOption === "Vikas Khanna") {
      sortedMenuItems = originalMenuItems.filter(
        (item) => item.chefName === "Vikas Khanna"
      );
    } else {
      sortedMenuItems = originalMenuItems;
    }

    this.setState({ menuItems: sortedMenuItems });
  };

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#a58d00" height={50} width={50} />
    </div>
  );

  renderMenu = () => {
    const { menuItems } = this.state;

    return (
      <ul className="menu-items-list">
        {menuItems.map((eachItem) => (
          <MenuItemCard key={eachItem.foodId} itemDetails={eachItem} />
        ))}
      </ul>
    );
  };

  renderProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMenu();
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.failure:
        return <p className="error-message">Failed to fetch menu items.</p>;
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="menu-container">
          <h1 className="menu-heading"> Feast Book </h1>
          <div className="sort-container">
            <label htmlFor="sort" className="sort-label">
              Who's Cooking Tonight? Choose Your Favorite Chef:
            </label>
            <select
              id="sort"
              className="sort-select"
              onChange={this.handleSortChange}
            >
              <option value="">Select</option>
              <option value="Sanjeev Kapoor">Sanjeev Kapoor</option>
              <option value="Ritu Dalmia">Ritu Dalmia</option>
              <option value="Vikas Khanna">Vikas Khanna</option>
            </select>
          </div>
          {this.renderProducts()}
        </div>
        <hr className="hr-line" />
        <FooterComp />
      </>
    );
  }
}

export default Menu;
