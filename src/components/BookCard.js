import React, { Component } from "react";
import { API_KEY } from "../Utilities/Constants";
import { Link } from "react-router-dom";
let Airtable = require('airtable');
let base = new Airtable({apiKey: API_KEY}).base('appbiRsagJs9mSVXY');
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

    delete = () => {
        if (confirm('Are you sure you want to delete this book?')) {
            alert("Feature is in Progress!")
        }
    }
    edit = () => {
        alert("Feature is in Progress!")
    }


    render(){
        const { book, userInfo } = this.props;
        return (
            <div className="book">
                {
                    userInfo && book.created_by_user_id === userInfo.id  &&
                    <div className="actions" title="Delete the book" >
                        <FontAwesome
                            className="pencil-icon"
                            name='pencil'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick={this.edit}
                        />
                        <FontAwesome
                            className="delete-icon"
                            name='trash'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick={this.delete}
                        />
                    </div>
                }
                {
                    book.image_url &&
                    <div className="book_image">
                        <img src={`${book.image_url}`} alt={`${book.title}`} />
                    </div>
                }
                
                <div className="book_description">
                    {
                        book.category &&
                        <span className="category">{book.category}</span>
                    }
                    {
                        book.title &&
                        <span>{book.title}</span>
                    }
                    {
                        book.author &&
                        <span className="author">
                            <FontAwesome
                                className='author-icon'
                                name='user'
                            />
                            {book.author}
                        </span>
                    }
                    
                </div>
            </div>
        );
    }
}

export default BookCard;