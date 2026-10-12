// const dns = require("dns");
// const { MongoClient } = require("mongodb");
// require("dotenv").config();

// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// async function test() {
//     try {
//         const client = new MongoClient(process.env.MONGODB_URI);

//         await client.connect();
//         await client.db("admin").command({ ping: 1 });

//         console.log("MongoDB Connected Successfully!");

//         await client.close();
//     } catch (error) {
//         console.log("MongoDB ERROR:", error);
//     }
// }

// test();