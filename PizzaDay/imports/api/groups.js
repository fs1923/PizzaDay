import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Items } from '../api/items.js'
import { UserList } from './userList.js';
import { Cart } from './cart.js'

export const Groups = new Mongo.Collection('Groups');

if (Meteor.isServer) {
    Meteor.publish('groups', function groupsPublication() {
        return Groups.find();
    });
    Meteor.publish('users', function usersPublication() {
        return Meteor.users.find({},{fields:{'username':1, 'emails':1}});
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
            if (groupInsert.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Groups.insert(groupInsert);
        }
    },
    'Groups.update'(groupUpdate) {
        if (this.userId) {
            if (groupUpdate.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Groups.update({_id:groupUpdate._id},groupUpdate);
        }
    },
    'UserList.insert'(userListInsert) {
        UserList.insert(userListInsert);
    },
    'UserList.remove'(requestId){
        UserList.remove({_id: requestId});
    },
    'UserList.update'(userListUpdate){
        UserList.update({_id: userListUpdate._id},userListUpdate);
    },
    'Items.insert'(itemInsert) {
        if (this.userId) {
            if (isNaN(itemInsert.prise) || itemInsert.prise=='')
                throw new Meteor.Error(500, 'Error: Price is not a number', 'Price is not a number');
            if (itemInsert.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');

            Items.insert(itemInsert);
        }
    },
    'Cart.insert'(cartInsert) {
            Cart.insert(cartInsert);
    },
    'Cart.remove'(CartId){
        Cart.remove({_id: CartId});
    },
    'Item.remove'(itemId) {
        if (this.userId){
            Cart.remove({ItemId:itemId});
            Items.remove({_id: itemId});
        }
    },
    'Item.update'(itemUpdate) {
        if (this.userId) {
            if (isNaN(itemUpdate.prise) || itemUpdate.prise=='')
                throw new Meteor.Error(500, 'Error: Price is not a number', 'Price is not a number');
            if (itemUpdate.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Items.update({_id: itemUpdate._id},itemUpdate);
        }
    },
    'CartAll.remove'() {
        if (this.userId){
            Cart.remove({});
        }
    },
});

