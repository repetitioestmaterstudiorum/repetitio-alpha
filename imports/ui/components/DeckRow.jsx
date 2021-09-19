import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

export const DeckRow = ({ deck, onDeleteClick }) => {
	const cardCount = CardCollection.find({
		deckId: deck._id,
		dueDate: { $lte: new Date() },
	}).count()
	const hasCardsToLearn = !!cardCount

	return (
		<div style={{ display: 'flex', margin: '1.5rem 0' }}>
			<div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: '1rem' }}>
				<span style={hasCardsToLearn ? deckHighlighted : deckNotHighlighted}>
					{deck.title} ({cardCount})
				</span>
			</div>
			<div>
				{/* practice / play icon*/}
				<Link to={`/deck/${deck._id}`}>
					<button style={actionButton}>&#9654;</button>{' '}
				</Link>
				{/* edit icon*/}
				<Link to={`/edit-deck/${deck._id}`}>
					<button style={actionButton}>&#9997;</button>
				</Link>
				{/* delete icon*/}
				<button style={actionButton} onClick={() => onDeleteClick(deck)}>
					&#10007;
				</button>
			</div>
		</div>
	)
}

const actionButton = {
	margin: '0 0 0 0.4rem',
	padding: '0.3rem 0.6rem',
	height: '2.4rem',
	width: '2.6rem',
	borderRadius: '2rem',
}

const deckHighlighted = {
	fontWeight: 200,
}
const deckNotHighlighted = {
	fontWeight: 100,
	color: 'grey',
}
