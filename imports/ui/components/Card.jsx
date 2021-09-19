import React, { useContext, useEffect, useState } from 'react'

import { Context } from '/imports/ui/DataState.jsx'

// ------------

export const Card = () => {
	const [showSolution, setShowSolution] = useState(false)
	const [revealedAtLeastOnce, setRevealedAtLeastOnce] = useState(false)

	const { nextCardDue, updateCardAndPickNext } = useContext(Context)

	const keyDownHandler = e => {
		setRevealedAtLeastOnce(true)
		switch (e.keyCode) {
			case 32:
				flipCard()
				break
			case 48:
				updateCardAndPickNext(nextCardDue, 0)
				break
			case 49:
				updateCardAndPickNext(nextCardDue, 1)
				break
			case 50:
				updateCardAndPickNext(nextCardDue, 2)
				break
			case 51:
				updateCardAndPickNext(nextCardDue, 3)
				break
			case 52:
				updateCardAndPickNext(nextCardDue, 4)
				break
			case 53:
				updateCardAndPickNext(nextCardDue, 5)
				break
			default:
				break
		}
	}

	function flipCard() {
		setShowSolution(!showSolution)
		setRevealedAtLeastOnce(true)
	}

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler)

		return () => {
			document.removeEventListener('keydown', keyDownHandler)
		}
	}, [showSolution])

	useEffect(() => {
		setShowSolution(false)
		setRevealedAtLeastOnce(false)
	}, [nextCardDue?._id, updateCardAndPickNext])

	return (
		<div style={cardDiv}>
			<div style={cardContentDiv} onClick={() => flipCard()}>
				<p style={{ fontSize: '2rem' }} unselectable='on'>
					{showSolution ? nextCardDue.back : nextCardDue.front}
				</p>
			</div>
			<div style={gradeButtonsDiv}>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#3a0101' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 0)}
				>
					0
				</button>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#630202' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 1)}
				>
					1
				</button>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#633802' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 2)}
				>
					2
				</button>
				<p style={{ margin: '0 0.4rem', color: 'grey' }}>{'|'}</p>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#635802' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 3)}
				>
					3
				</button>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#3d6302' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 4)}
				>
					4
				</button>
				<button
					disabled={!revealedAtLeastOnce}
					style={{ ...gradeButtons, backgroundColor: '#026916' }}
					onClick={() => updateCardAndPickNext(nextCardDue, 5)}
				>
					5
				</button>
			</div>
		</div>
	)
}

const cardDiv = {
	display: 'flex',
	flexWrap: 'wrap',
}

const cardContentDiv = {
	width: '100%',
	minHeight: '200px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

const gradeButtonsDiv = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '0.5rem 0 0',
}

const gradeButtons = {
	color: '#fff',
	margin: '0 0.3rem 0.3rem',
	padding: '0.3rem 1rem',
	height: '2.6rem',
	width: '2.8rem',
}
