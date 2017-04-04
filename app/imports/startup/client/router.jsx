import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Main from '../../ui/Main/main.jsx';
import InsertGroup from '../../ui/Main/InsertGroup/InsertGroup.jsx';
import updateGroup from '../../ui/UpdateGroup/updateGroup';
import GroupPage from '../../ui/GroupPage/groupPage.jsx';
import requestUser from '../../ui/RequestUser/requestUser.jsx';
import Menu from '../../ui/menu.jsx';
import InsertItem from '../../ui/InsertItem/insertItem.jsx';
import updateItem from '../../ui/UpdateItem/updateItem.jsx';
import InsertCoupon from '../../ui/InsertCoupon/insertCoupon';
import usersShoppingStory from '../../ui/ShoppingStory/UserShoppingStory/usersShoppingStory.jsx';
import CouponsPage from '../../ui/CouponsPage/CouponsPage'
import ShoppingGroupsStory from '../../ui/ShoppingStory/GroupShoppingStory/groupShoppingStory.jsx';

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
                <Route path="/group/:groupId/insertCoupon" component={InsertCoupon}/>
                <Route path="/group/:groupId/Coupons" component={CouponsPage}/>
                <Route path="updateGroup/:groupId" component={updateGroup}/>
                <Route path="group/:groupId/request" component={requestUser}/>
                <Route path="group/:itemId/updateItem" component={updateItem}/>
                <Route path="usersShoppingStory" component={usersShoppingStory}/>
                <Route path="group/:groupId/shoppingGroupsStory" component={ShoppingGroupsStory}/>
                <Route path="*" component={NotFound}/>
            </Route>

        </Router>
    ), document.getElementById('app'))
})