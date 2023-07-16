import './App.css';
import { Header } from './components/layout/header/Header';
import { BrowserRouter as Router,Route, Link ,Routes, BrowserRouter } from 'react-router-dom';
import webFont from "webfontloader"
import { useEffect , useState } from 'react';
import { Footer } from './components/layout/footer/Footer';
import { Home } from './components/home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import Login from './components/user/Login';
import UserOptions from './components/layout/header/UserOptions';
import { useDispatch, useSelector } from "react-redux";
import Profile from './components/user/Profile';
import { load } from './actions/userActions';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePass from './components/user/UpdatePass';
import Forgot from './components/user/Forgot';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import OrderConfirm from './components/cart/OrderConfirm';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import MyOrders from './components/cart/MyOrders';
import DashBoard from './admin/DashBoard';
import ProductList from './admin/ProductList';
import About from './components/layout/About/About';
import Contact from './components/layout/contact/Contact';

function App() {

  const [stripe, setStripe] = useState("");

  const stripeKey=async()=>{
    const {data} = await axios.get("/api/v1/stripeKey");

    setStripe(data.stripe_key)
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
      webFont.load({
        google:{
          families:["Roboto" , "Droid sans" , "chilanka"],
        },
      });

      stripeKey();

      dispatch(load());
  }, [])

  const {user , isAuth} = useSelector((state) => state.user);
  return(
  <>
  
    <Router>
      
    <Header/>

    {isAuth && < UserOptions user = {user}/>}
    
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route exact path="/products/:keyword" element={<Products />}></Route>
        <Route exact path="/Search" element={<Search />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        {isAuth && <Route exact path="/account" element={<Profile/>}></Route>}
        {isAuth && <Route exact path="/me/update" element={<UpdateProfile/>}></Route>}
        {isAuth && <Route exact path="/password/updatePassword" element={<UpdatePass/>}></Route>}
        {isAuth && <Route exact path="/Cart" element={<Cart/>}></Route>}
        {isAuth && <Route exact path="/shipping" element={<Shipping/>}></Route>}
        {isAuth && <Route exact path="/order/confirm" element={<OrderConfirm/>}></Route>}
        {isAuth && <Route exact path="/success" element={<OrderSuccess/>}></Route>}
        {isAuth && <Route exact path="/orders" element={<MyOrders/>}></Route>}
        {isAuth && <Route exact path="/admin/dashboard" element={<DashBoard/>}></Route>}
        {isAuth && <Route exact path="/admin/products" element={<ProductList/>}></Route>}
        
        
        <Route exact path="/password/forgot" element={<Forgot/>}></Route>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}></Route>
        
      </Routes>
      <Elements stripe={loadStripe(stripe)}>
          <Routes>
          {isAuth && <Route exact path="/process/payment" element={<Payment/>}></Route>}
          </Routes>
        </Elements>
      <Footer/>
    </Router>
    </>
  )
    
  
}

export default App;
