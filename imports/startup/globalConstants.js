import Debug from 'debug'
const debug = Debug('REP:globalConstants.js')

// ---

// complain if necessary env vars (front or backend) aren't defined
const requiredVariables = [
	// 'process.env.SMTP_HOST',
	// 'process.env.SMTP_USER',
	// 'process.env.SMTP_PASSWORD',
]
const undefinedVariables = requiredVariables.filter(x => !eval(x))
if (undefinedVariables.length) {
	const errorMessage = `Some essential environmental variables are undefined!
		${JSON.stringify(undefinedVariables)}
	`
	throw new Error(errorMessage)
}

export const C = {}

C.sm2 = {
	initInterval: 0,
	initRepetition: 0,
	initEfactor: 2.5,
}

C.globalSettings = {
	queueLimit: 30,
	timeSkippedCardEndOfQueueInMin: 10,
}

C.timeZone = process.env.TIME_ZONE || 'Europe/Zurich'
