import React, { Component } from "react";
import ListControls from "./ListControls";
import BookList from "./BookList";
import { sortBooks, filterByCategory } from "../Utilities/helper";
const FontAwesome = require('react-fontawesome');

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ascSorting: true,
            categoryFilters : []
        }
    }

    updateSorting = () => {
        this.setState({
            ascSorting : !this.state.ascSorting
        })
    }

    getSelectedCategories = (arr) => {
        this.setState({
            categoryFilters: arr
        })
    }

    render(){
        let myBooks = this.props.library.filter((b) => b.created_by_user_id === this.props.userInfo.id);
        let records = filterByCategory(sortBooks(myBooks, this.state.ascSorting), this.state.categoryFilters);

        return (
            <div className="mybooks">
                <BookList
                records = {records}
                addbook = {true}
                updateSorting = {this.updateSorting}
                fetchNextPage = {this.props.fetchNextPage}
                ascSorting = {this.state.ascSorting}
                fetchLibrary = {this.props.fetchLibrary}
                syncWithLocalStorage = {this.props.syncWithLocalStorage}
                categories = {this.props.categories}
                userInfo = {this.props.userInfo}
                getSelectedCategories = {this.getSelectedCategories}
                />
            </div>
        );
    }
}

export default Home;