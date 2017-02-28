import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('Groups');

if (Meteor.isServer) {
    Meteor.publish('groups', function groupPublication() {
        return Groups.find();
    });
}
Meteor.methods({
    'Groups.remove'(groupId, userId) {

        Groups.remove({_id: groupId});
    },
});