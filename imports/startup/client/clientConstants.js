import cloneDeep from 'lodash.clonedeep'

import { C as globalC } from '/imports/startup/globalConstants.js'

// ------------

export const C = cloneDeep(globalC)

C.styles = {
	uiButton: {
		padding: '0.4rem 1rem',
	},
	hr: { margin: '1rem auto', width: '100px' },
}
