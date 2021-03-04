import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'


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
