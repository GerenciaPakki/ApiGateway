module.exports = {
    apps: [
        {
            dev: {
                PORT: 3000,
                MONGO_URL: 'mongodb://localhost:27017/apiGateway',
                MONGO_PORT: 27017,
                MONGO_USR: '',
                MONGO_PWD: ''
            }
        },
        {
            prod: {}
        }
    ]
}