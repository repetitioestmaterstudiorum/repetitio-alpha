import { Meteor } from 'meteor/meteor'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

Meteor.publish('decks', function () {
	return DeckCollection.find({ userId: this.userId })
})

Meteor.publish('cards', function () {
	return CardCollection.find({ userId: this.userId })
})
