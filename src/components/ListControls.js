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
            categoryFilters : [],
            showApplyFilter: false
        }
    }

    toggleCategoryBox = () => {
        this.setState({
            showCategoryBox: !this.state.showCategoryBox
        })
    }

    clickCategoryItem = (e, c) => {
        const { categoryFilters } = this.state;
        let index = categoryFilters.findIndex((x) => x == c.id);
        if(index < 0){
            categoryFilters.push(c.id);
        }else{
            categoryFilters.splice(index, 1);
        }
        
        this.setState({
            categoryFilters,
            showApplyFilter: true
        })
    }

    filterCategoryWise = () => {
        this.setState({
            showCategoryBox: false,
            showClearButton: true,
            showApplyFilter: false
        })
        this.props.getSelectedCategories(this.state.categoryFilters);
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
            categoryFilters: [],
            showClearButton: false
        }, ()=> {
            this.props.getSelectedCategories(this.state.categoryFilters);
        })
    }

    render(){
        const { props, state } = this;
        return (
            <div className="controls">
                 {
                    state.showClearButton &&
                    <div className="controls_button primary" onClick={this.clearControls}>
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
                <div className={`controls_button ${this.state.showApplyFilter ? "primary": ""}`} onClick={this.toggleCategoryBox}>
                    {
                        this.state.showApplyFilter ?
                        <span onClick={this.filterCategoryWise}>Apply Filter</span>
                        : "Filter By Category"
                    }
                </div>
                <CategoriesDropdown
                showDropDown = {state.showCategoryBox}
                categories = {props.categories}
                style={{top:"35px", right:"20px"}}
                multiSelect = {true}
                categoryFilters = {this.state.categoryFilters}
                clickCategoryItem = {this.clickCategoryItem}
                filterCategoryWise = {this.filterCategoryWise}
                />
            </div>
        )
    }
}

export default ListControls;