import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { DecksCollection } from '/imports/api/decksCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'

// ------------

function insertDeck(title) {
	DecksCollection.insert({ title, createdAt: new Date() })
}

Meteor.startup(() => {
	if (DecksCollection.find().count() === 0) {
		;['First Deck', 'Second Deck', 'Third Deck'].forEach(insertDeck)
	}

	if (!Accounts.findUserByUsername(C.meteor.accounts.defaultAdmin)) {
		Accounts.createUser({
			username: C.meteor.accounts.defaultAdmin,
			password: C.meteor.accounts.defaultPass,
		})
	}
})
