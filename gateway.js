const express = require('express')
const helmet = require('helmet')
const app = express()
const routes = require('./src/routes')
const config = require ('./config.js')
const port = `${config.apps[0].dev.PORT}`

app.use(express.json())
app.use(helmet())
app.use('/', routes)

//Inicializar escucha del apiGateway
app.listen(port, () => {
    console.log(`Gateway esta escuchando por el puerto ${port}` )
})