import React, { useState, createRef } from 'react'
import Swal from 'sweetalert2'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const AddCardForm = ({ deckId }) => {
	const [front, setFront] = useState('')
	const [back, setBack] = useState('')

	const frontInput = createRef()

	const handleSubmit = e => {
		e.preventDefault()

		frontInput.current.focus()

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
		<div>
			<details>
				<summary onClick={() => setTimeout(() => frontInput.current.focus())}>
					Add a new Card
				</summary>
				<form onSubmit={handleSubmit} style={C.styles.uiForm}>
					<textarea
						ref={frontInput}
						type='front'
						placeholder='Front of your new card'
						value={front}
						onChange={e => setFront(e.target.value)}
						style={{ width: '95vw', maxWidth: '400px' }}
					/>

					<textarea
						type='back'
						placeholder='Back of your new card'
						value={back}
						onChange={e => setBack(e.target.value)}
					/>

					<button type='submit' style={C.styles.regularButton}>
						&#10133; Add Card
					</button>
				</form>
			</details>
		</div>
	)
}
