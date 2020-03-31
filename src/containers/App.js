import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Routes from "../Routes";
import Header from "../components/Header";
import { updateAuthentication, updateUserInfo, updateTheme, isLoading } from "../Store/actions";


class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let ls = JSON.parse(sessionStorage.getItem("userinfo"));
        if(ls){
            this.props.authenticate(true, ls);          
        }
    }

    logout = () => {
        this.props.authenticate(false, null);
        sessionStorage.removeItem("library");
        sessionStorage.removeItem("userinfo");
        this.props.history.push("/login");
    }

    render(){
        let childProps = {
            isAuthenticated : this.props.isAuthenticated,
        };
        return (
            <div className={`app ${this.props.lightTheme ? 'light' : 'dark'} `}>
                {
                    this.props.isAuthenticated &&
                    <Header 
                    lightTheme = {this.props.lightTheme}
                    updateTheme = {this.props.toggleTheme}
                    logout = {this.logout}
                    isAuthenticated = {this.props.isAuthenticated}
                    userInfo = {this.props.userInfo}
                    />
                }
                
                <div className="container">
                    <Routes childProps={childProps} />
                </div>
                {
                    this.props.isAuthenticated &&
                    <div className="footer">
                        &copy; Libra - Jitendra Sharma 2020
                    </div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.reducer.isLoading,
        userInfo: state.reducer.userInfo,
        lightTheme: state.reducer.lightTheme,
        isAuthenticated: state.reducer.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate : (bool, data) => dispatch(updateAuthentication(bool, data)),
        toggleTheme : () => dispatch(updateTheme())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));