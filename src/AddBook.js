'use strict';
import React from 'react';

class AddBook extends React.Component {
  render() {
    return(
      <button onClick={this.props.renderBookForm}>Add a book!</button>
    )
  }
}

export default AddBook;
