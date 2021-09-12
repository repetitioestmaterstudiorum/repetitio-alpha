import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'

// ------------

export const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		Meteor.loginWithPassword(username, password)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='username'>Username</label>
			<input
				type='text'
				placeholder='Username'
				name='username'
				required
				onChange={e => setUsername(e.target.value)}
			/>

			<label htmlFor='password'>Password</label>
			<input
				type='password'
				placeholder='Password'
				name='password'
				required
				onChange={e => setPassword(e.target.value)}
			/>

			<button type='submit'>&#128275; Unlock</button>
		</form>
	)
}
