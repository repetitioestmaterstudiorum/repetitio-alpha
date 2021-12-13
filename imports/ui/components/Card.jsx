import React, { useContext, useEffect, useState } from 'react'

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

	const putFreshlySkippedCardsLast = queue => {
		const wasSkipped = card => card.skippedAt
		const notSkippedCards = queue.filter(c => !wasSkipped(c))
		const skippedCards = queue.filter(wasSkipped).sort((a, b) => a.skippedAt - b.skippedAt)
		return [].concat(notSkippedCards, skippedCards)
	}
	const orderedCardQueue = putFreshlySkippedCardsLast(cardQueue)

	useEffect(() => {
		setShowBackSide(currentDeck?.showBackSideFirst)
		setRevealedAtLeastOnce(false)
	}, [orderedCardQueue[0]?._id, updateCardAndPickNext])

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

	const callUpdateCardAndPickNext = choice =>
		updateCardAndPickNext(orderedCardQueue[0]._id, choice)

	const buttonData = [
		{ updateCardChoice: 0, bgColor: '#3a0101' },
		{ updateCardChoice: 1, bgColor: '#630202' },
		{ updateCardChoice: 2, bgColor: '#633802' },
		{ updateCardChoice: 3, bgColor: '#635802' },
		{ updateCardChoice: 4, bgColor: '#3d6302' },
		{ updateCardChoice: 5, bgColor: '#026916' },
	]

	const ChoiceButton = ({ bD }) => (
		<button
			disabled={!revealedAtLeastOnce}
			style={{ ...gradeButton, backgroundColor: bD.bgColor }}
			onClick={() => callUpdateCardAndPickNext(bD.updateCardChoice)}>
			{bD.updateCardChoice}
		</button>
	)

	return isLoading && orderedCardQueue[0]?._id ? (
		<Loader />
	) : (
		<div style={cardDiv}>
			<div style={cardContentDiv} onClick={() => flipCard()}>
				<p style={{ fontSize: '2rem', whiteSpace: 'pre-wrap' }} unselectable='on'>
					{showBackSide ? orderedCardQueue[0].back : orderedCardQueue[0].front}
				</p>
			</div>
			<div style={gradeButtonsDiv}>
				{/* buttons for not remembered card */}
				{buttonData.slice(0, 3).map((bD, i) => (
					<ChoiceButton key={i} bD={bD} />
				))}
				{/* visual separator */}
				<p style={{ margin: '0 0.4rem', color: 'grey' }}>{'|'}</p>
				{/* buttons for remembered card */}
				{buttonData.slice(3, 6).map((bD, i) => (
					<ChoiceButton key={i} bD={bD} />
				))}
				<div style={{ bottom: '60px', position: 'absolute' }}>
					<Link to={`/edit-card/${orderedCardQueue[0]._id}`}>
						<button style={C.styles.roundButton}>&#9997;</button>
					</Link>
					<button
						onClick={() => skipCard(orderedCardQueue[0]._id)}
						style={C.styles.roundButton}>
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
