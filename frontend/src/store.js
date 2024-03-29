import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { 
    addbookmarkReducer,
    followUnfollowUserReducer,
    getSearchedUserReducer, 
    getTopUser, 
    getUserDetailsReducer, 
    getUserMutualSuggestionsReducer, 
    getUserSuggestionsReducer, 
    userLoginReducer, 
    userLogoutReducer, 
    userProfileDetailsReducer} from "./reducers/userReducer";
import { addPreferencesReducer, countPreferences } from "./reducers/preferencesReducer";
import { addStoriesReducer, getStoriesReducer } from "./reducers/storiesReducer";
import { addPostReducer, commentReducer, exploreReducer, getPostReducer, likeReducer } from "./reducers/postsReducer";
import { addReelReducer, getAllReels } from "./reducers/reelsReducer";

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userLogout : userLogoutReducer,
    profileDetails: userProfileDetailsReducer,
    topUsers : getTopUser,
    countPreferences : countPreferences,
    preferencesData : addPreferencesReducer,
    storyInfo: getStoriesReducer,
    currentStoryInfo: addStoriesReducer, 
    allPosts: getPostReducer, 
    searchUserResult : getSearchedUserReducer,
    addPost : addPostReducer,
    likeAdded: likeReducer,
    commentAdded: commentReducer,
    userDetails: getUserDetailsReducer,
    suggestedUsers: getUserSuggestionsReducer,
    mutualUsers: getUserMutualSuggestionsReducer,
    addReel: addReelReducer,
    allReels: getAllReels,
    explorePosts: exploreReducer,
    followUnfollow: followUnfollowUserReducer,
    addBookmark: addbookmarkReducer
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