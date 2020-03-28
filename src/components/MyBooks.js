import React, { Component } from "react";
import ListControls from "./ListControls";
import BookList from "./BookList";
import { sortBooks, filterBooks } from "../Utilities/helper";
const FontAwesome = require('react-fontawesome');

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            ascSorting: true
        }
    }

    updateSorting = () => {
        this.setState({
            ascSorting : !this.state.ascSorting
        })
    }
    updateQuery = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value
        })
    }

    componentDidMount(){
        if(!this.props.library.length > 0){
            this.props.updateLoadingStatus(true);
            this.props.fetchLibrary();
        }
    }

    render(){
        let myBooks = this.props.library.filter((b) => b.created_by_user_id === this.props.userInfo.id);
        let records = filterBooks(sortBooks(myBooks, this.state.ascSorting), this.state.query);

        return (
            <div className="home">
                <ListControls
                addbook = {true}
                query = {this.state.query}
                updateQuery = {this.updateQuery}
                updateSorting = {this.updateSorting}
                ascSorting = {this.state.ascSorting}
                />
                <BookList
                records = {records}
                />
                <div className="pagination">
                    {
                        //Here
                    }
                </div>
            </div>
        );
    }
}

export default Home;