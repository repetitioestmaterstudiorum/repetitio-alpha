import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { DecksCollection } from '/imports/api/collections/decksCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'
import { sampleData } from '/imports/api/sampleData/sampleData.js'
import { CardsCollection } from '/imports/api/collections/cardsCollection'

// ------------

function insertSampleData(sD) {
	sD.decks.forEach(d => {
		DecksCollection.insert(Object.assign({}, d, { createdAt: new Date() }))
	})

	sD.cards.forEach(c => {
		CardsCollection.insert(Object.assign({}, c, { createdAt: new Date() }))
	})
}

Meteor.startup(() => {
	if (!Accounts.findUserByUsername(C.meteor.accounts.admin)) {
		Accounts.createUser({
			username: C.meteor.accounts.admin,
			password: C.meteor.accounts.pass,
		})
	}

	if (DecksCollection.find().count() === 0) {
		insertSampleData(sampleData)
	}
})
