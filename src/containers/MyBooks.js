import React, { Component } from "react";
import { connect } from "react-redux";
import BookList from "../components/BookList";
import { sortBooks, filterByCategory } from "../Utilities/helper";
import { fetchBooks, isLoading } from "../Store/actions";
import Loader from "../components/Loader";
const FontAwesome = require('react-fontawesome');

class MyBooks extends Component {
    constructor(props){
        super(props);
        this.state = {
            ascSorting: true,
            categoryFilters : []
        }
    }

    componentDidMount(){
        this.props.fetchBooks("mybooks", `(created_by_user_id = ${this.props.userInfo.id})`);
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
        const { myBooks } = this.props;
        let records = filterByCategory(sortBooks(myBooks, this.state.ascSorting), this.state.categoryFilters);
        return (
            <div className="mybooks">
            {
                !this.props.isLoading ?
                <BookList
                records = {records}
                addbook = {true}
                updateSorting = {this.updateSorting}
                fetchNextPage = {this.props.fetchNextPage}
                ascSorting = {this.state.ascSorting}
                categories = {this.props.categories}
                userInfo = {this.props.userInfo}
                getSelectedCategories = {this.getSelectedCategories}
                history = {this.props.history}
                />
                : <Loader />
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myBooks: state.reducer.mybooks,
        userInfo: state.reducer.userInfo,
        isLoading: state.reducer.isLoading,
        categories: state.reducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: (type, search) => {dispatch(fetchBooks(type, search)), dispatch(isLoading(true))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);