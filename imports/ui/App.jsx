import React from 'react'

import { Routes } from '/imports/ui/Router.jsx'

// ------------

Meteor.subscribe('decks')
Meteor.subscribe('cards')

export const App = () => <Routes />
