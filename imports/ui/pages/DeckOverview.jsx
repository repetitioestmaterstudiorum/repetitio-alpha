import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { Deck } from '/imports/ui/components/Deck.jsx'
import { DeckForm } from '/imports/ui/components/AddDeckForm.jsx'

// ------------

export const DeckOverview = () => {
	const decks = useTracker(() =>
		DeckCollection.find(decksBasicFilter, { sort: { createdAt: -1 } }).fetch()
	)

	const decksCount = useTracker(() => DeckCollection.find(decksBasicFilter).count())

	return (
		<div>
			{/* coffee icon */}
			<h1>&#9749; repetitio</h1>
			<h2>Existing Decks ({decksCount}):</h2>

			{decks.map(deck => (
				<Deck key={deck._id} deck={deck} onDeleteClick={deleteDeck} />
			))}

			<details>
				<summary>Add a new Deck</summary>
				<DeckForm />
			</details>
		</div>
	)
}

const decksBasicFilter = { deleted: { $ne: true } }

function deleteDeck(deck) {
	DeckCollection.update({ _id: deck._id }, { $set: { deleted: true } })

	deleteDecksCards(deck._id)
}

function deleteDecksCards(deckId) {
	CardCollection.update({ deckId }, { $set: { deckDeleted: true } })
}
