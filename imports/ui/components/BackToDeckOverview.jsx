import React from 'react'
import { Link } from 'react-router-dom'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const BackToDeckOverview = () => (
	<div style={{ display: 'flex', justifyContent: 'center' }}>
		<Link to='/deck-overview'>
			<button style={C.styles.uiButton}>&#128281; Deck overview</button>
		</Link>
	</div>
)
