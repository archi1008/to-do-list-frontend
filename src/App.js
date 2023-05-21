import React from 'react';
import './App.css';
import Home from './home';
import {Navbar, Table, Container, Row, Col, Button, ButtonGroup, Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <div className='App'>
        <ToastContainer/>
      <Home/>
      </div>
    </React.Fragment>
  );
}

export default App;
