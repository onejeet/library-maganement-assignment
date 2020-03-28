import React, { Component } from "react"
import BookCard from "./BookCard";

const BookList = (props) => {
    return (
        <>
            <div className="book-list">
                {
                    props.records.length > 0 
                    ? props.records.map((b) => 
                        <BookCard
                        key={b.id}
                        book = {b}
                        />
                    )
                    :
                    "No Books Found!"
                }
            </div>
            <div className="pagination">
                {
                    //Here
                }
            </div>
        </>
    )
}

export default BookList;