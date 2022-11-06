import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News4U</h1>

          <textarea>
            
          </textarea>

          <button>Search</button>

          <p>Result:</p>

          <p></p>
          
          <select>
            <option value="deletenewsviasource">Delete via source</option>
            <option value="deletenewsviaword">Delete via search word</option>
          </select>

          <textarea>
            
          </textarea>

          <button>Delete</button>
        </header>
      </div>
    );
  }
}

export default App;
