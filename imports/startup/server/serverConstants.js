import { sampleData } from '/imports/api/server/sampleData.js'

// ------------

export const C = {}

C.meteor = {
	accounts: {
		admin: process.env.DEFAULT_ADMIN || sampleData.meteor.accounts.defaultAdmin,
		pass: process.env.DEFAULT_PASS || sampleData.meteor.accounts.defaultPass,
	},
}
