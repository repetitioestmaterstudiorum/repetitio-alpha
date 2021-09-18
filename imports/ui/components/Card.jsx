import React, { useEffect, useState } from 'react'

// ------------

export const Card = ({ card, updateCardInDb }) => {
	if (!card?._id) return <>no id!!</>

	const [showSolution, setShowSolution] = useState(false)

	useEffect(() => {
		setShowSolution(false)
	}, [card._id])

	console.log('card :>> ', card)

	return (
		// <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
		<div>
			<div>
				<p style={{ fontSize: '2rem' }} onClick={() => setShowSolution(true)}>
					{showSolution ? card.back : card.front}
				</p>
			</div>
			<div style={gradeButtonsDiv}>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 0)}>
					0
				</button>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 1)}>
					1
				</button>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 2)}>
					2
				</button>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 3)}>
					3
				</button>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 4)}>
					4
				</button>
				<button style={gradeButton} onClick={() => updateCardInDb(card, 5)}>
					5
				</button>
			</div>
		</div>
	)
}

const gradeButtonsDiv = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	padding: '2rem 0',
}

const gradeButton = {
	margin: '0 0.4rem',
	padding: '0.3rem 1rem',
	height: '2.4rem',
	width: '2.6rem',
}
