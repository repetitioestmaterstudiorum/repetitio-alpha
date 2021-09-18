import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { DeckOverview } from '/imports/ui/pages/DeckOverview.jsx'
import { Login } from '/imports/ui/pages/Login.jsx'
import { EditDeck } from './pages/EditDeck.jsx'
import { Deck } from './pages/Deck.jsx'
import { FourOFour } from '/imports/ui/pages/404.jsx'

// ------------

export const Routes = () => {
	const user = useTracker(() => Meteor.user())

	return (
		<Router>
			{user ? (
				<>
					<Redirect to='/deck-overview' />
					<Switch>
						<Route exact path='/deck-overview' component={DeckOverview} />
						<Route exact path='/deck/:deckId' component={Deck} />
						<Route exact path='/edit-deck/:deckId' component={EditDeck} />
						<Route component={FourOFour} />
					</Switch>
				</>
			) : (
				<>
					<Redirect to='/login' />
					<Route exact path='/login' component={Login} />
				</>
			)}
		</Router>
	)
}
