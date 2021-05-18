import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import MainAdmin from './components/MainAdmin'
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EditProduct from './components/EditProduct';
import EditArtist from './components/EditArtist';
import ProductShowcase from './components/ProductPage';
import OrderElements from './components/MyOrders';
import ProductsDisplay from './components/Products';
import MainPageElements from './components/Main';
import Profile from './components/Profile';
import ShoppingCar from './components/ShoppingCar';
import CreateProduct from './components/CreateProduct'; 
import CreateArtist from './components/CreateArtist'; 
import CreateFormat from './components/CreateFormat'; 
import EditFormat from './components/EditFormat';
import EditGenre from './components/EditGenre';
import CreateGenre from './components/CreateGenre';

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
        <Route path='/MainAdmin'component={MainAdmin}>
          <MainAdmin/>
        </Route> 
        <Route path='/CreateProduct'component={CreateProduct}>
          <CreateProduct/>
        </Route> 
        <Route path='/CreateArtist'component={CreateArtist}>
          <CreateArtist/>
        </Route> 

        <Route path='/CreateGenre'component={CreateGenre}>
          <CreateGenre/>
        </Route> 

        <Route path='/EditGenre'component={EditGenre}>
          <EditGenre/>
        </Route> 

        <Route path='/EditFormat'component={EditFormat}>
          <EditFormat/>
        </Route> 

        <Route path='/CreateFormat'component={CreateFormat}>
          <CreateFormat/>
        </Route> 

        <Route path='/Header'component={Login}>
          <Header/>
        </Route> 
        <Route path='/EditProduct'component={EditProduct}>
          <EditProduct/>
        </Route> 

        <Route path='/EditArtist'component={EditArtist}>
          <EditArtist/>
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
