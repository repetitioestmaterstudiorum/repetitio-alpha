import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { CardCollection } from '/imports/api/collections/cardCollection.js'

// ------------

Meteor.methods({
	addCard(front, back, deckId) {
		check(front, String)
		check(back, String)
		check(deckId, String)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		CardCollection.insert({
			deckId,
			front: front.trim(),
			back: back.trim(),
			userId: this.userId,
		})
	},
	updateRecalculatedCard(cardId, recalculatedCard) {
		check(cardId, String)
		check(recalculatedCard, Object)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		// todo: make function to call in all methods
		const isUsersCard = !!CardCollection.findOne(
			{ _id: cardId, userId: this.userId },
			{ fields: { _id: 1 } }
		)
		if (!isUsersCard) throw new Meteor.Error('Access denied.')

		CardCollection.update({ _id: cardId }, { $set: { ...recalculatedCard } })
	},
	deleteCard(cardId) {
		check(cardId, String)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		const isUsersCard = !!CardCollection.findOne(
			{ _id: cardId, userId: this.userId },
			{ fields: { _id: 1 } }
		)
		if (!isUsersCard) throw new Meteor.Error('Access denied.')

		CardCollection.update({ _id: cardId }, { $set: { deleted: true } })
	},
	updateCard(front, back, cardId) {
		check(front, String)
		check(back, String)
		check(cardId, String)

		if (!this.userId) throw new Meteor.Error('Not authorized.')

		const isUsersCard = !!CardCollection.findOne(
			{ _id: cardId, userId: this.userId },
			{ fields: { _id: 1 } }
		)
		if (!isUsersCard) throw new Meteor.Error('Access denied.')

		CardCollection.update(
			{ _id: cardId },
			{
				$set: { front: front.trim(), back: back.trim() },
			}
		)
	},
})

export function deleteDecksCards(deckId) {
	if (!deckId) throw new Meteor.Error('No deckId to delete cards of.')

	CardCollection.update({ deckId }, { $set: { deleted: true } }, { multi: true })
}
