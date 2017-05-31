require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/index.css');
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, browserhistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './stores/store';


import TransitionRoute from './components/TransitionRoute';
import App from './containers/Main';
import Register from './containers/Register';
import RetrievePassword from './containers/RetrievePassword';
import Index from './components/Index';
import Home from './components/Home';
import MessagePublish from './containers/MessagePublish';
import CharacterCard from './containers/CharacterCard';
import MessageContent from './containers/MessageContent';
import ActivityDetails from './containers/ActivityDetails';
import RecommendDetails  from './containers/RecommendDetails';
import PersonalList from './containers/PersonalList';
import PersonalComment from './containers/PersonalComment';
import SecurityCenter from './components/SecurityCenter';
import PasswordUpdate from './containers/PasswordUpdate';
import Settings from './containers/Settings';

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={TransitionRoute}>
                <IndexRoute component={App}></IndexRoute>
                <Route path="/register" component={Register}/>
                <Route path='/forgot' component={RetrievePassword}/>
                <Route path='/index' component={Index}/>
                <Route path='/messagePublish' component={MessagePublish}/>
                <Route path='/characterCard' component={CharacterCard}/>
                <Route path='/messageContent' component={MessageContent}/>
                <Route path='/activityDetails' component={ActivityDetails}/>
                <Route path='/recommendDetails' component={RecommendDetails}/>
                <Route path='/personalList' component={PersonalList}/>
                <Route path='/personalComment' component={PersonalComment}/>
                <Route path='/securityCenter' component={SecurityCenter}/>
                <Route path='/passwordUpdate' component={PasswordUpdate}/>
                <Route path='/settings' component={Settings}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app'));
