import { Accounts } from 'meteor/accounts-base'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { C } from '/imports/startup/server/serverConstants.js'

// ---

export const sampleData = {}

// --- default admin username and password
sampleData.meteor = {
	accounts: {
		defaultAdmin: 'admin',
		defaultPass: '1234',
	},
}

// --- decks with cards
sampleData.decks = [
	{
		title: 'Test deck',
		cards: [
			{ front: 'Hello front', back: 'Hello back' },
			{ front: 'Question', back: 'Answer' },
		],
	},
	{
		title: 'Another deck',
		cards: [
			{ front: '?', back: '!' },
			{ front: 'Hi!', back: 'Hola!' },
		],
	},
	{ title: 'New skill', cards: [{ front: 'Front', back: 'Back' }] },
]

// --- functions
export function insertSampleDecks(decks) {
	const user = Accounts.findUserByUsername(C.meteor.accounts.admin)

	decks.forEach(deck => {
		const deckId = DeckCollection.insert({ title: deck.title, userId: user._id })
		deck.cards.forEach(card => CardCollection.insert({ ...card, deckId, userId: user._id }))
	})
}
