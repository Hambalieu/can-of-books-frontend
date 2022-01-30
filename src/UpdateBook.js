'use Strict';
import React from 'react';
import Button from 'react-bootstrap/Button';

class UpdateBook extends React.Component {
  render() {
    return(
      <Button variant='secondary' onClick={() => this.props.renderUpdateBookForm(this.props.bookId, this.props.v)}>Update a book!</Button>
    )
  }
}

export default UpdateBook;
