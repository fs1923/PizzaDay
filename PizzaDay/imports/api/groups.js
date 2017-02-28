import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Groups = new Mongo.Collection('Groups');

if (Meteor.isServer) {
    Meteor.publish('groups', function groupsPublication() {
        return Groups.find();
    });
}
