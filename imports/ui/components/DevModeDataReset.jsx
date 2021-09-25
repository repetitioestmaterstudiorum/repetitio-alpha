import React from 'react'
import { useHistory } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const DevModeDataReset = () => {
	const history = useHistory()

	return Meteor.isDevelopment ? (
		<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
			<button
				style={C.styles.regularButton}
				onClick={() => {
					Meteor.call('resetDb')
					history.push('/')
				}}
			>
				{/* sirene icon */}
				&#128680; DB reset & reload home
			</button>
		</div>
	) : (
		<></>
	)
}
