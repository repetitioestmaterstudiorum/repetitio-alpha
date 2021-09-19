import React, { useContext, useEffect } from 'react'

import { Context } from '/imports/ui/DataState.jsx'
import { AddCardForm } from '/imports/ui/components/AddCardForm.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { Loader } from '/imports/ui/components/Loader.jsx'
import { EditCard } from '/imports/ui/components/EditCard.jsx'

// ------------

export const EditDeck = ({ match }) => {
	const {
		params: { deckId },
	} = match

	const { currentDeck, openDeck, cardsInCurrentDeckCount } = useContext(Context)

	useEffect(() => openDeck(deckId), [deckId])

	return currentDeck?._id ? (
		<>
			<h2>Deck: {currentDeck?.title}</h2>
			<hr style={C.styles.hr} />

			<p>Total cards in deck: {cardsInCurrentDeckCount}</p>

			<details style={{ margin: '0.5rem 0' }}>
				<summary>Add a new Card</summary>
				<AddCardForm deckId={deckId} />
			</details>

			<details style={{ margin: '0.5rem 0' }}>
				<summary>Edit Card in deck</summary>
				<EditCard />
			</details>
		</>
	) : (
		<Loader />
	)
}
