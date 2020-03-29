import React, { Component } from "react"
import { Link } from "react-router-dom";
import BookList from "./BookList";
const FontAwesome = require('react-fontawesome');

class ListControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCategoryBox: false,
            showClearButton: false,
            query: "",
            isChecked: false
        }
    }

    render(){
        const { props, state } = this;
        return (
            <div className="search-results">
                <BookList
                records = {records}
                addbook = {true}
                updateSorting = {this.updateSorting}
                fetchNextPage = {this.props.fetchNextPage}
                ascSorting = {this.state.ascSorting}
                fetchLibrary = {this.props.fetchLibrary}
                syncWithLocalStorage = {this.props.syncWithLocalStorage}
                categories = {this.props.categories}
                />
            </div>
        )
    }
}

export default ListControls;