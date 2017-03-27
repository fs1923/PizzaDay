import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Main from '../../ui/Main.jsx';
import InsertGroup from '../../ui/InsertGroup.jsx';
import updateGroup from '../../ui/updateGroups';
import GroupPage from '../../ui/GroupPage.jsx';
import requestUser from '../../ui/RequestUser.jsx';
import Menu from '../../ui/menu.jsx';
import InsertItem from '../../ui/InsertItem.jsx';
import updateItem from '../../ui/updateItem.jsx';
import InsertCoupons from '../../ui/InsertCoupons';

const Layout =  (props)=>{
    return (
       <div><Menu />{props.children}</div>
    )
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

Meteor.startup(()=>
{
    render((

        <Router history={browserHistory}>
            <Route  path="/" component={Layout}>
                <IndexRoute component={Main}/>
                <Route path="addGroup" component={InsertGroup}/>
                <Route path="/group/:groupId" component={GroupPage}/>
                <Route path="/group/:groupId/insertItem" component={InsertItem}/>
                <Route path="/group/:groupId/insertCoupon" component={InsertCoupons}/>
                <Route path="updateGroup/:groupId" component={updateGroup}/>
                <Route path="group/:groupId/request" component={requestUser}/>
                <Route path="group/:itemId/updateItem" component={updateItem}/>
                <Route path="*" component={NotFound}/>
            </Route>

        </Router>
    ), document.getElementById('app'))
})