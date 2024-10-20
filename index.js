const express=require("express");
const cors=require("cors");

require("dotenv").config();

const app=express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//const course=require("./data/course.json");
app.use(cors());

app.get('/', (req, res) => {
  res.send('Assignment 4 Server Started!!')
})


const uri="mongodb://0.0.0.0:27017";
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqfai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, 
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


/** 
app.get('/course', (req, res) => {
    res.send(course);
  })

  app.get("/course/:id", (req, res) => {
    id = req.params.id;
    console.log(id);
    const selectedCourse = course.find((n) => n.course_id === id);
    res.send(selectedCourse);
  });
*/
app.listen(port, () => {
  console.log(`Assignment 4 Server listening on port ${port}`)
})