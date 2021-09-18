import { Meteor } from 'meteor/meteor'
import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { DeckRow } from '../components/DeckRow.jsx'
import { DeckForm } from '/imports/ui/components/AddDeckForm.jsx'
import { Header } from '/imports/ui/components/Header.jsx'
import { Footer } from '/imports/ui/components/Footer.jsx'

// ------------

export const DeckOverview = () => {
	const { decks, decksCount } = useTracker(() => ({
		decks: DeckCollection.find({ deleted: { $ne: true } }, { sort: { createdAt: -1 } }).fetch(),
		decksCount: DeckCollection.find({ deleted: { $ne: true } }).count(),
	}))

	return (
		<div>
			<Header />
			<div>
				<h2>Your Decks ({decksCount})</h2>

				{decks.map(deck => (
					<DeckRow
						key={deck._id}
						deck={deck}
						onDeleteClick={() => Meteor.call('deleteDeck', deck._id)}
					/>
				))}
			</div>

			<div style={{ margin: '2rem 0 1.5rem' }}>
				<details>
					<summary>Add a new Deck</summary>
					<DeckForm />
				</details>
			</div>
			<Footer />
		</div>
	)
}
