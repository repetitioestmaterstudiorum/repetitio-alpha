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

	const { cardQueue, setCurrentDeckId, currentDeck, dueCardsInCurrentDeckCount, skipCard } =
		useContext(Context)

	useEffect(() => setCurrentDeckId(deckId), [deckId])

	const reviewDue = cardQueue[deckId] && !!cardQueue[deckId][0]?._id

	return currentDeck?._id ? (
		<div style={{ height: reviewDue ? '100%' : '90%' }}>
			<h2>
				Deck: {currentDeck?.title} ({dueCardsInCurrentDeckCount})
			</h2>
			<hr style={C.styles.hr} />

			{reviewDue ? (
				<>
					<Card />
					<button
						onClick={() => skipCard()}
						style={{
							...C.styles.roundButton,
							position: 'absolute',
							bottom: '10%',
							right: '6%',
							width: '80px',
						}}
					>
						&#9889;<i>skip</i>
					</button>
				</>
			) : (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '90%',
					}}
				>
					<p>&#128079; &#127881; All done for the moment!</p>
					<p>Go get some &#127867;</p>
				</div>
			)}
		</div>
	) : (
		<Loader />
	)
}
