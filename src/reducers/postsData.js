/**
 * Created by Linwei on 2017/5/4.
 */

import {RECEIVE_POSTS, REQUEST_POSTS} from '../actions/actions';

const posts = (state = {
                 isFetching: false,
                 key: "content",
                 data: []
               }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        key: action.key
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        key: action.key,
        data: action.data
      });
    default:
      return state;
  }
};

export const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.key]: posts(state[state.key], action)
      })
  }
};
