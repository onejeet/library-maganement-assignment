import React, { Component } from "react";
import { API_KEY } from "../Utilities/Constants";
import { Link } from "react-router-dom";

const FontAwesome = require('react-fontawesome');

class BookCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }


    render(){
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book_image">
                    <img src={`${book.image_url}`} alt={`${book.title}`} />
                </div>
                <div className="book_description">
                    {
                        book.category &&
                        <span className="category">{book.category}</span>
                    }
                    {book.title}
                    <span className="author">
                        <FontAwesome
                            className='author-icon'
                            name='user'
                        />
                        {book.author}
                    </span>
                </div>
                <div className="author">
                    
                </div>
                <div className="book_category">
                    
                </div>
                <div className="view-details">
                    View Details
                </div>
            </div>
        );
    }
}

export default BookCard;