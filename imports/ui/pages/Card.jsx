import React from 'react'
import { Link } from 'react-router-dom'

// ------------

export const Card = () => {
	return (
		<>
			<p>card</p>

			<Link to='/deck-overview'>
				<button>&#9749; Deck overview</button>
			</Link>
		</>
	)
}
