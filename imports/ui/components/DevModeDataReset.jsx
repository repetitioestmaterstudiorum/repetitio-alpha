import React from 'react'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const DevModeDataReset = () => {
	return Meteor.isDevelopment ? (
		<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
			<button
				style={C.styles.regularButton}
				onClick={() => {
					Meteor.call('resetDb')
					window.location = '/'
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
