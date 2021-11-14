import React, { useState, createRef, useContext } from 'react'
import Swal from 'sweetalert2'

import { Context } from '/imports/ui/DataState.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { CardRow } from '/imports/ui/components/CardRow.jsx'

// ---

export const FindCard = () => {
	const [front, setFront] = useState('')
	const [back, setBack] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const { findCardsInCurrentDeck } = useContext(Context)

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

		setSearchResults(findCardsInCurrentDeck({ frontKeywords: front, backKeywords: back }))
	}

	return (
		<div>
			<details>
				<summary onClick={() => setTimeout(() => frontInput.current.focus())}>
					Edit Card in deck
				</summary>
				<form
					onSubmit={handleSubmit}
					style={{
						...C.styles.uiForm,
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
					}}>
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
				<hr style={C.styles.hr} />

				{searchResults.length > 0 ? (
					<div>
						{searchResults.map(card => (
							<CardRow key={card._id} card={card} />
						))}
					</div>
				) : (
					<span style={{ marginTop: '1rem' }}>Nothing found :(</span>
				)}
			</details>
		</div>
	)
}
