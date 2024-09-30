const ApiConfig = require ('../models/apiConfig');
const mongoose = require('mongoose')
const conn = require('./dbConn')

async function getApiData(proveedor, nombre, metodo) {
    let db;
    try {
        db = await conn();
        const data = await ApiConfig.find({ proveedor: proveedor, nombre: nombre, metodo: metodo });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    } finally {
        if (db) {
            mongoose.disconnect();
        }
    }
}

module.exports = {getApiData};