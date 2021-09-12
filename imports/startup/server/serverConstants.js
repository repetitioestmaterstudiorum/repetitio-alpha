import cloneDeep from 'lodash.clonedeep'

import { C as global_C } from '/imports/startup/globalConstants.js'

// ------------

export const C = cloneDeep(global_C)

C.meteor = {
	accounts: {
		defaultAdmin: process.env.DEFAULT_ADMIN || 'admin',
		defaultPass: process.env.DEFAULT_PASS || '1234',
	},
}
