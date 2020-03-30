import { combineReducers } from  "redux";
import { actionConstants } from "../Utilities/Constants";

const defaultState = {
    isLoading: false,
    lightTheme: true,
    isAuthenticated: false,
    userInfo: null,
    library: [],
    categories: [],
    fetchNextPage: null,
    searchResults: [],
    mybooks: [],
    categories: [],
    message: ""
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionConstants.UPDATE_AUTHENTICATION:
            return { ...state, isLoading:false, isAuthenticated: action.payload.status, userInfo:action.payload.user, message: action.payload.message};
        case actionConstants.UPDATE_THEME:
            return { ...state, lightTheme: !state.lightTheme};
        case actionConstants.UPDATE_MESSAGE:
            return { ...state, isLoading:false, message: action.payload};
        case actionConstants.IS_LOADING:
            return { ...state, isLoading: action.payload};
        case actionConstants.FETCH_LIBRARY:
            return { ...state, isLoading:false, library: state.library.concat(action.payload.records), fetchNextPage: action.payload.fetchNextPage  };
        case actionConstants.FETCH_SEARCH_RESULT:
            return { ...state,  isLoading:false, searchResults: state.searchResults.concat(action.payload.records), fetchNextPage: action.payload.fetchNextPage };
        case actionConstants.FETCH_MY_BOOKS:
            return { ...state, isLoading:false, mybooks: state.mybooks.concat(action.payload.records), fetchNextPage: action.payload.fetchNextPage };
        case actionConstants.UPDATE_USER_INFO:
            return { ...state, userInfo: action.payload };
        case actionConstants.LOAD_CATEGORIES:
            return { ...state, categories: action.payload };
        case actionConstants.RESET_SEARCH_RESULT:
            return { ...state, searchResults: [] };
        default:
            return state;
    }
  };

const reducers = combineReducers({
    reducer
})

export default reducers;