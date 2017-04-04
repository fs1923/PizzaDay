import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Coupons = new Mongo.Collection('Coupons');

if (Meteor.isServer) {
    Meteor.publish('coupons', function couponsPublication() {
        return Coupons.find();
    });
}