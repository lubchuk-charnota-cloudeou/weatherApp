module.exports = {
	"featuresPath": "./bdd/features",
	"stepsPath": "./dist/bdd/steps",
	"bootstrapPath": "./bdd/DBBootstrap.config.js",
	"contextsPath": "./dist/bdd/contexts",
	"envsPath": "",
	"db": {
		"user": process.env.DB_USER,
		"passwd": process.env.DB_PASSWORD,
		"host": process.env.DB_HOST,
		"port": process.env.DB_PORT,
		"database": process.env.DB_NAME,
	},
	recordCases: false,
	"threadsNumber": 1,
	"reporters": [
		"default"
	],
	"webapp": {
		"host": "",
		"port": 0
	}
}