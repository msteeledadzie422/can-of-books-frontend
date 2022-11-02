import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import bgImage from './books_bg.jpeg';
import Form from 'react-bootstrap/Form'

let url = `https://can-of-books-enviouscodefellow.herokuapp.com/books`;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      carouselIndex: 0
    }
  }

async fetchbooks() {
  let response = await axios.get(url);
  this.setState({
    books: response.data
  })
}

addBook = (book) => {
  axios.post(url,book)
  .then(response => {
  const lastIndex = this.state.books.length; // will be equal to length because adding a book
  this.setState({books: [...this.state.books,response.data], showModal: false, carouselIndex: lastIndex})
  })
  .catch(error => {
    console.log(error)
  })
}

deleteBook = (bookID) => {
  // eslint-disable-next-line no-restricted-globals
  const confirmed = confirm("Are you sure you wish to delete this book?");
  if (confirmed){
    axios.delete(url + `/${bookID}`)
    .then(() => {
      this.removefromState(bookID)
    })
    .catch(error => console.log(error)); 
  }
}

removefromState = (bookID) => {
  const newArray = this.state.books.filter(book => {
    return !(book._id === bookID)
  })
  this.setState({books: newArray, carouselIndex: 0})
}

handleCarouselSelect = (selectedIndex, e) => {
  this.setState({carouselIndex: selectedIndex});
}

handleUpdateBook = async (e) => {
  e.preventDefault();
  const title = e.target[0].value;
  const description = e.target[1].value;
  const status = e.target[2].value;
  const id = e.target[3].value;
  await axios.put(url + `/${id}`,{title: title, description: description, status: status})
  .then(response => {
    const tempBooks = Array(...this.state.books)
    const book = tempBooks.find(book => book._id === id)
    book.title = title
    book.description = description
    book.status = status
    book._id = response.data._id
    this.setState({books: tempBooks})
    alert(`${response.data.title} has now been updated!`)
  })
}

componentDidMount() {
  this.fetchbooks()
}

  render() {

    return (
      <>
        <h2>Good Reads &amp; Most Wanted Shelf</h2>
        <Button onClick={(e) => this.setState({showModal:true})}>
          Add Book
        </Button>
        <BookFormModal show={this.state.showModal} close={(e) => this.setState({showModal:false})} submit={this.addBook}></BookFormModal>
        {this.state.books.length ? (
          <Carousel activeIndex={this.state.carouselIndex} onSelect={this.handleCarouselSelect} style={{backgroundColor: 'black'}}>
            {this.state.books.map(element => 
              <Carousel.Item key={element._id}>
                <img src={bgImage} alt='sample background' style={{width: '100%', height: '50vh', opacity: "0.2"}}/>
                <Carousel.Caption>
                  <Form onSubmit={this.handleUpdateBook}>
                    <Form.Control defaultValue={element.title} />
                    <Form.Control defaultValue={element.description} />
                    <Form.Control defaultValue={element.status} />
                    <Form.Control defaultValue={element._id} disabled />
                    <Button type='submit' variant='success'>Update Book</Button>
                  </Form>
                  <Button onClick={e => this.deleteBook(element._id) } variant='danger'>Delete Book</Button>
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
