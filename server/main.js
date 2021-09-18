import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'
import { sampleData, insertSampleDecks } from '../imports/api/sampleData.js'

// methods
import '/imports/api/methods/devMethods.js'
import '/imports/api/methods/deckMethods'
import '/imports/api/methods/cardMethods'

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
