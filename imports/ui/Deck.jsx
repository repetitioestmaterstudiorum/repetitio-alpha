import React from 'react'

import { CardsCollection } from '../api/cardsCollection.js'

// ------------

export const Deck = ({ deck, onDeleteClick }) => {
	const cardsCount = CardsCollection.find(
		Object.assign({}, cardsBasicFilter, { deckId: deck._id })
	).count()

	return (
		<li style={{ listStyle: 'none', lineHeight: '3rem' }}>
			<span>
				{deck.title} ({cardsCount})
			</span>
			<button style={actionButtonStyle} onClick={() => onOpenClick}>
				&#9654; practice
			</button>
			<button style={actionButtonStyle} onClick={() => onDeleteClick(deck)}>
				&#10005; delete
			</button>
		</li>
	)
}

const cardsBasicFilter = { deckDeleted: { $ne: true }, deleted: { $ne: true } }

const actionButtonStyle = {
	marginLeft: '0.5rem',
	marginRight: '0',
	marginBottom: '',
	padding: '0.3rem 0.6rem',
	borderRadius: '1rem',
}
