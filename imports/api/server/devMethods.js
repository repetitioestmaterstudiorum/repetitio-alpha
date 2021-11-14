import { Meteor } from 'meteor/meteor'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { sampleData, insertSampleDecks } from '/imports/api/server/sampleData.js'
import { throwIfNotLoggedIn } from '/imports/api/helpers/methodHelpers.js'

// ---

Meteor.methods({
	resetDb() {
		if (!Meteor.isDevelopment) throw new Meteor.Error('Not in development mode.')
		throwIfNotLoggedIn(this.userId)

		DeckCollection.remove({})
		CardCollection.remove({})

		insertSampleDecks(sampleData.decks)
	},
})
