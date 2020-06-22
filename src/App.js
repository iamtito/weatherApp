import React from 'react';
import logo from './logo.svg';
import Forecast from "./components/Forecast/Forecast";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>
        Made with ♥️ by Tito
      </footer>
    </div>
  );
}

export default App;
