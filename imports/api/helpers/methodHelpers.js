// ---

export function throwIfNotLoggedIn(userId) {
	if (!userId) throw new Meteor.Error('Not authorized.')
}
