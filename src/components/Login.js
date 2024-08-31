import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; 

function Login({ User , isLogin, setIsLogin, onSignup,onLogout, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
       
       onLogin(username,password); 
       
    } else {
      toast.error('Please enter username and password');
    }
  };

  const handleSignup = () => {
    if (username && password && rePassword) {
      if (password === rePassword) {
         onSignup(username, password);
         setIsSignup(false);
      } else {
        toast.error('Passwords do not match');
      }
    } else {
      toast.error('Please fill all the fields');
    }
  };

  const handleLogout = () => {
    onLogout() ;
    setUsername('');
    setPassword('');
    setRePassword('');
    toast.info('Logged out successfully');
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <h1>Know Weather</h1>
        </div>
        <div className="navbar-right">
          {!isLogin ? (
            <div className="login-section">
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isSignup && (
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                )}
              </div>
              <div className="inn">
                {isSignup ? (
                  <button onClick={handleSignup}>Sign Up</button>
                ) : (
                  <button onClick={handleLogin}>Login</button>
                )}
                <p onClick={() => setIsSignup(!isSignup)}>
                  {isSignup
                    ? 'Already have an account? Login'
                    : 'Don’t have an account? Sign Up'}
                </p>
              </div>
            </div>
          ) : (
            <div className="logout-section">
              <span>Welcome, {User}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
}

export default Login;