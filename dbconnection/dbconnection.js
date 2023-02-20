const { MongoClient, ServerApiVersion } = require('mongodb');

const connection = async () => {
    let dbconnection;


    const uri = "mongodb+srv://Bala45:Balasai@45@cluster0.8eolhpa.mongodb.net/test";
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