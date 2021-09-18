// import { Meteor } from 'meteor/meteor'

import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

// Meteor.methods({})

export function deleteDecksCards(deckId) {
	if (!deckId) throw new Meteor.Error('No deckId to delete cards of.')

	CardCollection.update({ deckId }, { $set: { deleted: true } }, { multi: true })
}
