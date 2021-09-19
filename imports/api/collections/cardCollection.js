import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import { C } from '/imports/startup/globalConstants'

// ------------

export const CardCollection = new Mongo.Collection('cards')

CardCollection.before.insert(function (userId, doc) {
	doc.createdAt = new Date()
	doc.interval = doc.interval || C.sm2.initInterval
	doc.repetition = doc.repetition || C.sm2.initRepetition
	doc.efactor = doc.efactor || C.sm2.initEfactor
	doc.dueDate = doc.dueDate || new Date()
})

CardCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {}
	modifier.$set.updatedAt = new Date()
})

if (Meteor.isClient) {
	CardCollection.before.find(function (userId, selector, options) {
		selector.userId = selector.userId || Meteor.userId()
	})
}
