// import { useState } from 'react'
import './App.css'
// import { BrowserRouter as Router, Route, Routes , Link} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Data from './pages/Data';
import Navigation from './Navigation';

import Login from './Components/Login';
import React, { useRef, useEffect, useState, useNavigate } from 'react';

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {
  Link, 
  Route,
  Routes
  } from 'react-router-dom'
import Account from './pages/Account';
import Signup from './Components/Signup';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlcDE5MTAiLCJhIjoiY2xsaHdtbTg0MW96cDNocXl2MGlvdGk2YyJ9.MZG4us3A5pvPrQs9ifAW-g';



function App() {

  // const data = [12, 5, 6, 6, 9, 10];




  return (
    // <div className="App">
    // ...
    // <div className="menu">
    //     ...


    // </div>
   <div className='container'>


  
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/data" element={<Data/>} />
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div> 

  
  )
}

export default App
