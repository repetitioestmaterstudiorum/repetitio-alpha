import React, { useState } from 'react'

import { DeckCollection } from '../../api/collections/deckCollection.js'

// ------------

export const DeckForm = () => {
	const [title, setTitle] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!title) return

		DeckCollection.insert({
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

			<button type='submit'>&#10133; Add Deck</button>
		</form>
	)
}
