import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState, createContext } from 'react'
import { supermemo } from 'supermemo'
import dayjs from 'dayjs'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { C } from '/imports/startup/client/clientConstants.js'

// ---

export const Context = createContext()

export const DataState = ({ children }) => {
	const [currentDeckId, setCurrentDeckId] = useState(null)

	const {
		isLoading,
		decks,
		decksCount,
		currentDeck,
		cardQueue,
		dueCardsInCurrentDeckCount,
		cardsInCurrentDeckCount,
	} = useTracker(() => {
		const decksSubHandler = Meteor.subscribe('decks')
		const cardsQueueSubHandler = Meteor.subscribe('cardsQueue')
		const allCardsSubHandler = Meteor.subscribe('cards')

		if (!decksSubHandler.ready() || !cardsQueueSubHandler.ready || !allCardsSubHandler.ready) {
			return {
				isLoading: true,
				decks: [],
				decksCount: 0,
				currentDeck: {},
				cardQueue: [],
				dueCardsInCurrentDeckCount: 0,
				cardsInCurrentDeckCount: 0,
			}
		}

		const decks = DeckCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		const decksCount = DeckCollection.find().count()

		const currentDeck = DeckCollection.findOne(currentDeckId)

		const cardQueue = CardCollection.find(
			{ deckId: currentDeck?._id, dueDate: { $lte: new Date() } },
			{ sort: { efactor: 1, dueDate: 1 }, limit: C.globalSettings.queueLimit }
		).fetch()

		const dueCardsInCurrentDeckCount = CardCollection.find({
			deckId: currentDeck?._id,
			dueDate: { $lte: new Date() },
		}).count()

		const cardsInCurrentDeckCount = CardCollection.find({
			deckId: currentDeck?._id,
		}).count()

		return {
			isLoading: false,
			decks,
			decksCount,
			currentDeck,
			cardQueue,
			dueCardsInCurrentDeckCount,
			cardsInCurrentDeckCount,
		}
	})

	const getCardById = cardId => CardCollection.findOne(cardId)

	const skipCard = cardId => {
		const card = CardCollection.findOne(cardId)
		const lastCard = cardQueue[C.globalSettings.queueLimit - 1]
		const newDueDate = dayjs(lastCard.dueDate).add(1, 'second').toDate()
		const skippedCard = { ...card, dueDate: newDueDate }
		Meteor.call('updateCard', card._id, skippedCard)
	}

	const updateCardAndPickNext = (cardId, grade) => {
		const card = CardCollection.findOne(cardId)
		const recalculatedCard = { ...recalculateCard(card, grade), createdAt: null }
		Meteor.call('updateCard', card._id, recalculatedCard)
	}

	const findCardsInCurrentDeck = ({ frontKeywords, backKeywords }) => {
		const searchTerms = []
		if (frontKeywords !== '') searchTerms.push({ front: new RegExp(frontKeywords, 'i') })
		if (backKeywords !== '') searchTerms.push({ back: new RegExp(backKeywords, 'i') })
		return CardCollection.find(
			{
				deckId: currentDeck?._id,
				$or: searchTerms,
			},
			{
				// most recently changed first
				sort: { updateDate: -1 },
				limit: 10,
			}
		).fetch()
	}

	return (
		<Context.Provider
			value={{
				// meteor reactive data
				isLoading,
				decks,
				decksCount,
				currentDeck,
				cardsInCurrentDeckCount,
				dueCardsInCurrentDeckCount,
				// js array (queue)
				cardQueue,
				// react state
				setCurrentDeckId,
				// functions
				updateCardAndPickNext,
				skipCard,
				findCardsInCurrentDeck,
				getCardById,
			}}>
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
