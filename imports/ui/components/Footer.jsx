import { Meteor } from 'meteor/meteor'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const Footer = () => {
	const handleLogout = e => {
		e.preventDefault()

		Meteor.logout()
	}

	return (
		<>
			<hr style={C.styles.hr} />

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button style={C.styles.regularButton} onClick={handleLogout}>
					{/* lock icon */}
					&#128274; Log out
				</button>
				{/* if not home, show a link back to it */}
				{useLocation().pathname.match(/deck/) && (
					<Link to='/'>
						{/* home icon */}
						<button style={C.styles.regularButton}>&#127968; Deck overview</button>
					</Link>
				)}
			</div>
		</>
	)
}
