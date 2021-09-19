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
				<button style={C.styles.uiButton} onClick={handleLogout}>
					&#128274; lock
				</button>
				{/* if not home, show a link back to it */}
				{useLocation().pathname.match(/deck/) && (
					<Link to='/'>
						<button style={C.styles.uiButton}>&#128281; Deck overview</button>
					</Link>
				)}
			</div>
		</>
	)
}
