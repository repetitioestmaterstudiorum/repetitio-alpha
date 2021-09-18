import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

// ------------

export const DeckCollection = new Mongo.Collection('decks')

if (Meteor.isServer) {
	Meteor.publish('decks', function () {
		return DeckCollection.find({ userId: this.userId })
	})
}

DeckCollection.before.insert(function (userId, doc) {
	doc.createdAt = new Date()
})

DeckCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {}
	modifier.$set.updatedAt = new Date()
})

if (Meteor.isClient) {
	DeckCollection.before.find(function (userId, selector, options) {
		selector.userId = selector.userId || Meteor.userId()
	})
}
