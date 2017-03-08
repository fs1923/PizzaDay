import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const UserList = new Mongo.Collection('UserList');
if (Meteor.isServer) {
    Meteor.publish('userList', function userListPublication() {
        return UserList.find();
    });
}
