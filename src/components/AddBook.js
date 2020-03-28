import React, { Component } from "react";


class AddBook extends Component{
    constructor(props){
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        return (
            <div className="add-book-wrapper">
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Book name"/>
                    <input type="text" placeholder="Author name"/>
                    
                </form>
            </div>
        );
    }
}

export default AddBook;