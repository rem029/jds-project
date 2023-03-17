import "dotenv/config";
import type { Knex } from "knex";

const DEFAULT_DB_PORT = Number(process.env.DB_PORT) || 5433;
export const DEFAULT_CONNECTION_CONFIG: Knex.ConnectionConfig = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "",
	password: process.env.DB_PW || "",
	database: process.env.DB_DB || "",
	debug: true,
};

export const DEFAULT_KNEX_LOGGER = {
	warn(message: any) {
		console.log(message);
	},
	error(message: any) {
		console.log(message);
	},
	debug(message: any) {
		console.log(message);
	},
};

export const DEFAULT_KNEX_CONFIG: Knex.Config = {
	client: "pg",
	connection: { ...DEFAULT_CONNECTION_CONFIG, timezone: "utc", port: DEFAULT_DB_PORT },
	debug: true,
	log: DEFAULT_KNEX_LOGGER,
	pool: {
		// afterCreate: (conn, done) => {
		// 	conn.query("SET timezone='UTC';", (err) => {
		// 		if (err) {
		// 			// first query failed, return error and don't try to make next query
		// 			done(err, conn);
		// 		} else {
		// 			// do the second query...
		// 		}
		// 	});
		// },
		min: 2,
		max: 6,
		createTimeoutMillis: 3000,
		acquireTimeoutMillis: 30000,
		idleTimeoutMillis: 30000,
		reapIntervalMillis: 1000,
		createRetryIntervalMillis: 100,
		propagateCreateError: true, // <- default is true, set to false
	},
};

const config: { [key: string]: Knex.Config } = {
	development: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},

	staging: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},

	production: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},
};

module.exports = config;
