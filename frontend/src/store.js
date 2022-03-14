import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { getSearchedUserReducer, getTopUser, userLoginReducer, userLogoutReducer } from "./reducers/userReducer";
import { addPreferencesReducer, countPreferences } from "./reducers/preferencesReducer";
import { addStoriesReducer, getStoriesReducer } from "./reducers/storiesReducer";
import { addPostReducer, getPostReducer } from "./reducers/postsReducer";

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userLogout : userLogoutReducer,
    topUsers : getTopUser,
    countPreferences : countPreferences,
    preferencesData : addPreferencesReducer,
    storyInfo: getStoriesReducer,
    currentStoryInfo: addStoriesReducer, 
    allPosts: getPostReducer, 
    searchUserResult : getSearchedUserReducer,
    addPost : addPostReducer,
});

const userInfoFromStorage = localStorage.getItem("Instagram-UserInfo") ? JSON.parse(localStorage.getItem("Instagram-UserInfo")) : {};

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;