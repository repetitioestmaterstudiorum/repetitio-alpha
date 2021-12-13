import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import memoize from 'lodash.memoize'

import { CardCollection } from '/imports/api/collections/cardCollection.js'
import { throwIfNotLoggedIn } from '/imports/api/helpers/methodHelpers.js'

// ---

Meteor.methods({
	addCard(front, back, deckId) {
		check(front, String)
		check(back, String)
		check(deckId, String)

		throwIfNotLoggedIn(this.userId)

		CardCollection.insert({
			deckId,
			front: front.trim(),
			back: back.trim(),
			userId: this.userId,
		})
	},
	updateCard(cardId, card) {
		check(cardId, String)
		check(card, Object)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update({ _id: cardId }, { $set: { ...card } })
	},
	updateCardFront(cardId, front) {
		check(cardId, String)
		check(front, String)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update(
			{ _id: cardId },
			{
				$set: { front: front.trim() },
			}
		)
	},
	updateCardBack(cardId, back) {
		check(cardId, String)
		check(back, String)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update(
			{ _id: cardId },
			{
				$set: { back: back.trim() },
			}
		)
	},
	deleteCard(cardId) {
		check(cardId, String)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update({ _id: cardId }, { $set: { deleted: true } })
	},
})

const throwIfNotUsersCardMemoized = memoize((userId, cardId) => {
	const isUsersCard = !!CardCollection.findOne({ _id: cardId, userId }, { fields: { _id: 1 } })
	if (!isUsersCard) throw new Meteor.Error('Access denied.')
})
