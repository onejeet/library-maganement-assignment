import React, { Component } from "react";
import { connect } from "react-redux";
import BookCard from "../components/BookCard";
import CategoriesDropdown from "../components/CategoriesDropdown";
import { API_KEY } from "../Utilities/Constants";
import { addBook, isLoading } from "../Store/actions";

class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            author: "",
            url: "",
            category: {
                id:"",
                name: ""
            },
        }
    }
    componentDidUpdate(){
        if(this.props.message  === "Book Added Successfully!" && this.state.title){
            this.setState({
                title: "",
                author: "",
                url: "",
                category: {
                    id:"",
                    name: ""
                },
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let self = this;
        let obj =  {
            "image_url": this.state.url,
            "title": this.state.title,
            "author": this.state.author,
            "category_id": this.state.category.id,
            "category": this.state.category.name,
            "created_by_user_id": this.props.userInfo.id
        }
        this.props.addBook(obj);
    }

    onChange = (e, type) => {
        e.preventDefault();
        this.setState({
            [type]: e.target.value
        })
    }

    selectCategory = (e, c) => {
        e.preventDefault();
        this.setState({
            category: {
                id: c.id,
                name: c.category
            },
            showDropDown: false
        })
    }

    showDropDown = (e) => {
        this.setState({
            category: {
                id:"",
                name: e.target.value
            },
            showDropDown: true
        })
    }

    render(){
        return (
            <>
                {
                    this.props.message &&
                    <div className="message">
                        {this.props.message}
                    </div>
                }

                <div className="add-book-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Book name" value={this.state.title} onChange={(e) => this.onChange(e, "title")} />
                        <input type="text" placeholder="Author name" value={this.state.author} onChange={(e) => this.onChange(e, "author")} />
                        <input type="url" pattern="https?://.*" value={this.state.url} placeholder="Image url" onChange={(e) => this.onChange(e, "url")} />
                        <input type="text" className="category" value={this.state.category.name} placeholder="Category" onChange={this.showDropDown} />
                        <div className="dropdown-class">
                            <CategoriesDropdown
                            showDropDown = {this.state.showDropDown}
                            selectCategory = {this.selectCategory}
                            query = {this.state.category.name}
                            categories = {this.props.categories}
                            />
                        </div>
                        <input type="submit" value="Add Book" className="submit-button" />
                    </form>
                    <div className="live-display">
                    {
                        (this.state.title || this.state.author || this.state.url || this.state.category.id) 
                        ? <BookCard
                        book = {{
                            title: this.state.title,
                            author: this.state.author,
                            image_url: this.state.url,
                            category: this.state.category.name
                        }}
                        />
                        : <span className="placeholder">Enter Details for Preview</span>
                    }
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.reducer.message,
        isLoading: state.reducer.isLoading,
        categories: state.reducer.categories,
        userInfo: state.reducer.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (o) => {dispatch(addBook(o)), dispatch(isLoading(true))},
        fetchBooks: (type, search) => dispatch(fetchBooks(type, search)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);