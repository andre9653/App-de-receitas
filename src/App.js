import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Provider from './context/Provider';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Provider>
      <Recipes />
    </Provider>
  );
}

export default App;
