import { useState } from 'react';
import NavBar  from './components/NavBar';
import Profile  from './components/Profile';
import Friends  from './components/Friends';
import Log  from './components/Log';
import Cals from './components/Cals';
import './app.css';

function App() {
  // Redirect user to auth page if not signed in
  // { auth }
  // If the user is signed in, display the home page

  return (
    <>
      <nav><NavBar /></nav>
      <div className='profileHome'><Profile /></div>
      <div className='friendsHome'><Friends /></div>
      <div className='logHome'><Log /></div>
      <div className='calsHome'><Cals /></div>
    </>
  );
}

export default App;