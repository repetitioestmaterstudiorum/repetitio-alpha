import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import memoize from 'lodash.memoize'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { throwIfNotLoggedIn } from '/imports/api/helpers/methodHelpers.js'

// ---

Meteor.methods({
	addDeck(title) {
		check(title, String)

		throwIfNotLoggedIn(this.userId)

		DeckCollection.insert({ title: title.trim(), userId: this.userId })
	},
	deleteDeck(deckId) {
		check(deckId, String)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersDeckMemoized(this.userId, deckId)

		DeckCollection.update({ _id: deckId }, { $set: { deleted: true } })
		CardCollection.update(
			{ deckId, deleted: { $ne: true } },
			{ $set: { deleted: true } },
			{ multi: true }
		)
	},
	invertShowBackSideFirst(deck) {
		check(deck, Object)
		check(deck?._id, String)
		check(!deck?.showBackSideFirst, Boolean)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersDeckMemoized(this.userId, deck._id)

		DeckCollection.update(
			{ _id: deck._id },
			{ $set: { showBackSideFirst: !deck.showBackSideFirst } }
		)
	},
})

const throwIfNotUsersDeckMemoized = memoize((userId, deckId) => {
	const isUsersDeck = !!DeckCollection.findOne({ _id: deckId, userId }, { fields: { _id: 1 } })
	if (!isUsersDeck) throw new Meteor.Error('Access denied.')
})
