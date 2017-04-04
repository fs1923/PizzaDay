import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Shopping = new Mongo.Collection('Shopping');

if (Meteor.isServer) {
	Meteor.publish('shopping', function shoppingPubication() {
		return Shopping.find();
	});
}
