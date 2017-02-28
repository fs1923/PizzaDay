import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';

import Menu from '../../ui/menu.jsx';
import Main from '../../ui/Main.jsx';

const Layout =  (props)=>{
    return (
       <div><Menu />{props.children}</div>
    )
}



export default class Users extends React.Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="master">
                    sadfa
                </div>
                <div className="detail">
                    asdf
                </div>
            </div>
        )
    }
}
const NotFound = ()=>{
        return (
            <div className="container">
                <div className="error">
                    <h1><b>Page not found</b></h1>
                    <span className="glyphicon glyphicon-remove-circle" ></span>
                </div>
            </div>
        )
 }
 const waitSubsc = () => {
    return  Meteor.subscribe('groups');
}
Meteor.startup(()=>
{
    render((

        <Router history={browserHistory}>
            <Route  path="/" component={Layout}>
                <IndexRoute waitOn={waitSubsc} component={Main}/>
                <Route path="users" component={Users}/>
                <Route path="*" component={NotFound}/>
            </Route>

        </Router>
    ), document.getElementById('app'))
})