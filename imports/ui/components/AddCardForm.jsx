import React, { useState } from 'react'
import Swal from 'sweetalert2'

// ------------

export const AddCardForm = ({ deckId }) => {
	const [front, setFront] = useState('')
	const [back, setBack] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!front || !back) {
			return Swal.fire({
				title: 'Could not add card:',
				text: 'Enter all fields.',
				icon: 'error',
				confirmButtonText: 'Retry',
			})
		}

		Meteor.call('addCard', front, back, deckId)

		setFront('')
		setBack('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='front'
				placeholder='Front of your new deck'
				value={front}
				onChange={e => setFront(e.target.value)}
			/>

			<input
				type='back'
				placeholder='Back of your new deck'
				value={back}
				onChange={e => setBack(e.target.value)}
			/>

			<button type='submit'>&#10133; Add Card</button>
		</form>
	)
}
