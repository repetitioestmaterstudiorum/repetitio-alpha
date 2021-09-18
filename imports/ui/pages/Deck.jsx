import React, { useEffect, useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { supermemo } from 'supermemo'
import dayjs from 'dayjs'
import sample from 'lodash.sample'

import { C } from '/imports/startup/client/clientConstants.js'
import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { Card } from '/imports/ui/components/Card.jsx'
import { BackToDeckOverview } from '/imports/ui/components/BackToDeckOverview.jsx'
import { Footer } from '/imports/ui/components/Footer.jsx'

// ------------

export const Deck = ({ match }) => {
	const {
		params: { deckId },
	} = match

	const { deck, cards } = useTracker(() => ({
		deck: DeckCollection.findOne(deckId),
		cards: CardCollection.find({ deckId, dueDate: { $lte: new Date() } }).fetch(),
	}))

	const [currentCard, setCurrentCard] = useState({})

	useEffect(() => {
		setCurrentCard(sample(cards))
	}, cards)

	return (
		<>
			<p style={{ textAlign: 'center' }}>
				Deck: <i>{deck.title}</i>
			</p>
			<BackToDeckOverview />
			<hr style={C.styles.hr} />

			<div style={{ padding: '3rem 0' }}>
				<Card card={currentCard} updateCardInDb={updateCardInDb} />
			</div>

			<Footer />
		</>
	)
}

function updateCardInDb(card, grade) {
	const newCard = recalculateCard(card, grade)
	console.log('writing card to db (card, newCard)', card, newCard)
	CardCollection.update({ _id: card._id }, { $set: { ...newCard } })
}

/* 
# Quick SM2 reference
## Item
- interval: inter-repetition interval after the repetitions (in days). Init: 0.
- repetition: the number of continous correct responses. Init: 0.
- efactor: the easiness of memorizing and retaining a given item in memory. Init: 2.5.

## Grades
5: perfect response.
4: correct response after a hesitation.
3: correct response recalled with serious difficulty.
2: incorrect response; where the correct one seemed easy to recall.
1: incorrect response; the correct one remembered.
0: complete blackout. 
*/
function recalculateCard(card, grade) {
	console.log('recalculating card (card, grade) :>> ', card, grade)
	const { interval, repetition, efactor } = supermemo(card, grade)
	const dueDate = dayjs().add(interval, 'day').toDate()
	console.log('card.dueDate :>> ', card.dueDate)
	console.log('dueDate :>> ', dueDate)
	return { ...card, interval, repetition, efactor, dueDate }
}
