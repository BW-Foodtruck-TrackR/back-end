require("dotenv").config();

const pgConnection =
    process.env.DATABASE_URL ||
    "postgres://pepijvuitjtsey:e61725feb066550881b31730d26d6fc82cdfc035bee9ce1fb58a715c66ff4511@ec2-34-233-226-84.compute-1.amazonaws.com:5432/d3h24ilhojc555";
module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true, // needed for sqlite
        connection: {
            filename: "./data/foodTruckDev.db3",
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
            },
        },
    },

    testing: {
        client: "sqlite3",
        connection: {
            filename: "./data/foodTruckTest.db3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    production: {
        client: "sqlite3",
        useNullAsDefault: true, // needed for sqlite
        connection: {
            filename: "./data/foodTruckDev.db3",
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
            },
        },
        // client: "pg",
        // connection: pgConnection,
        // pool: {
        //     min: 2,
        //     max: 10,
        // },
        // migrations: {
        //     directory: "./data/migrations",
        // },
        // seeds: {
        //     directory: "./data/seeds",
        // },
    },
};
