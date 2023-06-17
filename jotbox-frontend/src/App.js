import React, { Component } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MainComponent from './Components/MainComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainComponent />
      </div>
    );
  }
}

export default App;
