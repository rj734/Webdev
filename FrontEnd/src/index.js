import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './Component/home';
import OrderPizza from './Component/orderPizza';
import BuildPizza from './Component/buildPizza';

import Login from './Component/login';
import SignUp from './Component/signup';
import Cart from './Component/cart';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='order-pizza' element={<OrderPizza/>}/>
        <Route path='build-pizza' element={<BuildPizza/>}/>
        <Route path='shopping-cart' element={<Cart/>}/>
        {/* <Route path='shopping-cart' element={<ShoppingCart/>}/> */}
        <Route path='login' element={<Login/>}/>
        <Route path='login/sign-up' element={<SignUp/>}/>
      </Routes>
    </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
