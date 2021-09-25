import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState, useEffect, createContext } from 'react'
import { supermemo } from 'supermemo'
import dayjs from 'dayjs'
import sample from 'lodash.sample'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

export const Context = createContext()

export const DataState = ({ children }) => {
	const [currentDeck, setCurrentDeck] = useState({})
	const [showBackSideFirst, setShowBackSideFirst] = useState(false)

	const {
		isLoading,
		decks,
		deckCount,
		cardsInCurrentDeck,
		cardsInCurrentDeckCount,
		dueInCurrentDeckCount,
		nextCardDue,
	} = useTracker(() => {
		const deckSubHandler = Meteor.subscribe('decks')
		const cardSubHandler = Meteor.subscribe('cards')
		if (!deckSubHandler.ready() || !cardSubHandler.ready()) {
			return {
				isLoading: true,
				decks: [],
				deckCount: 0,
				cardsInCurrentDeck: [],
				cardsInCurrentDeckCount: 0,
				dueInCurrentDeckCount: 0,
				nextCardDue: {},
			}
		}

		const decks = DeckCollection.find({}, sortByDate).fetch()
		const deckCount = DeckCollection.find().count()

		const cardsInCurrentDeckCursor = CardCollection.find({
			deckId: currentDeck?._id,
		})
		const cardsInCurrentDeck = cardsInCurrentDeckCursor.fetch()
		const cardsInCurrentDeckCount = cardsInCurrentDeckCursor.count()

		const dueCardsInDeckCursor = CardCollection.find({
			deckId: currentDeck?._id,
			dueDate: { $lte: new Date() },
		})
		const dueInCurrentDeckCount = dueCardsInDeckCursor.count()
		const nextCardDue = sample(dueCardsInDeckCursor.fetch())

		return {
			isLoading: false,
			decks,
			deckCount,
			cardsInCurrentDeck,
			cardsInCurrentDeckCount,
			dueInCurrentDeckCount,
			nextCardDue,
		}
	})

	function updateCardAndPickNext(card, grade) {
		const recalculatedCard = recalculateCard(card, grade)
		Meteor.call('updateRecalculatedCard', card._id, recalculatedCard)
	}

	async function openDeck(deckId) {
		const deck = await DeckCollection.findOne(deckId)
		setCurrentDeck(deck)
	}

	return (
		<Context.Provider
			value={{
				isLoading,
				decks,
				deckCount,
				cardsInCurrentDeck,
				cardsInCurrentDeckCount,
				dueInCurrentDeckCount,
				showBackSideFirst,
				setShowBackSideFirst,
				currentDeck,
				openDeck,
				nextCardDue,
				updateCardAndPickNext,
			}}
		>
			{children}
		</Context.Provider>
	)
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

Usage here: if answer between 0-2 -> repeat on the same day. Otherwise according to the SM2 algorithm.
*/
function recalculateCard(card, grade) {
	const { interval, repetition, efactor } = supermemo(card, grade)
	const dueDate = grade <= 2 ? card.dueDate : dayjs().add(interval, 'day').toDate()
	return { ...card, interval, repetition, efactor, dueDate }
}

const sortByDate = {
	sort: { createdAt: -1 },
}
