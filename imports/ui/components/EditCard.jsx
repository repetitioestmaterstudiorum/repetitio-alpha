import React, { useState, createRef } from 'react'
import Swal from 'sweetalert2'

import { C } from '/imports/startup/client/clientConstants.js'

// ------------

export const EditCard = () => {
	const [front, setFront] = useState('')
	const [back, setBack] = useState('')

	const frontInput = createRef()

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
	}

	return (
		<>
			<div>
				<details>
					<summary onClick={() => setTimeout(() => frontInput.current.focus())}>
						Edit Card in deck
					</summary>
					<form onSubmit={handleSubmit} style={C.styles.uiForm}>
						<input
							ref={frontInput}
							type='front'
							placeholder='Keyword(s) on the front'
							value={front}
							onChange={e => setFront(e.target.value)}
						/>

						<input
							type='back'
							placeholder='Keyword(s) on the back'
							value={back}
							onChange={e => setBack(e.target.value)}
						/>

						<button type='submit' style={C.styles.regularButton}>
							&#128269; Find Card
						</button>
					</form>
				</details>
			</div>
			{front || back ? (
				<div>
					<p>{front}</p>
					<p>{back}</p>
				</div>
			) : null}
		</>
	)
}
