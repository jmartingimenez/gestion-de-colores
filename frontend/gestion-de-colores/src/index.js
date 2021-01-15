import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import AuthContext from './auth-context.js'
import reportWebVitals from './reportWebVitals';

const AppWrapper = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('userKey')) {
      setLoggedIn(JSON.parse(localStorage.getItem('userKey')));
    }
  }, []);
  
  useEffect(() => {
      localStorage.setItem('userKey', loggedIn);
  }, [loggedIn]);

  return(
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      <App />
    </AuthContext.Provider>
  ); 
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
