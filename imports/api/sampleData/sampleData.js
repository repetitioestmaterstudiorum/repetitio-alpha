// ------------

export const sampleData = {}

// --- default admin account
sampleData.meteor = {
	accounts: {
		defaultAdmin: 'admin',
		defaultPass: '1234',
	},
}

// --- decks and cards
const deck1Id = new Mongo.ObjectID()
const deck2Id = new Mongo.ObjectID()
const deck3Id = new Mongo.ObjectID()

sampleData.decks = [
	{ title: 'Test deck', _id: deck1Id },
	{ title: 'Another deck', _id: deck2Id },
	{ title: 'New language', _id: deck3Id },
]

sampleData.cards = [
	{ deckId: deck1Id, front: 'Hello front', back: 'Hello back' },
	{ deckId: deck1Id, front: 'Question', back: 'Answer' },
	{ deckId: deck2Id, front: '?', back: '!' },
	{ deckId: deck2Id, front: 'Hi!', back: 'Hola!' },
	{ deckId: deck3Id, front: 'Front', back: 'Back' },
]
