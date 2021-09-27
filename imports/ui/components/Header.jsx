import React from 'react'
import { useLocation } from 'react-router-dom'

// ------------

export const Header = () => (
	<>
		{!useLocation().pathname.match(/\/deck\//) && (
			<h1>
				{/* coffee icon */}
				&#9749; repetitio
			</h1>
		)}
	</>
)
