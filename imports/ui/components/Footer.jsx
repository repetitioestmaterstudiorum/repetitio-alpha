import { Meteor } from 'meteor/meteor'
import React from 'react'

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
			</div>
			{Meteor.isDevelopment && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button style={C.styles.uiButton} onClick={() => Meteor.call('resetDb')}>
						&#128163; RESET DB
					</button>
				</div>
			)}
		</>
	)
}
