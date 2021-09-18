import { Meteor } from 'meteor/meteor'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { sampleData, insertSampleDecks } from '/imports/api/sampleData.js'

// ------------

Meteor.methods({
	resetDb() {
		if (!Meteor.isDevelopment) throw new Meteor.Error('Not in development mode.')
		if (!this.userId) throw new Meteor.Error('Not authorized.')

		DeckCollection.remove({})
		CardCollection.remove({})

		insertSampleDecks(sampleData.decks)
	},
})
