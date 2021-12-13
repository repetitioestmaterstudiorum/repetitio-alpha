import { Meteor } from 'meteor/meteor'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

import { C } from '/imports/startup/server/serverConstants.js'

// ---

Meteor.publish('decks', function () {
	return DeckCollection.find({ deleted: { $ne: true }, userId: this.userId })
})

Meteor.publish('cardsQueue', function () {
	return CardCollection.find(
		{ deleted: { $ne: true }, userId: this.userId, dueDate: { $lte: new Date() } },
		{ sort: { efactor: 1, dueDate: 1 }, limit: C.globalSettings.queueLimit }
	)
})

Meteor.publish('cards', function () {
	return CardCollection.find({ deleted: { $ne: true }, userId: this.userId })
})
