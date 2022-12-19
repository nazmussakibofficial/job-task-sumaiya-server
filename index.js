const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yxjl2sj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const sectorCollection = client.db('CodeTask').collection('sectors');
        const savedCollection = client.db('CodeTask').collection('saved');

        app.get('/sectors', async (req, res) => {
            const query = {};
            const cursor = sectorCollection.find(query);
            const sectors = await cursor.toArray();
            res.send(sectors);
        })

        app.post('/saved', async (req, res) => {
            const item = req.body;
            const result = await savedCollection.insertOne(item);
            res.send(result);
        })

        app.get('/saved', async (req, res) => {
            const query = {};
            const cursor = savedCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

    }
    finally {

    }
}

run().catch(e => console.error(e));

app.get('/', (req, res) => {
    res.send('Coding Challenge server is running')
})

app.listen(port, () => {
    console.log(`Server is running on ${port} port`)
})