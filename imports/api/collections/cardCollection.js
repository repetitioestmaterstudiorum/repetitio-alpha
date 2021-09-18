import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

// ------------

export const CardCollection = new Mongo.Collection('cards')

CardCollection.before.insert(function (userId, doc) {
	doc.createdAt = new Date()
	doc.interval = doc.interval || 0
	doc.repetition = doc.repetition || 0
	doc.efactor = doc.efactor || 2.5
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
