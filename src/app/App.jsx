import { Route, Routes } from "react-router";
import {
  About,
  Account,
  Cart,
  Checkout,
  Contact,
  Home,
  Info,
  Layout,
  Login,
  Products,
  Signup,
  Wishlist,
} from "../pages/Lazy";
// import Layout from "../pages/Layout";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import Account from "../pages/Account";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Contact from "../pages/Contact";
// import Info from "../pages/Info";
// import Login from "../pages/Login";
// import Products from "../pages/Products";
// import Signup from "../pages/Signup";
// import Wishlist from "../pages/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="account/:id" element={<Account />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="signup" element={<Signup />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
}

export default App;
