import cloneDeep from 'lodash.clonedeep'

import { C as global_C } from '/imports/startup/globalConstants.js'
import { sampleData } from '../../api/sampleData.js'

// ------------

export const C = cloneDeep(global_C)

C.meteor = {
	accounts: {
		admin: process.env.DEFAULT_ADMIN || sampleData.meteor.accounts.defaultAdmin,
		pass: process.env.DEFAULT_PASS || sampleData.meteor.accounts.defaultPass,
	},
}
