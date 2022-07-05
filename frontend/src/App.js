import Login from './components/Login'
import Register from './components/Register';
import Main from './components/Main';
import Profile from './components/Profile';
import Followings from './components/Followings';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react'
import React from 'react';
import icon from './favicon.png';


function App() {

  useEffect(() => {
      const favicon = document.getElementById('favicon');
      favicon.setAttribute('href', icon);
  }, []);

  const [showComponent, setShowComponent] = useState('');
  const [username, setUsername] = useState('');
  const [logUsername, setLogUsername] = useState('');
  let component = <Login setLogUsername={setLogUsername} setShowComponent={setShowComponent} setUsername={setUsername} />;

  if(showComponent){
    if (showComponent === 'Main'){
      component = <Main logUsername={logUsername} setShowComponent={setShowComponent} setUsername={setUsername} />;
    } else if (showComponent === 'Followings') {
      component = <Followings logUsername={logUsername}  setShowComponent={setShowComponent} setUsername={setUsername} />;
    } else if (showComponent === 'Profile') {
      component = <Profile logUsername={logUsername} username={username} />;
    } else if (showComponent === 'Register') {
      component = <Register setLogUsername={setLogUsername} setShowComponent={setShowComponent} setUsername={setUsername} />;
    } else if (showComponent === 'Login'){
      component = <Login setLogUsername={setLogUsername} setShowComponent={setShowComponent} setUsername={setUsername} />; 
    }
  }

  return (
    <>
      <div className="App">
        <Navbar username={logUsername} setUsername={setUsername} setShowComponent={setShowComponent} />
        {component}
      </div>
    </>
);
}

export default App;