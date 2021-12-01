import cloneDeep from 'lodash.clonedeep'
import Debug from 'debug'
const debug = Debug('REP:serverConstants.js')

import { C as globalC } from '/imports/startup/globalConstants.js'
import { sampleData } from '/imports/api/server/sampleData.js'

// ---

export const C = cloneDeep(globalC)

const { DEFAULT_ADMIN: defaultAdmin, DEFAULT_PASS: defaultPass } = process.env
if (!defaultAdmin || !defaultPass) {
	debug(
		`Missing env variables for default admin and password (-> sampleData used). defaultAdmin: ${defaultAdmin}, defaultPass: ${defaultPass}`
	)
}

C.meteor = {
	accounts: {
		admin: defaultAdmin ? defaultAdmin : sampleData.meteor.accounts.defaultAdmin,
		pass: defaultPass ? defaultPass : sampleData.meteor.accounts.defaultPass,
	},
}

// const { SMTP_HOST: smtpHost, SMTP_USER: smtpUser, SMTP_PASSWORD: smtpPassword } = process.env
// if (!smtpHost || !smtpUser || !smtpPassword) {
// 	debug(
// 		`Missing SMTP env variables (important for error reporting). smtpHost: ${!!smtpHost}, smtpUser: ${!!smtpUser}, smtpPassword: ${!!smtpPassword}`
// 	)
// } else {
// 	C.email = {
// 		smtpHost,
// 		smtpUser,
// 		smtpPassword,
// 	}
// }
