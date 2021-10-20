const db = require('../kernel/db')
const client = db.client;

/* module.exports.findOneData = async function () {
    db.connect().then(async (client) => {
        const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne();
        console.log(result)
    }).catch(console.error);
    
} */