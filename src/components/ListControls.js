import React, { Component } from "react"
import { Link } from "react-router-dom";
import BookList from "./BookList";
import CategoriesDropdown from "./CategoriesDropdown";
const FontAwesome = require('react-fontawesome');

class ListControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCategoryBox: false,
            showClearButton: false,
            query: "",
        }
    }

    toggleCategoryBox = () => {
        this.setState({
            showCategoryBox: !this.state.showCategoryBox
        })
    }

    updateQuery = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value
        })
    }

    fetchSearchResult = (e) => {
        e.preventDefault();
        this.props.fetchSearchResults(`SEARCH(LOWER("${this.state.query}"), LOWER(title))`);

        this.setState({
            showClearButton: true
        })
    }

    clearControls =() => {
        let lib = JSON.parse(localStorage.getItem("library"));
        if(lib && lib.length > 0 && lib !== this.props.library){
            this.props.syncWithLocalStorage(lib);
        }
        this.setState({
            query: "",
            showClearButton: false
        })
    }

    render(){
        const { props, state } = this;
        return (
            <div className="controls">
                 {
                    state.showClearButton &&
                    <div className="controls_button" onClick={this.clearControls}>
                       Clear Search & Filters
                    </div>
                }
                {
                    props.addbook &&
                    <div className="controls_button addbook">
                        <Link to="/addbook" >Add New Book</Link>
                    </div>
                }
                <div className="search">
                    <input type="text" value={state.query} onKeyDown={(e) => e.key === "Enter" ? this.fetchSearchResult(e) : null} onChange={this.updateQuery} placeholder="Search books by title..."/>
                    {
                        state.query.length > 0 &&
                        <FontAwesome
                        className='search-icon'
                        name='chevron-circle-right'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        onClick={this.fetchSearchResult}
                        />
                    }
                </div>
                <div className="controls_button" onClick={props.updateSorting}>
                    <FontAwesome
                        className='sort'
                        name={`${props.ascSorting ? 'sort-alpha-desc' : 'sort-alpha-asc'}`}
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
                <div className="controls_button category-filter" onClick={this.toggleCategoryBox}>
                    Filter By Category
                    {/* {
                        state.showCategoryBox &&
  
                        // <div className="category-box">
                        //     {
                        //         props.categories.map((cat) => 
                        //             <div className="item" key={cat.id}>
                        //                 <input type="checkbox" id={cat.id}
                        //                     checked={this.state.isChecked}
                        //                     onChange={this.toggleChange}
                        //                     />
                        //                 <label htmlFor={cat.id}>{cat.category}</label>
                        //             </div>
                        //         )
                        //     }
                        // </div>
                    } */}
                </div>
                <CategoriesDropdown
                showDropDown = {state.showCategoryBox}
                closeDropDown = {this.toggleCategoryBox}
                selectCategory = {props.selectCategory}
                categories = {props.categories}
                style={{top:"35px", right:"20px"}}
                />
            </div>
        )
    }
}

export default ListControls;