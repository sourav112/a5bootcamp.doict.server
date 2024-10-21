const express=require("express");
const cors=require("cors");

require("dotenv").config();

const app=express();
const port = process.env.port || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//const course=require("./data/course.json");
app.use(cors());
app.use(express.json())

const uri="mongodb://localhost:27017";
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqfai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
  
      const userCollection = client.db("usersDbBootcamp").collection("users");
      const catCollection = client.db("usersDbBootcamp").collection("category");
      const productCollection = client.db("usersDbBootcamp").collection("product");
  
      // Get Product According to Category For Home Page
      app.get("/cathome/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { category: id };
        //const query = productCollection.find();
        const result = await productCollection.find(query).toArray();
        console.log(result);
        res.send(result);
      });
      app.get("/producthome/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        console.log(result);
        res.send(result);
      });

      // Product Action
      app.post("/products", async (req, res) => {
        const products = req.body;
        console.log(products);
        const result = await productCollection.insertOne(products);
        res.send(result);
      });
      app.get("/products", async (req, res) => {
        const query = productCollection.find();
        const result = await query.toArray();
        res.send(result);
      });
      app.delete("/product/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.deleteOne(query);
        res.send(result);
      });
      app.get("/product/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        console.log(result);
        res.send(result);
      });
      app.put("/product/:id", async (req, res) => {
        const id = req.params.id;
        const product = req.body;
        console.log(id, product);
  
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
  
        const updatedProduct = {
          $set: {
            name: product.name,
            category:product.category,
            
          },
        };
  
        const result = await productCollection.updateOne(
          filter,
          updatedProduct,
          option
        );
        res.send(result);
      });

      // Category Action
      app.post("/cats", async (req, res) => {
        const cats = req.body;
        console.log(cats);
        const result = await catCollection.insertOne(cats);
        res.send(result);
      });

      app.get("/cats", async (req, res) => {
        const query = catCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

      app.delete("/cat/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await catCollection.deleteOne(query);
        res.send(result);
      });

      app.get("/cats/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await catCollection.findOne(query);
        console.log(result);
        res.send(result);
      });

      app.put("/cat/:id", async (req, res) => {
        const id = req.params.id;
        const cat = req.body;
        console.log(id, cat);
  
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
  
        const updatedCat = {
          $set: {
            cat: cat.cat,
            
          },
        };
  
        const result = await catCollection.updateOne(
          filter,
          updatedCat,
          option
        );
        res.send(result);
      });
  
      // User Action
      app.get("/users", async (req, res) => {
        const query = userCollection.find();
        const result = await query.toArray();
        res.send(result);
      });
  
      app.get("/user/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.findOne(query);
        console.log(result);
        res.send(result);
      });
  
      app.post("/users", async (req, res) => {
        const users = req.body;
        console.log(users);
        const result = await userCollection.insertOne(users);
        res.send(result);
      });
  
      app.put("/user/:id", async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        console.log(id, user);
  
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
  
        const updatedUser = {
          $set: {
            name: user.name,
            email: user.email,
          },
        };
  
        const result = await userCollection.updateOne(
          filter,
          updatedUser,
          option
        );
        res.send(result);
      });
  
      app.delete("/user/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        res.send(result);
      });
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      //await client.close();
    }
  }
  run().catch((error) => console.log(error));
  
  app.get('/', (req, res) => {
    res.send('Assignment 5 Server Started!!')
  })

app.listen(port, () => {
  console.log(`Assignment 5 Server listening on port ${port}`)
})