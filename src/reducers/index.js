/**
 * Created by Linwei on 2017/5/22.
 */

import {combineReducers} from 'redux';
import postsBySubreddit from "./postsData";
import uiStatus from "./ui";
const reducers = {
    postsBySubreddit,
    uiStatus
};

const combined = combineReducers(reducers);
export default combined;
