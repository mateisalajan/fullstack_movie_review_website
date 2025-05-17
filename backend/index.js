import dotenv from 'dotenv';
dotenv.config();

import app from './server.js';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGO_URI;

const port = 8002;

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(client => {
    // Pass the client to app for reuse
    app.locals.dbClient = client;

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
