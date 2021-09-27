import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState, createContext } from 'react'
import { supermemo } from 'supermemo'
import dayjs from 'dayjs'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

export const Context = createContext()

export const DataState = ({ children }) => {
	const [currentDeckId, setCurrentDeckId] = useState(null)

	const { decksLoading, decks, decksCount, currentDeck } = useTracker(() => {
		const decksSubHandler = Meteor.subscribe('decks')
		if (!decksSubHandler.ready()) {
			return {
				decksLoading: true,
				decks: [],
				decksCount: 0,
				currentDeck: {},
			}
		}

		const decks = DeckCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		const decksCount = DeckCollection.find().count()

		const currentDeck = DeckCollection.findOne(currentDeckId)

		return {
			decksLoading: false,
			decks,
			decksCount,
			currentDeck,
		}
	})

	const {
		cardsLoading,
		cardsInCurrentDeck,
		cardsInCurrentDeckCount,
		dueCardsInCurrentDeck,
		dueCardsInCurrentDeckCount,
	} = useTracker(() => {
		const cardsSubHandler = Meteor.subscribe('cards')
		if (!cardsSubHandler.ready()) {
			return {
				cardsLoading: true,
				cardsInCurrentDeck: [],
				cardsInCurrentDeckCount: 0,
				dueCardsInCurrentDeck: [],
				dueCardsInCurrentDeckCount: 0,
			}
		}

		const cardsInCurrentDeckCursor = CardCollection.find({
			deckId: currentDeck?._id,
		})
		const cardsInCurrentDeck = cardsInCurrentDeckCursor.fetch()
		const cardsInCurrentDeckCount = cardsInCurrentDeckCursor.count()

		const dueInCurrentDeckCursor = CardCollection.find(
			{
				deckId: currentDeck?._id,
				dueDate: { $lte: new Date() },
			},
			{
				// hardest, then longest since update, then longest since insertion
				sort: { efactor: 1, updatedAt: 1, createdAt: 1 },
			}
		)
		const dueCardsInCurrentDeck = dueInCurrentDeckCursor.fetch()
		const dueCardsInCurrentDeckCount = dueInCurrentDeckCursor.count()

		return {
			cardsLoading: false,
			cardsInCurrentDeck,
			cardsInCurrentDeckCount,
			dueCardsInCurrentDeck,
			dueCardsInCurrentDeckCount,
		}
	})

	function updateCardAndPickNext(card, grade) {
		const recalculatedCard = recalculateCard(card, grade)
		Meteor.call('updateRecalculatedCard', card._id, recalculatedCard)
	}

	return (
		<Context.Provider
			value={{
				// meteor reactive data
				decksLoading,
				decks,
				decksCount,
				currentDeck,
				cardsLoading,
				cardsInCurrentDeck,
				cardsInCurrentDeckCount,
				dueCardsInCurrentDeck,
				dueCardsInCurrentDeckCount,
				// react states and functions
				setCurrentDeckId,
				updateCardAndPickNext,
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
	const dueDate = grade <= 2 ? card.dueDate : dayjs().add(interval, 'day').toDate()
	return { ...card, interval, repetition, efactor, dueDate }
}
