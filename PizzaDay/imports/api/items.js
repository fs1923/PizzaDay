import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('Items');

if (Meteor.isServer) {
    Meteor.publish('items', function groupsPublication() {
        return Items.find();
    });
}

