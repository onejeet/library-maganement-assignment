import React, { Component } from "react";
import BookList from "./BookList";
import { sortBooks, filterByCategory } from "../Utilities/helper";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            ascSorting: null,
            categoryFilters : []
        }
    }

    updateSorting = () => {
        this.setState({
            ascSorting : !this.state.ascSorting
        })
    }

    selectCategory = (e, c) => {
        const { categoryFilters } = this.state;
        let index = categoryFilters.findIndex((x) => x == c.id);
        if(index < 0){
            categoryFilters.push(c.id);
        }else{
            categoryFilters.splice(index, 1);
        }
        
        this.setState({
            categoryFilters
        })
    }

    render(){
        let { library } = this.props;
        console.log(this.state);
        let records = filterByCategory(sortBooks(library, this.state.ascSorting), this.state.categoryFilters);

        return (
            <div className="home">
                {
                    records.length > 0 &&
                    <BookList
                    records = {records}
                    fetchNextPage = {this.props.fetchNextPage}
                    updateSorting = {this.updateSorting}
                    ascSorting = {this.state.ascSorting}
                    fetchLibrary = {this.props.fetchLibrary}
                    categories = {this.props.categories}
                    syncWithLocalStorage = {this.props.syncWithLocalStorage}
                    selectCategory = {this.selectCategory}
                    />
                }
            </div>
        );
    }
}

export default Home;