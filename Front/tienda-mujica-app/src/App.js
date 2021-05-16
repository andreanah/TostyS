import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Typography from '@material-ui/core/Typography';
import Footer from './components/BottomNav';
import ProductShowcase from './components/ProductPage'
import OrderElements from './components/MyOrders'
import ProductsDisplay from './components/Products'
import MainPageElements from './components/Main'
import Profile from './components/Profile';
import ShoppingCar from './components/ShoppingCar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { List } from '@material-ui/core';
import Checkout from './components/Checkout/Checkout';


function App() {
  return (

    <BrowserRouter>
    <div className = 'container'>
      <Switch>

        <Route path='/Checkout/Checkout'component={Checkout}>
          <Checkout/>
        </Route> 

        <Route path='/Header'component={Login}>
          <Header/>
        </Route> 

        <Route path='/ShoppingCar'component={ShoppingCar}>
          <ShoppingCar/>
        </Route> 

        < Route path='/Profile' component ={Profile}>
         <Profile/>
        </Route>

        <Route path='/MainPage'>
          <MainPageElements/>
        </Route> 

        <Route path='/ProductPage'>
          <ProductShowcase/>
        </Route>

        <Route path='/Products'>
          <ProductsDisplay/>
        </Route>

        <Route path='/MyOrders'>
          <OrderElements/>
        </Route>

        <Route path='/'>
          <Login/>
        </Route>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
