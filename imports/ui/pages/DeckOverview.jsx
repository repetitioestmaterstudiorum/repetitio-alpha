import React, { useContext } from 'react'

import { Context } from '/imports/ui/DataState.jsx'
import { DeckRow } from '/imports/ui/components/DeckRow.jsx'
import { AddDeckForm } from '/imports/ui/components/AddDeckForm.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { Loader } from '/imports/ui/components/Loader.jsx'

// ------------

export const DeckOverview = () => {
	const { isLoading, decks, decksCount } = useContext(Context)

	return isLoading ? (
		<Loader />
	) : (
		<div>
			<div>
				<h2>{decksCount ? `Your Decks (${decksCount})` : 'You have no Decks :('}</h2>
				<hr style={C.styles.hr} />

				{decks.map(deck => (
					<DeckRow key={deck._id} deck={deck} />
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
