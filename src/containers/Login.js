import React, { Component } from "react";
import { API_KEY } from "../Utilities/Constants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { updateMessage, isLoading, validateUser } from "../Store/actions";

const FontAwesome = require('react-fontawesome');

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    onChange = (e, type) => {
        this.props.updateMessage("");
        this.setState({
            [type] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const {username, password} = this.state;
        if(username && password){
            this.props.updateLoading(true);
            this.props.validateUser(username, password);
        }else{
            this.props.updateMessage("Username or password can't be blank!");
        }
        
    }


    render(){
        return (
            <div className="login-screen">
                <div className="branding">
                    <FontAwesome
                        className='super-crazy-colors'
                        name='superpowers'
                        size='2x'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    <span className="branding_title">Libra</span>
                    <span className="branding_tagline">Library Management System</span>
                </div>
                <form onSubmit={this.onSubmit}>
                    <input id="un" type="text" placeholder="Username" onChange={(e) => this.onChange(e, "username")} />
                    <input type="password" placeholder="Password" onChange={(e) => this.onChange(e, "password")} />
                    {
                        this.props.message &&
                        <div className="error">
                            {this.props.message}
                        </div>
                    }
                    <div className="submit-button">
                        {
                            this.props.isLoading
                            ? <Loader />
                            : <input type="submit" value="Login" />
                        }
                        
                    </div>
                    
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.reducer.message,
        isLoading: state.reducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        validateUser : (username,password) => dispatch(validateUser(username,password)),
        updateLoading : () => dispatch(isLoading(true)),
        updateMessage: (msg) => dispatch(updateMessage(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);