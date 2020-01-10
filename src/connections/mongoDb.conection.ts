const winston = require('winston');
const mongoose = require('mongoose');
const mongoConfig: IOption = require('../configs/db.config.json');

mongoose.Promise = Promise;

interface IOption {
  url: string;
  options: {
    bufferCommands?: boolean;
    dbName?: string;
    db?: any;
    config?: {
      autoIndex?: boolean;
    };
    autoIndex?: boolean;
    autoCreate?: boolean;
    journal?: boolean;
    nativeParser?: boolean;
    safe?: any;
    slaveOk?: boolean;
    user?: string;
    pass?: string;
    useCreateIndex?: boolean;
    useMongoClient?: boolean;
    useNewUrlParser?: boolean;
    useFindAndModify?: boolean;
    mongos?: any;
    server?: any;
    replset?: any;
    useUnifiedTopology: boolean;
    poolSize: number;
    readPreference: any;
    replicaSet: any;
  }
}

const { url, options } = mongoConfig;

mongoose.connect(url, options).then(() => {
  console.log('Connecting')
});

mongoose.connection.on('disconnected', () => {
  winston.log('error', 'Reconnecting to ' + url);
  setTimeout(() => {
    mongoose.connect(url, options).then(() => {
      console.log('Reconnecting')
    });
  }, 5000);
});

export default mongoose.connection;