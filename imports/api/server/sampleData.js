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
			{ front: 'Bonjour', back: 'Guten Tag' },
			{ front: 'Hi!', back: 'Hola!' },
		],
		isSampleDeck: true,
	},
	{
		title: "Lot's of cards",
		cards: getSampleCards(1000),
		isSampleDeck: true,
	},
]

export function insertSampleDecks(decks) {
	const user = Accounts.findUserByUsername(C.meteor.accounts.admin)

	decks.forEach(deck => {
		const deckId = DeckCollection.insert({ userId: user._id, ...omit(deck) })
		deck.cards.forEach(card => CardCollection.insert({ ...card, deckId, userId: user._id }))
	})
}

function getSampleCards(howMany) {
	const sampleCards = []
	for (let i = 0; i < howMany; i++) {
		sampleCards.push({
			front: getRandomWord(Math.ceil(Math.random() * 10)),
			back: getRandomWord(Math.ceil(Math.random() * 10)),
		})
	}
	return sampleCards
}

function getRandomWord(howLong) {
	if (howLong < 1) return ''
	return getRandomChars(1).toUpperCase() + getRandomChars(howLong - 1)
}

function getRandomChars(howMany) {
	if (howMany < 1) return ''
	const alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
		'ä',
		'ö',
		'ü',
	]
	const letters = []
	for (let i = 0; i < howMany; i++) {
		letters.push(alphabet[Math.floor(Math.random() * 26)])
	}
	return letters.join('')
}
