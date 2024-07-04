import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import FooterComp from "../FooterComp";
import Header from "../Header";

import "./index.css";
const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-inner-container">
        <h1 className="home-heading">
          {" "}
          Food Munch: Savor Every Bite, Anytime, Anywhere{" "}
        </h1>
        <p className="home-desc">
          {" "}
          Welcome to Food Munch, your ultimate food companion! Whether you're
          craving a quick snack or planning a gourmet meal, Food Munch has got
          you covered. Discover a wide variety of delicious recipes, find local
          restaurants, and get personalized meal recommendations.{" "}
        </p>
        <Link to="/menu">
          <button type="button" className="home-btn">
            {" "}
            Browse Menu{" "}
          </button>
        </Link>
      </div>
    </div>
    <div className="chefs-container">
      <h1 className="chef-section-heading">
        Food Munch: Your Meal, Your Chef, Your Choice
      </h1>
      <div className="chef-selection-div">
        <div className="chef-inner-div">
          <Link to="/menu" className="link-element">
            <button type="button" className="btn">
              <img
                src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg?t=st=1719843041~exp=1719846641~hmac=ea8d8d70474a1e905ae3b2ee7bb8b1c1a786a87aaa69a2a674a9de69a9b52efa&w=900"
                alt="chef-1"
                className="chef-image"
              />
            </button>
          </Link>
          <p className="chef-name"> Sanjeev Kapoor </p>
          <div className="rating-container">
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
          </div>
          <Link to="/menu">
            <button className="btn-2"> Browse Menu </button>
          </Link>
        </div>
        <div className="chef-inner-div">
          <Link to="/menu">
            <button type="button" className="btn">
              <img
                src="https://img.freepik.com/free-photo/young-beautiful-woman-wearing-professional-cook-uniform-hat-cheerful-with-smile-face-pointing-with-hand-finger-up-side-with-happy-natural-expression-face_839833-7969.jpg?t=st=1719843067~exp=1719846667~hmac=743ea2245589373fa61637957d60ae978e48696aaf09372dc52e082f5bfaff17&w=996"
                alt="chef-2"
                className="chef-image"
              />
            </button>
          </Link>
          <p className="chef-name"> Ritu Dalmia </p>
          <div className="rating-container">
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
          </div>
          <Link to="/menu">
            <button className="btn-2"> Browse Menu </button>
          </Link>
        </div>
        <div className="chef-inner-div">
          <Link>
            <button type="button" className="btn">
              <img
                src="https://img.freepik.com/free-photo/happy-young-cook-uniform-showing-thumbs-up_171337-5330.jpg?t=st=1719842758~exp=1719846358~hmac=dc381a4cfe271d53e30225e52ff15dac9fa0bd2882028ae9f959da65fa235c54&w=996"
                alt="chef-3"
                className="chef-image"
              />
            </button>
          </Link>
          <p className="chef-name"> Vikas Khanna </p>
          <div className="rating-container">
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
            <FaStar className="rating-star" />
          </div>
          <Link to="/menu">
            <button className="btn-2"> Browse Menu </button>
          </Link>
        </div>
      </div>
    </div>
    <FooterComp />
  </>
);

export default Home;
