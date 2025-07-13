import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ Missing MONGODB_URI in .env.local");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options)
      .connect()
      .then((client) => {
        console.log("✅ MongoClient connected (development)");
        return client;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options)
    .connect()
    .then((client) => {
      console.log("✅ MongoClient connected (production)");
      return client;
    });
}

export async function dbConnect(collectionName) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  console.log(`🔗 Using DB "${process.env.DB_NAME}", collection "${collectionName}"`);
  return db.collection(collectionName);
}
