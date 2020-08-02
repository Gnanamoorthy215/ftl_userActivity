import React from 'react';
import logo from './logo.svg';
import './App.css';

import UsersCard from './components/UsersCard.component';


function App() {
  return (
    <div className="App">
        <div>User Session Management</div>
        <div>
          <UsersCard></UsersCard>
        </div>
    </div>
  );
}

export default App;
