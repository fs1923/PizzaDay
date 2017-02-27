import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.jsx';
import Menu from '../imports/ui/menu.jsx';
import '/imports/startup/client/router.jsx'


//
//Meteor.startup(() => {
//    //render (<div><Router history={browserHistory}>
//    //<Route path="/" cmponent={<Menu/>}/>
//    //</Router></div>, document.getElementById('app'));
//});