import React from 'react'
import { Link } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const CardRow = ({ card }) => {
	return (
		<div style={{ display: 'flex', margin: '1.5rem 0' }}>
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					marginRight: '1rem',
					justifyContent: 'center',
				}}
			>
				<span>
					<strong>front</strong>: {card.front} <br />
					<strong>back</strong>: {card.back}
				</span>
			</div>
			<div>
				{/* writing hand icon */}
				<Link to={`/edit-card/${card._id}`}>
					<button style={C.styles.roundButton}>&#9997;</button>
				</Link>
			</div>
		</div>
	)
}
