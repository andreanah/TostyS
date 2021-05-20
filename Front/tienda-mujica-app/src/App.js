import React from 'react';
import { Redirect } from 'react-router'
import ReactDOM from 'react-dom';
import './index.css';
import MainAdmin from './components/MainAdmin'
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp';
import Login from './components/Login';

import EditProduct from './components/EditProduct';
import EditArtist from './components/EditArtist';
import EditFormat from './components/EditFormat';
import EditGenre from './components/EditGenre';
import CreateProduct from './components/CreateProduct';
import CreateArtist from './components/CreateArtist';
import CreateFormat from './components/CreateFormat';
import CreateGenre from './components/CreateGenre';
import ProductShowcase from './components/ProductPage';
import OrderElements from './components/MyOrders';
import ProductsDisplay from './components/Products';
import MainPageElements from './components/Main';
import Profile from './components/Profile';
import ProductCreate from './components/product/Create';
import ShoppingCart from './components/ShoppingCart';
import ViewProducts from './components/ViewProducts';
import Typography from '@material-ui/core/Typography';
import Footer from './components/BottomNav';


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

    <div className='container'>
      <BrowserRouter>
        <Switch>

          <Route path='/Checkout/Checkout' component={Checkout} />

          <Route
            path="/admin"
            render={({ match: { url } }) => (
              <>
                <Switch>
                  <Route path={`${url}/`} component={MainAdmin} exact />

                  <Route path={`${url}/product`} component={EditProduct} />
                  <Route path={`${url}/artist`} component={EditArtist} />
                  <Route path={`${url}/genre`} component={EditGenre} />
                  <Route path={`${url}/format`} component={EditFormat} />
                  <Redirect to="/admin" />
                </Switch>
              </>
            )}
          />

          <Route path='/product/view' component={ViewProducts} />

          <Route path='/product/create' component={ProductCreate} />

          <Route path='/Header' component={Login} />

          <Route path='/ShoppingCart' component={ShoppingCart} />

          <Route path='/Profile' component={Profile} />

          <Route path='/MainPage' component={MainPageElements} />

          <Route path='/ProductPage' component={ProductShowcase} />

          <Route path='/Products/:id' component={ProductsDisplay} />

          <Route path='/Products' component={ProductsDisplay} />

          <Route path='/MyOrders' component={OrderElements} />

          <Route path='/' component={Login} />

          <Route path='/Login/' component={Login} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
