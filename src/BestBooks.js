import axios from 'axios';
import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem'

let url = 'http://localhost:3001';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* Done: Make a GET request to your API to fetch books for the logged in user  */

  getBooksInfo = async () => {
    let bookResult = await axios.get(url + '/books');
    console.log(bookResult.data);

    this.setState({
      books: bookResult.data
    });
  }

  componentDidMount() {
    this.getBooksInfo();
  }

  render() {
    console.log(this.state);
    /* TODO: render user's books in a Carousel */
    let booksToShow = this.state.books.map((book, idx) => (
      <CarouselItem
        key={idx}>
        <h2>{book.title}</h2>
        <p>{book.status}</p>
      </CarouselItem>
    ))



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? 
        <>
          { booksToShow }
        </>
          : 
            <h3>No Books Found :(</h3>
          }
      </>
    )
  }
}

export default BestBooks;
