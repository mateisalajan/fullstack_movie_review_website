import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://sergiusalajan42:0XKchKBJrbEavPiY@cluster0.hgdm0je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
