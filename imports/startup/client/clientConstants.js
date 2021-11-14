import cloneDeep from 'lodash.clonedeep'

import { C as globalC } from '/imports/startup/globalConstants.js'

// ---

export const C = cloneDeep(globalC)

C.styles = {
	regularButton: {
		padding: '0.4rem 1rem',
		marginBottom: '0',
		height: '42px',
	},
	roundButton: {
		margin: '0 0 0 0.4rem',
		padding: '0.3rem 0.6rem',
		height: '2.4rem',
		width: '2.6rem',
		borderRadius: '2rem',
	},
	uiForm: {
		textAlign: 'center',
	},
	hr: { margin: '1rem auto', width: '100px' },
}
