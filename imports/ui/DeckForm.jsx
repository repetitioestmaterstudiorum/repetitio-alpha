import React, { useState } from 'react'

import { DecksCollection } from '../api/collections/decksCollection.js'

// ------------

export const DeckForm = () => {
	const [title, setTitle] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!title) return

		DecksCollection.insert({
			title: title.trim(),
			createdAt: new Date(),
		})

		setTitle('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='title'
				placeholder='Title of your new deck'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>

			<button type='submit'>Add Deck</button>
		</form>
	)
}
