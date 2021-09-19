import Debug from 'debug'
const debug = Debug('REP:globalConstants.js')

// ------------

export const C = {}

C.sm2 = {
	initInterval: 0,
	initRepetition: 0,
	initEfactor: 2.5,
}

const { TIME_ZONE: timeZone } = process.env
if (!timeZone) {
	debug(`Missing env variables for time zone. Using Europe/Zurich. timeZone: ${timeZone}`)
}
C.timeZone = timeZone || 'Europe/Zurich'
