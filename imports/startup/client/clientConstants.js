import cloneDeep from 'lodash.clonedeep'

import { C as global_C } from '/imports/startup/globalConstants.js'

// ------------

export const C = cloneDeep(global_C)

C.styles = {
	uiButton: {
		padding: '0.4rem 1rem',
	},
	hr: { margin: '1rem 5rem' },
}
