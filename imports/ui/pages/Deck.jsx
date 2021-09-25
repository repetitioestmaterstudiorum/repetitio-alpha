import React, { useContext, useEffect } from 'react'

import { Context } from '/imports/ui/DataState.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { Card } from '/imports/ui/components/Card.jsx'
import { Loader } from '/imports/ui/components/Loader.jsx'

// ------------

export const Deck = ({ match }) => {
	const {
		params: { deckId },
	} = match

	const { currentDeck, openDeck, nextCardDue, dueInCurrentDeckCount } = useContext(Context)

	useEffect(() => openDeck(deckId), [deckId])

	return currentDeck?._id ? (
		<>
			<h2>
				Deck: {currentDeck?.title} ({dueInCurrentDeckCount})
			</h2>
			<hr style={C.styles.hr} />

			<div>
				{nextCardDue?._id ? (
					<Card />
				) : (
					<div style={{ textAlign: 'center' }}>
						<p>&#128079; &#127881; All done for the moment!</p>
						<p>Go get some &#127867;</p>
					</div>
				)}
			</div>
		</>
	) : (
		<Loader />
	)
}
