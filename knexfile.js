// Update with your config settings.
const pgConnection = process.env.DATABASE_URL;

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "localhost",
            database: "foodTruck",
            user: "postgres",
            password: "tH3w3Bc0D!ngP@s5c0D3",
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
        // add the following
        // pool: {
        //     afterCreate: (conn, done) => {
        //         // runs after a connection is made to the sqlite engine
        //         conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
        //     },
        // },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "pg",
        connection: pgConnection,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },
};
