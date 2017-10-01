import Mongoose from 'mongoose';
import User from './User';
import Post from './Post';
import ServerConfig from '../config/ServerConfig';

export default class MongooseDB {

  constructor(app) {
    this.app = app;
    this.connectMongo();
  }

  connectMongo() {
    Mongoose.connect(ServerConfig.MONGO_DB_URL + ServerConfig.MONGO_DB, {
      useMongoClient: true, 
      promiseLibrary: global.Promise
    });

    Mongoose.connection.on('error', console.error.bind(console, "Connection error occured!"));

    Mongoose.connection.once('open', () => {
      console.log("Mongo connection is successfull.");
      this.loadModels();
    })
  }

  /**
   * Load models here by creating and instance from their classes.
   */
  loadModels() {
    var user = new User(Mongoose);
    //var post = new Post(Mongoose);
    console.log("Mongo models are loaded.");
  }

  getMongoose() {
    return Mongoose;
  }
}