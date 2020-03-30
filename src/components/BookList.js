import React, { Component } from "react"
import BookCard from "./BookCard";
import Loader from "./Loader";
import ListControls from "./ListControls";

class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidUpdate(nextProps, nextState){
        if(nextProps.records.length !== this.props.records.length){
            this.setState({
                loading: false
            })
        }
    }

    changePage = (e) => {
        e.preventDefault();
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }

    loadMore = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        this.props.fetchNextPage();
    }

    render(){
        const { props } = this;
        return (
            <>
                <ListControls
                updateSorting = {props.updateSorting}
                ascSorting = {props.ascSorting}
                fetchSearchResults = {props.fetchLibrary}
                categories = {props.categories}
                addbook = {props.addbook}
                syncWithLocalStorage = {props.syncWithLocalStorage}
                getSelectedCategories = {props.getSelectedCategories}
                />
                <div className="book-list">
                    {
                        props.records.length > 0 
                        ? props.records.map((b, i) => 
                            <BookCard
                            key={`${b.id}-${i}`}
                            book = {b}
                            userInfo = {this.props.userInfo}
                            />
                        )
                        :
                        "No Books Found!"
                    }
                </div>
                <div className="pagination">
                    {
                        props.records.length  > 0 && props.records.length%48 === 0 &&
                        <div className="navigation-button" onClick={this.loadMore}>
                            {
                                this.state.loading ?
                                <Loader />
                                : "Load More"
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default BookList;