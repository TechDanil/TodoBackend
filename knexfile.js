module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: "127.0.0.1",
            user: "postgres",
            password: "postgres",
            database: "todoDBEsoft",
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
};