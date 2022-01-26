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
import axios from 'axios';
import AddBook from './AddBook';
import BookFormModal from './BookFormModal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showNewBookForm: false,
      books: [],
      show: false
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

  renderBookForm = () => {
    this.setState({
      showNewBookForm: true,
      show: true,
    })
    console.log(this.state.showNewBookForm)
  }

  addBookHandler = async (newBook) => {
    let url = `https://localhost:3002/books`;
    let bookResult = await axios.post(url, newBook);
    console.log(bookResult);
    this.setState({
      books: [...this.state.books, bookResult.data]
    });
  };

  handleSubmitNewBook = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      status: e.target.status.value,
      description: e.target.description.value,
      email: e.target.description.value
    };
    console.log(newBook);
    this.addBookHandler(newBook);
  };

  handleShowModal = () => {
    this.setState({
      show: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      show: false,
    })
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler}>
          </Header>
          <Switch>
            <Route >
              {this.state.user ? <BestBooks/> : <Login onLogin={this.loginHandler}/>}
            <AddBook renderBookForm={this.renderBookForm}/>
            {
              this.state.showNewBookForm && <BookFormModal 
              addBookHandler={this.addBookHandler} 
              handleSubmitNewBook={this.handleSubmitNewBook}
              handleShowModal={this.handleShowModal}
              handleCloseModal={this.handleCloseModal}
              show={this.state.show}
              />
            }
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
