import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

export const DeckRow = ({ deck, onDeleteClick }) => {
	const cardsCount = useTracker(() =>
		CardCollection.find({ deleted: { $ne: true }, deckId: deck._id }).count()
	)

	return (
		<div style={{ display: 'flex', marginBottom: '1rem' }}>
			{/* <div style={{ width: '45vw' }}> */}
			<div style={{ display: 'flex', flex: 1, alignItems: 'center', marginRight: '1rem' }}>
				{deck.title} ({cardsCount})
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
