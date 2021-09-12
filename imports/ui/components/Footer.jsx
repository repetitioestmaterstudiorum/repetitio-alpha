import { Meteor } from 'meteor/meteor'
import React from 'react'

// ------------

export const Footer = () => {
	const handleLogout = e => {
		e.preventDefault()

		Meteor.logout()
	}

	return (
		<>
			<hr style={{ margin: '1rem 5rem' }} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button style={{}} onClick={handleLogout}>
					&#128274; lock
				</button>
			</div>
		</>
	)
}
