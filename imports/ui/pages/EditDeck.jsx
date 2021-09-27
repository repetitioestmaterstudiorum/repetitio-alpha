import { Meteor } from 'meteor/meteor'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/src/sweetalert2.js'

import { Context } from '/imports/ui/DataState.jsx'
import { AddCardForm } from '/imports/ui/components/AddCardForm.jsx'
import { C } from '/imports/startup/client/clientConstants.js'
import { Loader } from '/imports/ui/components/Loader.jsx'
import { FindCard } from '/imports/ui/components/FindCard.jsx'

// ------------

export const EditDeck = ({ match }) => {
	const {
		params: { deckId },
	} = match

	const { setCurrentDeckId, currentDeck, dueCardsInCurrentDeckCount, cardsInCurrentDeckCount } =
		useContext(Context)

	useEffect(() => setCurrentDeckId(deckId), [deckId])

	const history = useHistory()
	const handleDeleteDeckClick = () => {
		const deckTitle = currentDeck.title
		Swal.fire({
			title: `Delete deck "${deckTitle}""`,
			text: 'Are you very sure? The deck and all its cards will be gone.',
			icon: 'warning',
			confirmButtonText: 'Yes....',
			cancelButtonText: 'No',
			showCancelButton: true,
		}).then(result => {
			if (result.isConfirmed) {
				Meteor.call('deleteDeck', deckId, err => {
					console.log('err :>> ', err)
					if (err) {
						Swal.fire(
							'Error!',
							`The deck "${deckTitle}"" could not be deleted`,
							'error'
						)
					} else {
						Swal.fire(
							'Done!',
							`The deck "${deckTitle}" and all its cards have been deleted`,
							'success'
						).then(result => history.push('/'))
					}
				})
			}
		})
	}

	return currentDeck?._id ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
				flexDirection: 'column',
				textAlign: 'center',
			}}
		>
			<div>
				<h2>Deck: {currentDeck?.title}</h2>
				<p>Total cards in deck: {cardsInCurrentDeckCount}</p>
				<p>Cards due to study: {dueCardsInCurrentDeckCount}</p>
				<hr style={C.styles.hr} />
			</div>

			<AddCardForm deckId={deckId} />

			<FindCard />

			<div>
				<hr style={C.styles.hr} />
				<p>Deck settings: </p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexDirection: 'row',
					}}
				>
					<button
						style={C.styles.regularButton}
						onClick={() => Meteor.call('invertShowBackSideFirst', currentDeck)}
					>
						{/* sync arrow icon*/}
						&#128260; Back side first{' '}
						<input
							type='checkbox'
							checked={currentDeck.showBackSideFirst || false}
							style={{ verticalAlign: 'middle' }}
							onChange={() => {}}
						/>
					</button>
					<button style={C.styles.regularButton} onClick={handleDeleteDeckClick}>
						{/* bomb icon*/}
						&#128163; Delete
					</button>
				</div>
			</div>
		</div>
	) : (
		<Loader />
	)
}
