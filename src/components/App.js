import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { API_KEY, MAX_RECORDS } from "../Utilities/Constants";
import Routes from "../Routes";
import Header from "./Header";
const FontAwesome = require('react-fontawesome');

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            lightTheme: true,
            isAuthenticated: true,
            userInfo: {},
            library: []
        }
    }

    updateTheme = () => {
        this.setState({
            lightTheme: !this.state.lightTheme
        })
    }

    updateLoadingStatus = (bool) => {
        this.setState({
            isLoading: bool
        })
    }

    updateAuthentication = (bool, userInfo) => {
        this.setState({
            isAuthenticated: bool,
            userInfo
        }, () => {
            this.fetchLibrary();
            this.props.history.push("/");
        });
    }


    fetchLibrary = () => {
        let url = `https://api.airtable.com/v0/appbiRsagJs9mSVXY/library?api_key=${API_KEY}&maxRecords=${MAX_RECORDS}`;
        if(!this.state.isLoading){
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    library: data.records.map((r) => r.fields),
                    isLoading: false
                });
            })
            .catch((error) => {
                this.updateLoadingStatus(false);
                // error
            })
        }
    }


    logout = () => {
        this.setState({
            isAuthenticated: false
        }, () => {
            this.props.history.push("/login");
        });
    }

    render(){
        let childProps = {
            isAuthenticated : this.state.isAuthenticated,
            updateAuthentication: this.updateAuthentication,
            fetchLibrary: this.fetchLibrary,
            library: this.state.library,
            userInfo : this.state.userInfo,
            updateLoadingStatus: this.updateLoadingStatus
        };
        return (
            <>
                <div className={`app ${this.state.lightTheme ? 'light' : 'dark'} ${this.state.isLoading ? "blur" : ""}`}>
                    {
                        this.state.isAuthenticated &&
                        <Header 
                        lightTheme = {this.state.lightTheme}
                        updateTheme = {this.updateTheme}
                        logout = {this.logout}
                        isAuthenticated = {this.state.isAuthenticated}
                        userInfo = {this.state.userInfo}
                        />
                    }
                    
                    <div className="container">
                        <Routes childProps={childProps} />
                    </div>
                </div>
                { 
                    this.state.isLoading  &&
                    <div className="loading">
                        <FontAwesome
                            className='loading-icon'
                            name='spinner'
                            size='4x'
                            spin
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                    </div>
                }
                <div className="footer">
                    
                </div>
            </>
        );
    }
}

export default withRouter(App);