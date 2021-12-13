import cloneDeep from 'lodash.clonedeep'
import Debug from 'debug'
const debug = Debug('REP:serverConstants.js')

import { C as globalC } from '/imports/startup/globalConstants.js'
import { sampleData } from '/imports/api/server/sampleData.js'

// ---

export const C = cloneDeep(globalC)

C.meteor = {
	accounts: {
		admin: process.env.DEFAULT_ADMIN || sampleData.meteor.accounts.defaultAdmin,
		pass: process.env.DEFAULT_PASS || sampleData.meteor.accounts.defaultPass,
	},
}

// C.email = {
// 	smtpHost: process.env.SMTP_HOST,
// 	smtpUser: process.env.SMTP_USER,
// 	smtpPassword: process.env.SMTP_PASSWORD,
// }
