'use strict';
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {
  render() {

    return (
      <>
        <Button variant="primary" onClick={this.props.handleShowModal}>
          Launch demo modal
        </Button>
        <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.handleSubmitNewBook}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter a brief description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="read" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {/* <img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'/> */}
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default BookFormModal;
