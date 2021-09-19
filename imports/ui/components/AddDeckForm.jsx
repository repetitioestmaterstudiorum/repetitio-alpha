import React, { useState } from 'react'
import Swal from 'sweetalert2'

// ------------

export const AddDeckForm = () => {
	const [title, setTitle] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!title) {
			return Swal.fire({
				title: 'Could not add deck:',
				text: 'Missing title!',
				icon: 'error',
				confirmButtonText: 'Retry',
			})
		}

		Meteor.call('addDeck', title)

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
