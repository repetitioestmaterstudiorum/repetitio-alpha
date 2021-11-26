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

		const sampleDeckIds = DeckCollection.find({ isSampleDeck: true }).map(d => d._id)
		DeckCollection.remove({ _id: { $in: sampleDeckIds } })
		CardCollection.remove({ deckId: { $in: sampleDeckIds } })

		insertSampleDecks(sampleData.decks)
	},
})
