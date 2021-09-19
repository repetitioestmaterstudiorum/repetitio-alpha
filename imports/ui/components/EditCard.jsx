import React, { useState } from 'react'
import Swal from 'sweetalert2'

// ------------

export const EditCard = () => {
	const [front, setFront] = useState('')
	const [back, setBack] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!front && !back) {
			return Swal.fire({
				title: 'Could not find card:',
				text: 'Enter at least one field.',
				icon: 'error',
				confirmButtonText: 'Retry',
			})
		}

		console.log(front, back)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='front'
					placeholder='Search the front'
					value={front}
					onChange={e => setFront(e.target.value)}
				/>

				<input
					type='back'
					placeholder='Search the back'
					value={back}
					onChange={e => setBack(e.target.value)}
				/>

				<button type='submit'>&#128269; Find Card</button>
			</form>

			<p>{front}</p>
			<p>{back}</p>
		</>
	)
}
