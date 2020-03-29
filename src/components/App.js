import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { API_KEY, MAX_RECORDS } from "../Utilities/Constants";
import Routes from "../Routes";
import Header from "./Header";
const FontAwesome = require('react-fontawesome');
const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('appbiRsagJs9mSVXY');

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            lightTheme: true,
            isAuthenticated: false,
            userInfo: {},
            library: [],
            categories: [],
            fetchNextPage: null
        }
    }

    componentDidMount(){
        let ls = JSON.parse(localStorage.getItem("userinfo"));
        if(ls){
            this.updateAuthentication(true, ls);          
        }
    }

    updateTheme = () => {
        this.setState({
            lightTheme: !this.state.lightTheme
        })
    }

    updateAuthentication = (bool, userInfo) => {
        this.setState({
            isAuthenticated: bool,
            userInfo
        }, () => {
            this.fetchLibrary();
            this.loadCategories();
            if(userInfo){
                localStorage.removeItem("userinfo");
                localStorage.setItem("userinfo", JSON.stringify(userInfo));
            }
            this.props.history.push("/");
        });
    }

    loadCategories = () => {
        let self = this;
        let config = {
            view: "Grid view"
        }
        base('category').select(config).eachPage(function page(records, fetchNextPage){
            self.setState({
                categories: records.map((r) => r.fields),
            });
        }, function done(err) {
            if(err){ 
                return; 
            }
        });
    }

    fetchLibrary = (search = "") => {
        let self = this;
        let config = {
            pageSize: MAX_RECORDS,
            view: "Grid view"
        }
        if(search){
            config.filterByFormula = search;
        }
        base('library').select(config).eachPage(function page(records, fetchNextPage){
            if(!search){
                let lib = self.state.library.concat(records.map((r) => r.fields));
                self.setState({
                    library: lib,
                    fetchNextPage: fetchNextPage
                }, () => {
                    localStorage.removeItem("library");
                    localStorage.setItem("library", JSON.stringify(lib));
                });
            }else{
                self.setState({
                    library: records.map((r) => r.fields),
                });
            }
        }, function done(err) {
            if(err){ 
                console.error(err); 
                return; 
            }
        });
    }

    syncWithLocalStorage = (lib) => {
        this.setState({
            library: lib
        })
    }


    logout = () => {
        this.setState({
            isAuthenticated: false,
            userInfo: {},
            library: [],
            categories: [],
            fetchNextPage: null
        }, () => {
            localStorage.removeItem("library");
            localStorage.removeItem("userinfo");
            this.props.history.push("/login");
        });
    }

    render(){
        let childProps = {
            isAuthenticated : this.state.isAuthenticated,
            updateAuthentication: this.updateAuthentication,
            fetchNextPage: this.state.fetchNextPage,
            fetchLibrary : this.fetchLibrary,
            library: this.state.library,
            userInfo : this.state.userInfo,
            categories: this.state.categories,
            syncWithLocalStorage: this.syncWithLocalStorage
        };
        return (
            <>
                <div className={`app ${this.state.lightTheme ? 'light' : 'dark'} `}>
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
                <div className="footer">
                    
                </div>
            </>
        );
    }
}

export default withRouter(App);