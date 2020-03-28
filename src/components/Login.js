import React, { Component } from "react";
import { API_KEY } from "../Utilities/Constants";
import { Link } from "react-router-dom";

const FontAwesome = require('react-fontawesome');

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        }
    }

    onChange = (e, type) => {
        this.setState({
            error: "",
            [type] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        if(username && password){
            this.props.updateLoadingStatus(true);
            fetch(`https://api.airtable.com/v0/appbiRsagJs9mSVXY/user?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                let user = data.records.filter((r) => {
                    return (r.fields.username === username && r.fields.password === password)
                })[0];
                if(Object.keys(user.fields).length > 0){
                    this.props.updateLoadingStatus(false);
                    this.props.updateAuthentication(true, user.fields);
                }
            })
            .catch((error) => {
                this.props.updateLoadingStatus(false);
                this.setState({
                    error: "Invalid username or password. Try again!"
                })
            });
        }else{
            this.setState({
                error: "Username or password can't be blank."
            })
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
                        this.state.error &&
                        <div className="error">
                            {this.state.error}
                        </div>
                    }
                    <input type="submit" value="Login" className="submit-button" />
                </form>
            </div>
        );
    }
}

export default Login;