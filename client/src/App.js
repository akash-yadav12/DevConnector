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

import PrivateRoute from './components/common/PrivateRoute'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

import { clearCurrentProfile } from './actions/profileActions';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';



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
    store.dispatch(clearCurrentProfile);

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
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:handle" component={Profile}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts}/>
              </Switch>
              <Route exact path="/not-found" component={NotFound}/>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post}/>
              </Switch>
            </div>
            <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
