import React, { useContext, useEffect, useState } from 'react'

import { Context } from '/imports/ui/DataState.jsx'

// ------------

// todo: high voltage sign button to pick another card? &#9889;

export const Card = () => {
	const { nextCardDue, updateCardAndPickNext, showBackSideFirst } = useContext(Context)

	const [showBackSide, setShowBackSide] = useState(showBackSideFirst)
	const [revealedAtLeastOnce, setRevealedAtLeastOnce] = useState(false)

	const keyDownHandler = e => {
		switch (e.keyCode) {
			case 32:
				setRevealedAtLeastOnce(true)
				flipCard()
				break
			case 48:
				updateCardAndPickNext(nextCardDue, 0)
				break
			case 192: // sign left of number 1 on querty keyboard shall behave like key 0 for UX
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
		setShowBackSide(!showBackSide)
		setRevealedAtLeastOnce(true)
	}

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler, false)

		return () => {
			document.removeEventListener('keydown', keyDownHandler, false)
		}
	}, [showBackSide])

	useEffect(() => {
		setShowBackSide(showBackSideFirst)
		setRevealedAtLeastOnce(false)
	}, [nextCardDue?._id, updateCardAndPickNext])

	return (
		<div style={cardDiv}>
			<div style={cardContentDiv} onClick={() => flipCard()}>
				<p style={{ fontSize: '2rem', whiteSpace: 'pre-wrap' }} unselectable='on'>
					{showBackSide ? nextCardDue.back : nextCardDue.front}
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
