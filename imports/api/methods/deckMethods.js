import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { deleteDecksCards } from '/imports/api/methods/cardMethods.js'

// ------------

Meteor.methods({
	deleteDeck(deckId) {
		check(deckId, String)
		if (!this.userId) throw new Meteor.Error('Not authorized.')
		DeckCollection.update({ _id: deckId }, { $set: { deleted: true } })
		deleteDecksCards(deckId)
	},
})
