import { actionConstants, API_KEY, MAX_RECORDS } from "../Utilities/Constants";

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('appbiRsagJs9mSVXY');

export function isLoading(bool){
    return {
        type: actionConstants.IS_LOADING,
        payload: bool
    }
}

export function updateAuthentication(bool, data){
    return {
        type: actionConstants.UPDATE_AUTHENTICATION,
        payload: {
            status: bool,
            user: data,
            message: ""
        }
    }
}

export function validateUser(username, password){
    return function(dispatch){
        fetch(`https://api.airtable.com/v0/appbiRsagJs9mSVXY/user?api_key=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                let user = data.records.filter((r) => {
                    return (r.fields.username === username && r.fields.password === password)
                })[0];
                if(Object.keys(user.fields).length > 0){
                    localStorage.removeItem("userinfo");
                    localStorage.setItem("userinfo", JSON.stringify(user.fields));
                    dispatch({
                        type: actionConstants.UPDATE_AUTHENTICATION,
                        payload: {
                            status: true,
                            user: user.fields,
                            message: ""
                        }
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: actionConstants.UPDATE_AUTHENTICATION,
                    payload: {
                        status: false,
                        user: null,
                        message: "Invalid username or password. Try Again!"
                    }
                });
            });
    }
}

export function updateTheme(){
    return {
        type: actionConstants.UPDATE_THEME
    }
}

export function updateMessage(msg){
    return {
        type: actionConstants.UPDATE_MESSAGE,
        payload: msg
    }
}

export function fetchBooks(type, search) {
    return function (dispatch) {
        let config = {
            pageSize: MAX_RECORDS,
            view: "Grid view"
        }
        if(search){
            config.filterByFormula = search;
        }
        base('library').select(config).eachPage(function page(records, fetchNextPage){
            let lib = records.map((r) => r.fields);
            if(type === "library"){
                dispatch({
                    type: actionConstants.FETCH_LIBRARY,
                    payload: {
                        records: lib,
                        fetchNextPage: fetchNextPage,
                        message: ""
                    }
                });
            }else if(type === "search-results"){
                dispatch({
                    type: actionConstants.FETCH_SEARCH_RESULT,
                    payload: {
                        records: lib,
                        fetchNextPage: fetchNextPage,
                        message: ""
                    }
                });
            }else if(type === "mybooks"){
                dispatch({
                    type: actionConstants.FETCH_MY_BOOKS,
                    payload: {
                        records: lib,
                        fetchNextPage: fetchNextPage,
                        message: ""
                    }
                });
            }
        }, function done(err) {
            if(err){ 
                dispatch({
                    type: actionConstants.UPDATE_MESSAGE,
                    payload: "Network Error! Try again or check your internet connection."
                });
            }
        });
    };
}

export function addBook(obj){
    return function(dispatch){
        base('library').create([
            {
              "fields": obj
            }
          ], function(err, records) {
            if (err) {
                dispatch({
                    type: actionConstants.UPDATE_MESSAGE,
                    payload: "Book add failed!"
                });
              return;
            }
            dispatch({
                type: actionConstants.UPDATE_MESSAGE,
                payload: "Book Added Successfully!"
            });
        });
    }
}

export function loadCategories(){
    return function (dispatch) {
        let config = {
            view: "Grid view"
        }
        base('category').select(config).eachPage(function page(records, fetchNextPage){
            let lib = records.map((r) => r.fields);
            dispatch({
                type: actionConstants.LOAD_CATEGORIES,
                payload: lib
            });
        }, function done(err) {
            if(err){ 
                return; 
            }
        });
    }
}

export function updateUserInfo(data){
    return {
        type: actionConstants.UPDATE_USER_INFO,
        payload: data
    }
}

export function resetSearchResults(){
    return {
        type: actionConstants.RESET_SEARCH_RESULT,
    }
}