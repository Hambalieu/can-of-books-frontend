'use Strict';
import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AddBook from './AddBook';
import BookFormModal from './BookFormModal';

// let url = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showNewBookForm: false,
      show: false

    }
  }

  /* Done: Make a GET request to your API to fetch books for the logged in user  */

  getHandler = async () => {
    let url = 'http://localhost:3002';
    let bookResult = await axios.get(url + '/books');
    console.log(bookResult.data);

    this.setState({
      books: bookResult.data
    });
  }


  postHandler = async (newBook) => {
    let url = `http://localhost:3002/books`;
    let bookResult = await axios.post(url, newBook);
    console.log(bookResult);
    this.setState({
      books: [...this.state.books, bookResult.data]
    });
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
      email: e.target.description.value
    };
    console.log(newBook);
    this.postHandler(newBook);
  };

  renderBookForm = () => {
    this.setState({
      showNewBookForm: true,
      show: true,
    })
    console.log(this.state.showNewBookForm)
  }

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
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <AddBook renderBookForm={this.renderBookForm}/>
        {
          this.state.showNewBookForm &&
        <BookFormModal
          renderBookForm={this.renderBookForm}
          handleSubmitNewBook={this.handleSubmitNewBook}
          handleShowModal={this.handleShowModal}
          handleCloseModal={this.handleCloseModal}
          show={this.state.show}
        />
        }
        {this.state.books.length > 0 ? (
          <Container>
            <Carousel>
              {this.state.books.map((book, idx) => (

                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_813319932_383768.jpg"
                    alt="Stack of books"
                  />
                  <Carousel.Caption>
                    <p style={{ fontsize: '2em' }}>{book.title}</p>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
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
