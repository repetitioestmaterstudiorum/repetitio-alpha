import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { CardCollection } from '../../api/collections/cardCollection.js'
import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const Deck = ({ deck, onDeleteClick }) => {
	const cardsCount = useTracker(() =>
		CardCollection.find(Object.assign({}, cardsBasicFilter, { deckId: deck._id })).count()
	)

	return (
		<div style={{ display: 'flex', marginBottom: '1rem' }}>
			{/* <div style={{ width: '45vw' }}> */}
			<div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: '1rem' }}>
				{deck.title} ({cardsCount})
			</div>
			<div>
				{/* practice / play icon*/}
				<button style={C.styles.actionButton} onClick={() => onOpenClick}>
					&#9654;
				</button>
				{/* edit icon*/}
				<button style={C.styles.actionButton}>&#9997;</button>
				{/* delete icon*/}
				<button style={C.styles.actionButton} onClick={() => onDeleteClick(deck)}>
					&#10007;
				</button>
			</div>
		</div>
	)
}

const cardsBasicFilter = { deckDeleted: { $ne: true }, deleted: { $ne: true } }
