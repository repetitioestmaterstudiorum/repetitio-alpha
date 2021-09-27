import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { DeckCollection } from '/imports/api/collections/deckCollection.js'
import { deleteDecksCards } from '/imports/api/methods/cardMethods.js'

// ------------

Meteor.methods({
	addDeck(title) {
		check(title, String)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		DeckCollection.insert({ title: title.trim(), userId: this.userId })
	},
	deleteDeck(deckId) {
		check(deckId, String)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		const isUsersDeck = !!DeckCollection.findOne(
			{ _id: deckId, userId: this.userId, deleted: { $ne: true } },
			{ fields: { _id: 1 } }
		)
		if (!isUsersDeck) throw new Meteor.Error('Access denied.')

		DeckCollection.update({ _id: deckId }, { $set: { deleted: true } })
		deleteDecksCards(deckId)
	},
	invertShowBackSideFirst(deck) {
		check(deck, Object)
		check(deck?._id, String)
		check(!deck?.showBackSideFirst, Boolean)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		// todo: generalize and reuse code here
		const isUsersDeck = !!DeckCollection.findOne(
			{ _id: deck?._id, userId: this.userId, deleted: { $ne: true } },
			{ fields: { _id: 1 } }
		)
		if (!isUsersDeck) throw new Meteor.Error('Access denied.')

		DeckCollection.update(
			{ _id: deck._id },
			{ $set: { showBackSideFirst: !deck.showBackSideFirst } }
		)
	},
})
