import dns from "dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);

export const db = client.db("bazar_dor");

export default client;