import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';
import Profile from './Profile';
import Login from './Login';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route >
              {this.state.user ? <BestBooks/> :<Login onLogin={this.LoginHandler}/>}
            </Route>
            <Route exact path="/profile" >
              <Profile user={this.state.user}  />
            </Route>
            
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
