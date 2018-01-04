import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayFieldContainer from './redux/Containers/PlayFieldContainer/PlayFieldContainer';

class App extends Component {
  render() {
    return (
      <div>
        <PlayFieldContainer />
      </div>
    );
  }
}

export default App;
