// import { Meteor } from 'meteor/meteor'

import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

// Meteor.methods({})

export function deleteDecksCards(deckId) {
	CardCollection.update({ deckId }, { $set: { deleted: true } }, { multi: true })
}
