import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import Grid from './components/Grid';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { List } from '@material-ui/core';
import MediaCard from './components/List';


function App() {
  return (
    <BrowserRouter>
    <div className = 'container'>
      <Switch>
        <Router path='/Header'component={Login}>
          <Header/>
        </Router> 
        <Router path='/List'>
          <MediaCard/>
        </Router> 
        <Router path='/'>
          <Login/>
        </Router>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
