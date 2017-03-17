import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const MembersGroups = new Mongo.Collection('MembersGroups');

if (Meteor.isServer) {
    Meteor.publish('membersGroups', function membersGroupsPublication() {
        return MembersGroups.find();
    });
}