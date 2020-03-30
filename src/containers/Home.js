import React, { Component } from "react";
import { connect } from "react-redux";
import BookList from "../components/BookList";
import { sortBooks, filterByCategory } from "../Utilities/helper";
import { fetchBooks, isLoading, loadCategories } from "../Store/actions";
import Loader from "../components/Loader";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            ascSorting: null,
            categoryFilters : []
        }
    }
    

    componentDidMount(){
        if(this.props.library.length <= 0 ){
            this.props.getLibrary();
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
        let { library } = this.props;
        let records = filterByCategory(sortBooks(library, this.state.ascSorting), this.state.categoryFilters);
        return (
            <div className="home">
                {
                    !this.props.isLoading ?
                    <BookList
                    records = {records}
                    fetchNextPage = {this.props.fetchNextPage}
                    updateSorting = {this.updateSorting}
                    ascSorting = {this.state.ascSorting}
                    categories = {this.props.categories}
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
        library: state.reducer.library,
        isLoading: state.reducer.isLoading,
        fetchNextPage: state.reducer.fetchNextPage,
        categories: state.reducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLibrary: () => {dispatch(fetchBooks("library")), dispatch(loadCategories()), dispatch(isLoading(true))},
        fetchBooks: (type, search) => {dispatch(fetchBooks(type, search)), dispatch(isLoading(true))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);