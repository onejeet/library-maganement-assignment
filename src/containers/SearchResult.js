import React, { Component } from "react";
import { connect } from "react-redux";
import BookList from "../components/BookList";
import { sortBooks, filterByCategory } from "../Utilities/helper";
import { fetchBooks, isLoading, resetSearchResults } from "../Store/actions";
import Loader from "../components/Loader";

class SearchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            ascSorting: null,
            categoryFilters : []
        }
    }

    componentDidMount(){
        this.props.fetchBooks("search-results", `SEARCH(LOWER("${this.props.match.params.query}"), LOWER(title))`)
    }

    componentWillUnmount(){
        this.props.resetSearchResults();
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
        const { props, state } = this;
        let records = filterByCategory(sortBooks(props.searchResults, this.state.ascSorting), this.state.categoryFilters);
        return (
            <div className="search-results">
                {
                    !this.props.isLoading ?
                    <BookList
                    records = {records}
                    updateSorting = {this.updateSorting}
                    fetchNextPage = {this.props.fetchNextPage}
                    ascSorting = {this.state.ascSorting}
                    categories = {this.props.categories}
                    getSelectedCategories = {this.getSelectedCategories}
                    history = {this.props.history}
                    />
                    :<Loader />
                }    
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        searchResults: state.reducer.searchResults,
        isLoading: state.reducer.isLoading,
        fetchNextPage: state.reducer.fetchNextPage,
        categories: state.reducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: (type, search) => {dispatch(fetchBooks(type, search)), dispatch(isLoading(true))},
        resetSearchResults: () => dispatch(resetSearchResults())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);