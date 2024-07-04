import { Route, Switch } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import SignUp from "./components/Signup";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/menu" component={Menu} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/order" component={Orders} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default App;
