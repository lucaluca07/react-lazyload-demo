import React, { Component } from 'react';
import List from './component/List'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>LazyloadDemo</h2>  
        <List/>
      </div>
    );
  }
}

export default App;
