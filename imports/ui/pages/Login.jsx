import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

// ---

export const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	const handleSubmit = e => {
		e.preventDefault()

		Meteor.loginWithPassword(username, password, err => {
			if (err) {
				setUsername('')
				setPassword('')

				Swal.fire({
					title: 'Login failure:',
					text: err.message || 'Unknown error!',
					icon: 'error',
					confirmButtonText: 'Retry',
				})
			} else {
				history.push('/')
			}
		})
	}

	return (
		<>
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

				<div style={{ textAlign: 'center', margin: '1rem 0 1rem' }}>
					<button type='submit'>&#128275; Unlock</button>
				</div>
			</form>
		</>
	)
}
