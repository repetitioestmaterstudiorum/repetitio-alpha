import { Meteor } from 'meteor/meteor'
import React, { useContext } from 'react'

import { Context } from '/imports/ui/DataState.jsx'
import { DeckRow } from '/imports/ui/components/DeckRow.jsx'
import { AddDeckForm } from '/imports/ui/components/AddDeckForm.jsx'
import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const DeckOverview = () => {
	const { decks, deckCount } = useContext(Context)

	return (
		<div>
			<div>
				<h2>{deckCount ? `Your Decks (${deckCount})` : 'You have no Decks :('}</h2>
				<hr style={C.styles.hr} />

				{decks.map(deck => (
					<DeckRow
						key={deck._id}
						deck={deck}
						onDeleteClick={() => Meteor.call('deleteDeck', deck._id)}
					/>
				))}
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<details style={{ margin: '0.5rem 0' }}>
					<summary>Add a new Deck</summary>
					<AddDeckForm />
				</details>
			</div>
		</div>
	)
}
