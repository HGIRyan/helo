// DEPENDANCIES
import React from 'react';
import { Switch, Route } from 'react-router-dom'


// IMPORTS
import Auth from './component/Auth/Auth'
import Dashboard from './component/Dashboard/Dashboard'
import Form from './component/Form/Form'
import Post from './component/Post/Post'

// ROUTES
export default (
    <Switch>
        <Route component={Auth} path='/' exact/>
        <Route component={Dashboard} path='/dashboard' />
        <Route component={Post} path='/post/:postid' />
        <Route component={Form} path='/new'/>
    </Switch>
)