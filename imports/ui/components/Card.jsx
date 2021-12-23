import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { Context } from '/imports/ui/DataState.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { Loader } from '/imports/ui/components/Loader.jsx'
import { Link } from 'react-router-dom'

// ---

export const Card = () => {
	const { isLoading, cardQueue, updateCardAndPickNext, currentDeck, skipCard } =
		useContext(Context)

	const [showBackSide, setShowBackSide] = useState(null)
	const [revealedAtLeastOnce, setRevealedAtLeastOnce] = useState(null)

	useEffect(() => {
		setShowBackSide(currentDeck?.showBackSideFirst)
		setRevealedAtLeastOnce(false)
	}, [updateCardAndPickNext])

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler, false)
		return () => {
			document.removeEventListener('keydown', keyDownHandler, false)
		}
	}, [showBackSide])

	const keyDownHandler = e => {
		if (!revealedAtLeastOnce && e.keyCode !== 32) return

		const buttonChoices = {
			32: () => flipCard(),
			48: () => callUpdateCardAndPickNext(0),
			192: () => callUpdateCardAndPickNext(0),
			49: () => callUpdateCardAndPickNext(1),
			50: () => callUpdateCardAndPickNext(2),
			51: () => callUpdateCardAndPickNext(3),
			52: () => callUpdateCardAndPickNext(4),
			53: () => callUpdateCardAndPickNext(5),
		}

		const buttonChoice = buttonChoices[e.keyCode]

		if (buttonChoice) {
			e.preventDefault()
			buttonChoice()
		}
	}

	const flipCard = () => {
		setRevealedAtLeastOnce(true)
		setShowBackSide(!showBackSide)
	}

	const callUpdateCardAndPickNext = choice => updateCardAndPickNext(cardQueue[0]._id, choice)

	const buttonsData = [
		{ updateCardChoice: 0, bgColor: '#3a0101' },
		{ updateCardChoice: 1, bgColor: '#630202' },
		{ updateCardChoice: 2, bgColor: '#633802' },
		{ updateCardChoice: 3, bgColor: '#635802' },
		{ updateCardChoice: 4, bgColor: '#3d6302' },
		{ updateCardChoice: 5, bgColor: '#026916' },
	]

	const ChoiceButton = ({ buttonData }) => (
		<button
			disabled={!revealedAtLeastOnce}
			style={{ ...gradeButton, backgroundColor: buttonData.bgColor }}
			onClick={() => callUpdateCardAndPickNext(buttonData.updateCardChoice)}>
			{buttonData.updateCardChoice}
		</button>
	)

	return isLoading || !cardQueue[0] ? (
		<Loader />
	) : (
		<div style={cardDiv}>
			<div style={cardContentDiv} onClick={() => flipCard()}>
				<p style={{ fontSize: '2rem', whiteSpace: 'pre-wrap' }} unselectable='on'>
					{showBackSide ? cardQueue[0].back : cardQueue[0].front}
				</p>
			</div>
			<div style={gradeButtonsDiv}>
				{/* buttons for not remembered card */}
				{buttonsData.slice(0, 3).map((buttonData, i) => (
					<ChoiceButton key={i} buttonData={buttonData} />
				))}
				{/* visual separator */}
				<p style={{ margin: '0 0.4rem', color: 'grey' }}>{'|'}</p>
				{/* buttons for remembered card */}
				{buttonsData.slice(3, 6).map((buttonData, i) => (
					<ChoiceButton key={i} buttonData={buttonData} />
				))}
				<div style={{ bottom: '60px', position: 'absolute' }}>
					<Link to={`/edit-card/${cardQueue[0]._id}`}>
						<button style={C.styles.roundButton}>&#9997;</button>
					</Link>
					<button onClick={() => skipCard(cardQueue[0]._id)} style={C.styles.roundButton}>
						&#9889;
					</button>
				</div>
			</div>
		</div>
	)
}

const cardDiv = {
	display: 'flex',
	flexWrap: 'wrap',
	height: '84%',
	marginTop: '-5%',
}

const cardContentDiv = {
	width: '100%',
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
	position: 'absolute',
	bottom: '2%',
	left: '0',
}

const gradeButton = {
	color: '#fff',
	margin: '0 0.3rem 0.3rem',
	padding: '0.3rem 1rem',
	height: '2.6rem',
	width: '2.8rem',
}
