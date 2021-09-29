import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState, createContext, useReducer } from 'react'
import { supermemo } from 'supermemo'
import dayjs from 'dayjs'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

export const Context = createContext()

const queueLimit = 10
const cardQueue = {} // todo: use indexDb for refresh safety and generally it's cool

export const DataState = ({ children }) => {
	const [, forceUpdate] = useReducer(x => x + 1, 0)
	const [currentDeckId, setCurrentDeckId] = useState(null)

	const {
		isLoading,
		decks,
		decksCount,
		currentDeck,
		cardsInCurrentDeck,
		cardsInCurrentDeckCount,
		dueCardsInCurrentDeck,
		dueCardsInCurrentDeckCount,
	} = useTracker(() => {
		const decksSubHandler = Meteor.subscribe('decks')
		const cardsSubHandler = Meteor.subscribe('cards')

		if (!decksSubHandler.ready() || !cardsSubHandler.ready()) {
			return {
				isLoading: true,
				decks: [],
				decksCount: 0,
				currentDeck: {},
				cardsInCurrentDeck: [],
				cardsInCurrentDeckCount: 0,
				dueCardsInCurrentDeck: [],
				dueCardsInCurrentDeckCount: 0,
			}
		}

		const decks = DeckCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		const decksCount = DeckCollection.find().count()

		const currentDeck = DeckCollection.findOne(currentDeckId)

		const cardsInCurrentDeckCursor = CardCollection.find({
			deckId: currentDeck?._id,
		})
		const cardsInCurrentDeck = cardsInCurrentDeckCursor.fetch()
		const cardsInCurrentDeckCount = cardsInCurrentDeckCursor.count()

		const dueCardsInCurrentDeck = CardCollection.find(
			{
				deckId: currentDeck?._id,
				dueDate: { $lte: new Date() },
			},
			{
				// hardest, then oldest dueDate
				sort: { efactor: 1, dueDate: 1 },
				limit: queueLimit,
			}
		).fetch()

		const dueCardsInCurrentDeckCount = CardCollection.find({
			deckId: currentDeck?._id,
			dueDate: { $lte: new Date() },
		}).count()

		return {
			isLoading: false,
			decks,
			decksCount,
			currentDeck,
			cardsInCurrentDeck,
			cardsInCurrentDeckCount,
			dueCardsInCurrentDeck,
			dueCardsInCurrentDeckCount,
		}
	})

	if (currentDeckId) {
		if (!cardQueue[currentDeckId]) cardQueue[currentDeckId] = []
		for (const dC of dueCardsInCurrentDeck) {
			if (!cardQueue[currentDeckId].map(c => c._id).includes(dC._id)) {
				cardQueue[currentDeckId].push(dC)
			}
		}
	}

	const skipCard = () => {
		cardQueue[currentDeckId].shift()
		forceUpdate()
	}

	const updateCardAndPickNext = (card, grade) => {
		cardQueue[currentDeckId].shift()
		const recalculatedCard = recalculateCard(card, grade)
		Meteor.call('updateRecalculatedCard', card._id, recalculatedCard)
	}

	return (
		<Context.Provider
			value={{
				// meteor reactive data
				isLoading,
				decks,
				decksCount,
				currentDeck,
				cardsInCurrentDeck,
				cardsInCurrentDeckCount,
				dueCardsInCurrentDeckCount,
				// js array (queue)
				cardQueue,
				// react states and functions
				setCurrentDeckId,
				updateCardAndPickNext,
				skipCard,
			}}
		>
			{children}
		</Context.Provider>
	)
}

const recalculateCard = (card, grade) => {
	// The SM2 algorithm reference is in README.md. Modified usage here:
	// If answer between 0-2, repeat on the same day.
	// Otherwise, according to the SM2 algorithm.
	const { interval, repetition, efactor } = supermemo(card, grade)
	const roundedEfactor = +efactor.toFixed(2)
	const dueDate = grade <= 2 ? card.dueDate : dayjs().add(interval, 'day').toDate()
	return { ...card, interval, repetition, efactor: roundedEfactor, dueDate }
}
