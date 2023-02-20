const { MongoClient, ServerApiVersion } = require('mongodb');

const connection = async () => {
    let dbconnection;


    const uri = "";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    try {
        const connectiondb =  await client.connect()
        const collection = await connectiondb.db("formdata").collection("formdata")
        dbconnection = collection

} catch (error) {
    console.log(error,"dbconnection error")
}

    return dbconnection
}


module.exports = connection
