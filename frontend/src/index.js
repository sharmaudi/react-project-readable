import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import Root from './containers/Root';
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store/configureStore'


const store = configureStore()

ReactDOM.render(
    <Router>
        <Root store={store}/>
    </Router>,
    document.getElementById('root'));
