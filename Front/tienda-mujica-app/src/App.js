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
import Dialog from './components/Dialogs/DialogCreditCard'
import PrivateRoute from './PrivateRouter';
import DialogCreditCard from './components/Dialogs/DialogCreditCard'
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

          <Route
            path="/admin"
            render={({ match: { url } }) => (
              <>
                <Switch>
                  <PrivateRoute requiredAdmin={true} path={`${url}/`} component={MainAdmin} exact />

                  <PrivateRoute requiredAdmin={true} path={`${url}/product`} component={EditProduct} />
                  <PrivateRoute requiredAdmin={true} path={`${url}/artist`} component={EditArtist} />
                  <PrivateRoute requiredAdmin={true} path={`${url}/genre`} component={EditGenre} />
                  <PrivateRoute requiredAdmin={true} path={`${url}/format`} component={EditFormat} />
                  <Redirect to="/admin" />
                </Switch>
              </>
            )}
          />
          <PrivateRoute path='/Checkout/Checkout' component={Checkout} />
          <PrivateRoute path='/product/view' component={ViewProducts} />
          <PrivateRoute path='/product/create' component={ProductCreate} />
          <PrivateRoute path='/Header' component={Login} />
          <PrivateRoute path='/ShoppingCart' component={ShoppingCart} />
          <PrivateRoute path='/Profile' component={Profile} />
          <PrivateRoute path='/ProductPage/:id' component={ProductShowcase} />
          <PrivateRoute path='/Products/:id' component={ProductsDisplay} />
          <PrivateRoute path='/Products' component={ProductsDisplay} />
          <PrivateRoute path='/MainPage' component={MainPageElements} />

          <PrivateRoute path='/MyOrders' component={OrderElements} />

          <Route exact path='/' component={Login} />

          <Route path='/Login/' component={Login} />

          <Redirect to="/" />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
