import { Accounts } from 'meteor/accounts-base'
import omit from 'lodash.omit'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'

// ---

export const sampleData = {}

// default admin username and password
sampleData.meteor = {
	accounts: {
		defaultAdmin: 'admin',
		defaultPass: '1234',
	},
}

// decks with cards
sampleData.decks = [
	{
		title: 'Test deck',
		cards: [
			{ front: 'Hello front', back: 'Hello back' },
			{ front: 'Question', back: 'Answer' },
		],
		isSampleDeck: true,
	},
	{
		title: 'Another deck',
		cards: [
			{ front: '?', back: '!' },
			{ front: 'Hi!', back: 'Hola!' },
		],
		isSampleDeck: true,
	},
	{ title: 'New skill', cards: [{ front: 'Front', back: 'Back' }], isSampleDeck: true },
]

export function insertSampleDecks(decks) {
	const user = Accounts.findUserByUsername(C.meteor.accounts.admin)

	decks.forEach(deck => {
		const deckId = DeckCollection.insert({ userId: user._id, ...omit(deck) })
		deck.cards.forEach(card => CardCollection.insert({ ...card, deckId, userId: user._id }))
	})
}
