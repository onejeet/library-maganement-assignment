import React, { Component } from "react"
import { Link } from "react-router-dom";
import BookList from "./BookList";
const FontAwesome = require('react-fontawesome');

const ListControls = (props) => {
    return (
        <div className="controls">
            {
                props.addbook &&
                <div className="add-book">
                    <Link to="/addbook" >Add New Book</Link>
                </div>
            }
            <div className="search">
                <input type="text" value={props.query} onChange={props.updateQuery} placeholder="Search Books..."/>
            </div>
            <div className="filter" onClick={props.updateSorting}>
            <FontAwesome
                className='sort'
                name={`${props.ascSorting ? 'sort-alpha-desc' : 'sort-alpha-asc'}`}
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            </div>
        </div>
    )
}

export default ListControls;