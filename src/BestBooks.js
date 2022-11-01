import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';

let url = `https://can-of-books-enviouscodefellow.herokuapp.com/books`;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  async fetchbooks() {
    let response = await axios.get(url);
    this.setState({
      books: response.data
    })

    console.log(this.state.books);
  }
  
  addBook = (book) => {
    axios.post(url,book)
    .then(response => {
    this.setState({books: [...this.state.books,response.data]})
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  deleteBook = (bookID) => {
    axios.delete(url + `/${bookID}`)
    .then(() => {
      this.removefromState(bookID)
    }) 
  }
  
  removefromState = (bookID) => {
    const newArray = this.state.books.filter(book => {
      return !(book._id === bookID)
    })
    this.setState({books: newArray})
  }
  
  componentDidMount() {
    this.fetchbooks();
  }  

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>Good Reads &amp; Most Wanted Shelf</h2>
        <Button onClick={(e) => this.setState({showModal:true})}>
          Add Book
        </Button>
        <BookFormModal how={this.state.showModal} close={(e) => this.setState({showModal:false})} submit={this.addBook}></BookFormModal>
        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(element => 
              <Carousel.Item>
              <img src='https://place-hold.it/2000x400/black/white' alt='sample background'></img>
              <Carousel.Caption>
                <h2>{element.title}</h2>
                <img src={element.imgURL} alt={element.title} width="50" height="75"/>
                <p>{element.description}</p>
                <p>{element.status}</p>
                <p>{element._id}</p>
                <Button onClick={e => this.deleteBook(element._id)}>
                Delete Book
              </Button>
              </Carousel.Caption>
            </Carousel.Item> 
              )}
          </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
