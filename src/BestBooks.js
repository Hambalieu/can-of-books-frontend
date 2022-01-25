import axios from 'axios';
import React from 'react';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* Done: Make a GET request to your API to fetch books for the logged in user  */

  getBooksInfo = async () => {
    let books = await axios.get('http://localhost:3001/books')

    this.setState({
      books: books.data
    })
  }

  componentDidMount() {
    this.getBooksInfo();
  }

  render() {

    /* TODO: render user's books in a Carousel */
    let booksToShow = this.state.books.map((book, idx) =>(
      <p key={idx}>{book.title} is {book.status}</p>
    ))


    
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
