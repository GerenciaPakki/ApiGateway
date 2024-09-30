module.exports = {
    apps: [
        {
            dev: {
                PORT: 3000,
                MONGO_URL: 'mongodb://127.0.0.1:27017/devpakkiDB',
                MONGO_PORT: 27017,
                MONGO_USR: 'devappakki',
                MONGO_PWD: '4Pp4kk1'
            }
        },
        {
            prod: {}
        }
    ]
}