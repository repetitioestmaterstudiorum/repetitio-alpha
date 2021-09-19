import { Meteor } from 'meteor/meteor'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

Meteor.publish('decks', function () {
	return DeckCollection.find({ deleted: { $ne: true }, userId: this.userId })
})

Meteor.publish('cards', function () {
	return CardCollection.find({ deleted: { $ne: true }, userId: this.userId })
})
