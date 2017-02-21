import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Menu from '../imports/ui/menu.jsx';
Meteor.startup(() => {
    render (<Menu />, document.getElementById('app'));
});