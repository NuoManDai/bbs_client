/**
 * Created by Linwei on 2017/2/22.
 */
import fetch from 'isomorphic-fetch';

export const CONTENT_TEXT = 'CONTENT_TEXT';
export const TAB_SELECTED = 'TAB_SELECTED';
export const ACTIVITY_TEXT = 'ACTIVITY_TEXT';
export const PERSONAL = 'PERSONAL';
export const COMMENT_TEXT = 'COMMENT_TEXT';
export const RECOMMEND_TEXT = 'RECOMMEND_TEXT';
export const REQUEST_POSTS = 'REQUEST_POSTS ';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const URL = 'http://localhost:3000';

let tabSelcted = (text) => {
  return {
    TAB_SELECTED,
    text
  }
};

let requestPosts = (key) => {
  return {
    type: REQUEST_POSTS,
    key
  }
};

let receivePosts = (key, json) => {
  return {
    type: RECEIVE_POSTS,
    key,
    data: json
  }
};
// 获取数据
export let fetchPosts = (key, url) => {
  return async dispatch => {
    try {
      dispatch(requestPosts(key));
      var response = await fetch(url);
      var json = await response.json();
      dispatch(receivePosts(key, json));
    }
    catch (err) {
      console.log(err);
    }
  }
};




