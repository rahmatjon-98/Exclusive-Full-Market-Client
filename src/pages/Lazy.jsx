import { lazy } from "react";

const Layout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Account = lazy(() => import("./Account"));
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout"));
const Contact = lazy(() => import("./Contact"));
const Info = lazy(() => import("./Info"));
const Login = lazy(() => import("./Login"));
const Products = lazy(() => import("./Products"));
const Signup = lazy(() => import("./Signup"));
const Wishlist = lazy(() => import("./Wishlist"));

export {
  Layout,
  Home,
  About,
  Account,
  Cart,
  Checkout,
  Contact,
  Info,
  Login,
  Products,
  Signup,
  Wishlist,
};
