import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { DeckOverview } from '/imports/ui/pages/DeckOverview.jsx'
import { Login } from '/imports/ui/pages/Login.jsx'
import { FourOFour } from '/imports/ui/pages/404.jsx'
import { Footer } from '/imports/ui/components/Footer.jsx'

// ------------

const browserHistory = createBrowserHistory()

export const Routes = () => {
	const user = useTracker(() => Meteor.user())

	return (
		<Router history={browserHistory}>
			{user ? (
				<>
					<Redirect to='/deck-overview' />
					<Switch>
						<Route exact path='/deck-overview' component={DeckOverview} />
						<Route component={FourOFour} />
					</Switch>
				</>
			) : (
				<>
					<Redirect to='/login' />
					<Route exact path='/login' component={Login} />
				</>
			)}
			<Footer />
		</Router>
	)
}
