import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { CardsCollection } from '../api/collections/cardsCollection.js'

// ------------

export const Deck = ({ deck, onDeleteClick }) => {
	const cardsCount = useTracker(() =>
		CardsCollection.find(Object.assign({}, cardsBasicFilter, { deckId: deck._id })).count()
	)

	return (
		<div style={{ display: 'flex', marginBottom: '1rem' }}>
			{/* <div style={{ width: '45vw' }}> */}
			<div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: '1rem' }}>
				{deck.title} ({cardsCount})
			</div>
			<div>
				{/* practice / play icon*/}
				<button style={actionButtonStyle} onClick={() => onOpenClick}>
					&#9654;
				</button>
				{/* edit icon*/}
				<button style={actionButtonStyle}>&#9997;</button>
				{/* delete icon*/}
				<button style={actionButtonStyle} onClick={() => onDeleteClick(deck)}>
					&#10007;
				</button>
			</div>
		</div>
	)
}

const cardsBasicFilter = { deckDeleted: { $ne: true }, deleted: { $ne: true } }

const actionButtonStyle = {
	margin: '0 0 0 0.4rem',
	padding: '0.3rem 0.6rem',
	height: '2.4rem',
	width: '2.6rem',
	borderRadius: '2rem',
}
