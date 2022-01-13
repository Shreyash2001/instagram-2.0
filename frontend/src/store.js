import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { getTopUser, userLoginReducer } from "./reducers/userReducer";
import { addPreferencesReducer, countPreferences } from "./reducers/preferencesReducer";

const reducer = combineReducers({
    userLogin : userLoginReducer,
    topUsers : getTopUser,
    countPreferences : countPreferences,
    preferencesData : addPreferencesReducer,
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