import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Items } from '../api/items.js';
import { UserList } from './userList.js';
import { Cart } from './cart.js';
import { Shopping } from './shopping.js';
import { Coupons} from './coupons';

export const Groups = new Mongo.Collection('Groups');

if (Meteor.isServer) {
    Meteor.publish('groups', function groupsPublication() {
        return Groups.find();
    });
    Meteor.publish('users', function usersPublication() {
        return Meteor.users.find({},{fields:{'username':1, 'emails':1}});
    });
    Slingshot.createDirective("myFileUploads", Slingshot.S3Storage.TempCredentials, {
        bucket: "pizzaday-photos",

        acl: "public-read",

        temporaryCredentials: Meteor.wrapAsync(function(expire, callback) {
            var duration = Math.max(Math.round(expire / 1000), 900);

            STS.getSessionToken({
                DurationSeconds: duration,
            }, function(error, result) {
                callback(error, result && result.Credentials);
            });
        }),

        authorize: function () {
            // //Deny uploads if user is not logged in.
            // if (!this.userId) {
            //     var message = "Please login before posting files";
            //     throw new Meteor.Error("Login Required", message);
            // }

            return true;
        },

        key: function (file) {
            //Store file into a directory by the user's username.
            // var user = Meteor.users.findOne(this.userId);
            // return user.username + "/" + file.name;
            return file.name;
        }
    });
}

Meteor.methods({
    'Groups.remove'(groupId) {
        if (Meteor.userId() == Groups.findOne({_id: groupId}).mainUser) {
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
        if (Meteor.userId() == Groups.findOne({_id: groupUpdate._id}).mainUser) {
            if (groupUpdate.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Groups.update({_id:groupUpdate._id},groupUpdate);
        }
    },
    'UserList.insert'(userListInsert) {
        if (this.userId) {
            UserList.insert(userListInsert);
        }
    },
    'UserList.remove'(requestId){
        if (this.userId) {
            UserList.remove({_id: requestId});
        }
    },
    'UserList.update'(userListUpdate){
        if (Meteor.userId() == Groups.findOne({_id: userListUpdate.groupId}).mainUser) {
            UserList.update({_id: userListUpdate._id}, userListUpdate);
        }
    },
    'Items.insert'(itemInsert) {
        if (Meteor.userId() == Groups.findOne({_id: itemInsert.group}).mainUser) {
            if (isNaN(itemInsert.prise) || itemInsert.prise=='')
                throw new Meteor.Error(500, 'Error: Price is not a number', 'Price is not a number');
            if (itemInsert.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Items.insert(itemInsert);
        }
    },
    'Cart.insert'(cartInsert) {
        if(UserList.findOne({UserId: this.userId,status: "Follow"})) {
            tmpcart = Cart.findOne({UserId: cartInsert.UserId, GroupId: cartInsert.GroupId, ItemId: cartInsert.ItemId});
            if (tmpcart) {
                tmpcart.Quantity += 1;
                Cart.update({_id: tmpcart._id}, tmpcart);
            }
            else {
                Cart.insert(cartInsert);
            }
        }
    },
    'Cart.remove'(CartId){
        if(UserList.findOne({UserId: this.userId,status: "Follow"})) {
            Cart.remove({_id: CartId});
        }
    },
    'Item.remove'(itemId) {
        if (this.userId){
            Cart.remove({ItemId:itemId});
            Items.remove({_id: itemId});
        }
    },
    'Item.update'(itemUpdate) {
        if (Meteor.userId() == Groups.findOne({_id: itemUpdate.group}).mainUser) {
            if (isNaN(itemUpdate.prise) || itemUpdate.prise=='')
                throw new Meteor.Error(500, 'Error: Price is not a number', 'Price is not a number');
            if (itemUpdate.name.length<3)
                throw new Meteor.Error(500, 'Error: The name must consist of more than three characters', 'The name must consist of more than three characters');
            Items.update({_id: itemUpdate._id},itemUpdate);
        }
    },
    'CartAll.remove'(userId) {
        if (this.userId){
            Cart.remove({UserId: userId});
        }
    },
    'Insert.Shopping'(shopping) {
        if (this.userId) {
            Shopping.insert(shopping);
        }
    },
    'Coupons.insert'(Insert) {
        if (Meteor.userId() == Groups.findOne({_id: Insert.groupId}).mainUser) {
            Coupons.insert(Insert);
        }
    },
    'Coupons.remove'(Insert) {
        if (Meteor.userId() == Groups.findOne({_id: Insert.groupId}).mainUser) {
            Coupons.remove(Insert);
        }
    },
});

