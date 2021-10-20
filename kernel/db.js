require('dotenv').config()
const {MongoClient} = require('mongodb')

const host = process.env.DB_HOST;
const dbname = process.env.DB_NAME;
const username = process.env.DB_USR;
const password = process.env.DB_PWD;

const uri = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;
const client = new MongoClient(uri)

module.exports.connect = async () => {
    try {
        await client.connect()
        return client
    } catch (e) {
        console.error(e)
    }
    
}

module.exports.close = async() => {
    client.close();
}

