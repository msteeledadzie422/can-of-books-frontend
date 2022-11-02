import { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookFormModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Title: '',
            Description: '',
            Status: '',
            ImgURL: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const book = {
            title: this.state.Title,
            description: this.state.Description,
            status: this.state.Status,
            imgURL: this.state.ImgURL
        };
        this.props.submit(book);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add a Book!!!!
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type='input' id='Title' onChange={(e) => this.setState({Title: e.target.value})}></Form.Control>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type='input' id='Description' onChange={(e) => this.setState({Description: e.target.value})}></Form.Control>
                    <Form.Label>Status:</Form.Label>
                    <Form.Control type='input' id='Status' onChange={(e) => this.setState({Status: e.target.value})}></Form.Control>
                    <Form.Label>ImageURL:(optional)</Form.Label>
                    <Form.Control type='input' id='ImgURL' onChange={(e) => this.setState({ImgURL: e.target.value})}></Form.Control>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Form>
            </Modal>
        )
    }
}

export default BookFormModal;