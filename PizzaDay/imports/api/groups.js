import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Groups = new Mongo.Collection('Groups');

if (Meteor.isServer) {
    Meteor.publish('groups', function groupsPublication() {
        return Groups.find();
    });
}

Meteor.methods({
    'Groups.remove'(groupId, userId) {
        if (this.userId) {
            Groups.remove({_id: groupId});
        }

    },
    'Groups.insert'(groupInsert) {
        if (this.userId) {
            Groups.insert(groupInsert);
        }
    },
    'Groups.update'(groupUpdate) {
        if (this.userId) {
            Groups.update({_id:groupUpdate._id},groupUpdate);
        }
    }
});

