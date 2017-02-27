import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import Menu from '../../ui/menu.jsx'

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
class NotFound extends React.Component {
    render() {
        return (
            <div>
                Page not found
            </div>
        )
    }
}
console.log(document.getElementById('app'))
Meteor.startup(()=>
{
    render((
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Users}/>
                <Route path="users" component={Users}/>
                <Route path="*" component={NotFound}/>
            </Route>

        </Router>
    ), document.getElementById('app'))
})