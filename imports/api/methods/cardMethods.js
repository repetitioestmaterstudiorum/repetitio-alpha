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
	updateRecalculatedCard(cardId, recalculatedCard) {
		check(cardId, String)
		check(recalculatedCard, Object)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update({ _id: cardId }, { $set: { ...recalculatedCard } })
	},
	updateCard(front, back, cardId) {
		check(front, String)
		check(back, String)
		check(cardId, String)

		throwIfNotLoggedIn(this.userId)
		throwIfNotUsersCardMemoized(this.userId, cardId)

		CardCollection.update(
			{ _id: cardId },
			{
				$set: { front: front.trim(), back: back.trim() },
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
