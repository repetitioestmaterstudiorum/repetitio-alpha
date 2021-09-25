import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { DataState } from '/imports/ui/DataState.jsx'
import { DeckOverview } from '/imports/ui/pages/DeckOverview.jsx'
import { Login } from '/imports/ui/pages/Login.jsx'
import { EditDeck } from './pages/EditDeck.jsx'
import { Deck } from './pages/Deck.jsx'
import { FourOFour } from '/imports/ui/pages/404.jsx'
import { Header } from '/imports/ui/components/Header.jsx'
import { DevModeDataReset } from '/imports/ui/components/DevModeDataReset.jsx'
import { Footer } from '/imports/ui/components/Footer.jsx'

// ------------

export const Routes = () => {
	const isLoggedIn = useTracker(() => !!Meteor.userId())

	return (
		<Router>
			<>
				<Header />
				{isLoggedIn ? (
					<>
						<DataState>
							<Switch>
								<Route exact path='/' component={DeckOverview} />
								<Route exact path='/deck/:deckId' component={Deck} />
								<Route exact path='/edit-deck/:deckId' component={EditDeck} />
								<Route component={FourOFour} />
							</Switch>
						</DataState>
						<Footer />
						<DevModeDataReset />
					</>
				) : (
					<>
						<Redirect to='/login' />
						<Route exact path='/login' component={Login} />
					</>
				)}
			</>
		</Router>
	)
}
