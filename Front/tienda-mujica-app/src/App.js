import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import Grid from './components/Grid';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Typography from '@material-ui/core/Typography';
import MediaCard from './components/List';
import MediaControlCard from './components/SongDisplay';
import FloatingActionButtonZoom from './components/BottomNav';
import ComplexGrid from './components/ProductPage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { List } from '@material-ui/core';



function App() {
  return (

    <BrowserRouter>
    <div className = 'container'>
      <Switch>
        <Router path='/Header'component={Login}>
          <Header/>
        </Router> 
        <Router path='/MainPage'>
          <Header/>
           <img alt="HeaderImage" src="./HEADER.png" width='100%'/>
           <img alt="Image" src="./title.png" width='100%'/>
          <MediaCard/>
          <img alt="Image2" src="./title2.png" width='100%'/>
          <MediaControlCard/>
          <img alt="HotSale" src="./HOTSALE.png" width='100%'/>
          <MediaCard/>
          <FloatingActionButtonZoom/>
        </Router> 
        <Router path='/ProductPage'>
          <Header/>
          <ComplexGrid/>
          <img alt="SummerSale" src="./recommended.png" width='100%' height='50%'/>
          <MediaCard/>
          <FloatingActionButtonZoom/>
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
