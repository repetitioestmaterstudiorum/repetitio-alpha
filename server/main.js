import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'
import { sampleData, insertSampleDecks } from '/imports/api/server/sampleData.js'

// publications
import '/imports/api/server/meteorPublications.js'

// method files
import '/imports/api/server/devMethods.js'
import '/imports/api/methods/deckMethods.js'
import '/imports/api/methods/cardMethods.js'

// ------------

Meteor.startup(() => {
	// --- insert sample data (user, decks)
	if (!Accounts.findUserByUsername(C.meteor.accounts.admin)) {
		Accounts.createUser({
			username: C.meteor.accounts.admin,
			password: C.meteor.accounts.pass,
		})
	}
	if (DeckCollection.find().count() === 0) {
		insertSampleDecks(sampleData.decks)
	}
})
