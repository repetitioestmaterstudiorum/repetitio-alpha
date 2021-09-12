import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { DecksCollection } from '../api/decksCollection.js'
import { CardsCollection } from '../api/decksCollection.js'
import { Deck } from './Deck.jsx'
import { DeckForm } from './DeckForm.jsx'

// ------------

export const App = () => {
	const decks = useTracker(() =>
		DecksCollection.find(decksBasicFilter, { sort: { createdAt: -1 } }).fetch()
	)

	const decksCount = useTracker(() => DecksCollection.find(decksBasicFilter)).count()

	return (
		<div>
			<h1>&#9749; repetitio</h1>
			<h2>Existing Decks ({decksCount}):</h2>

			{decks.map(deck => (
				<Deck key={deck._id} deck={deck} onDeleteClick={deleteDeck} />
			))}

			<h2>Add a new Deck:</h2>
			<DeckForm />
		</div>
	)
}

const decksBasicFilter = { deleted: { $ne: true } }

function deleteDeck(deck) {
	DecksCollection.update({ _id: deck._id }, { $set: { deleted: true } })

	deleteDecksCards(deck._id)
}

function deleteDecksCards(deckId) {
	CardsCollection.update({ deckId }, { $set: { deckDeleted: true } })
}
