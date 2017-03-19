import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Cart = new Mongo.Collection('Cart');

if (Meteor.isServer) {
    Meteor.publish('cart', function cartPublication(){
        return Cart.find();
    });
}
