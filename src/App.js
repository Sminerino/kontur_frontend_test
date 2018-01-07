import React, { Component } from 'react';
import './styles/styles.css';
import PlayFieldContainer from './redux/Containers/PlayFieldContainer/PlayFieldContainer';

class App extends Component {
  render() {
    return (
      <div className='play-field-container'>
        <PlayFieldContainer
            size={9}
        />
      </div>
    );
  }
}

export default App;
