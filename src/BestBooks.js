'use Strict';
import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AddBook from './AddBook';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';
import UpdateBook from './UpdateBook';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showNewBookForm: false,
      show: false,
      showUpdateBookForm: false

    }
  }

  /* Done: Make a GET request to your API to fetch books for the logged in user  */

  getHandler = async () => {
    let bookResult = await axios.get(SERVER + '/books');
    console.log(bookResult.data);

    this.setState({
      books: bookResult.data
    });
  }


  postHandler = async (newBook) => {
    let bookResult = await axios.post(SERVER + '/books', newBook);
    console.log(bookResult);
    this.setState({
      books: [...this.state.books, bookResult.data]
    });
  }

  deleteHandler = async (id) => {
    await axios.delete(`${SERVER}/books/${id}`);
    let updatedBooks = this.state.books.filter(book => book._id !== id);
    this.setState({
      books: updatedBooks
    });
    
  };

  updateHandler = async (bookToUpdate) => {
    await axios.put(`${SERVER}/books/${bookToUpdate._id}`,bookToUpdate);
    this.getHandler();
  }

  componentDidMount() {
    this.getHandler();
  }

  handleSubmitNewBook = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      status: e.target.status.checked,
      description: e.target.description.value,
      email: e.target.email.value
    };
    this.setState({
      showNewBookForm: false
    })
    this.postHandler(newBook);
  };

  handleSubmitUpdate = (e, book) => {

    console.log('checking if it works');
    e.preventDefault();
    let updateBook = {
      title: e.target.title.value,
      status: e.target.status.checked,
      description: e.target.description.value,
      email: e.target.email.value,
      _id: this.state.bookId,
      __v: this.state.v 
    };
    this.setState({
      showUpdateBookForm: false
    })
    
    this.updateHandler(updateBook);

  }


  renderBookForm = () => {
    this.setState({
      showNewBookForm: true,
      show: true,
    })
    
  };

  renderUpdateBookForm = (bookId, v) => {
    this.setState({
      bookId: bookId,
      v: v,
      showUpdateBookForm: true,
      show: true,
      
    })
    
  }

  handleShowModal = () => {
    this.setState({
      show: true,
    })
  };

  handleCloseModal = () => {
    this.setState({
      show: false,
    })
  };

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <AddBook renderBookForm={this.renderBookForm} />
        {
          this.state.showNewBookForm &&
          <BookFormModal
            renderBookForm={this.renderBookForm}
            handleSubmit={this.handleSubmitNewBook}
            handleShowModal={this.handleShowModal}
            handleCloseModal={this.handleCloseModal}
            show={this.state.show}
            title='Add a Book'
          />
        }
        {
          this.state.showUpdateBookForm &&
          <BookFormModal
            renderBookForm={this.renderUpdateBookForm}
            handleSubmit={this.handleSubmitUpdate}
            handleShowModal={this.handleShowModal}
            handleCloseModal={this.handleCloseModal}
            show={this.state.show}
            bookId={this.state.bookId}
            title='Update a Book'
          />
        }

        {this.state.books.length > 0 ? (
          <Container>
            <Carousel>
              {this.state.books.map((book) => (

                <Carousel.Item key={book._id}>
                  <img
                    className="d-block w-100"
                    src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_813319932_383768.jpg"
                    alt="Stack of books"
                  />
                  <Carousel.Caption>
                    <p style={{ fontsize: '2em' }}>{book.title}</p>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
                    <Button variant="secondary" onClick={() => this.deleteHandler(book._id)}>Delete Book</Button>
                    <UpdateBook renderUpdateBookForm={this.renderUpdateBookForm} bookId={book._id} v={book.__v}/>
                  </Carousel.Caption>
                </Carousel.Item>

              ))}
            </Carousel>
          </Container>
        )
          :
          <h3>No Books Found :(</h3>
        }
      </>
    )
  }
}

export default BestBooks;
