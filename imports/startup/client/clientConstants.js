import cloneDeep from 'lodash.clonedeep'

import { C as global_C } from '/imports/startup/globalConstants.js'

// ------------

export const C = cloneDeep(global_C)

C.styles = {
	actionButton: {
		margin: '0 0 0 0.4rem',
		padding: '0.3rem 0.6rem',
		height: '2.4rem',
		width: '2.6rem',
		borderRadius: '2rem',
	},
}
