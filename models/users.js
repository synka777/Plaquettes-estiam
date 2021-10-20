const db = require('../kernel/db')
const client = db.client;

module.exports.findOneData = async function () {
    db.connect().then(async (client) => {
        const result = await client.db("sample_users").collection("users").findOne();
        console.log(result)
    }).catch(console.error);
    
}

module.exports.findAll = async function () {
    let users = db.connect().then(async (client) => {
        let users = await client.db("sample_users").collection("users").find().toArray();
        return users
    }).catch(console.error);
    return users
}

module.exports.insertMultipleUsers = async function(newUsers) {
    db.connect().then(async (client) => {
        const result = await client.db("sample_users").collection("users").insertMany(newUsers);
        console.log(`${result.insertedCount} new users created with the following ids :` )
        console.log(result.insertedIds)
    }).catch(console.error);
}