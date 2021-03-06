import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { logoutUser, setCurrentUser } from './actions/authActions'
import { Provider } from 'react-redux';
import store from './store'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'


// check for token
if(localStorage.jwtToken){
  // set Auth token header auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() /1000 
  if(decoded.exp < currentTime){
    //  Logout user
    store.dispatch(logoutUser);
    // Todo: Clear current profile
    // Redirect to login
    window.location.href = '/login'
  }
}

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div class="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </div>
            <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
