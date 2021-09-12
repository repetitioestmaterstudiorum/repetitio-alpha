import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { DeckCollection } from '../imports/api/collections/deckCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'
import { sampleData } from '/imports/api/sampleData/sampleData.js'
import { CardCollection } from '../imports/api/collections/cardCollection'

// ------------

function insertSampleData(sD) {
	sD.decks.forEach(d => {
		DeckCollection.insert(Object.assign({}, d, { createdAt: new Date() }))
	})

	sD.cards.forEach(c => {
		CardCollection.insert(Object.assign({}, c, { createdAt: new Date() }))
	})
}

Meteor.startup(() => {
	if (!Accounts.findUserByUsername(C.meteor.accounts.admin)) {
		Accounts.createUser({
			username: C.meteor.accounts.admin,
			password: C.meteor.accounts.pass,
		})
	}

	if (DeckCollection.find().count() === 0) {
		insertSampleData(sampleData)
	}
})
