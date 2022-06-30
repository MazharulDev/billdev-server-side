const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nagglkh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const infoCollection = client.db('billInfo').collection('info')
        // post info
        app.post('/info', async (req, res) => {
            const newInfo = req.body;
            const result = await infoCollection.insertOne(newInfo);
            res.send(result)
        })
        //get info
        app.get('/info', async (req, res) => {
            const info = await infoCollection.find().toArray();
            res.send(info);
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running test')
})

app.listen(port, () => {
    console.log("Listening to port", port);
})