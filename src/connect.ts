import { mongo, connection } from 'mongoose';

type TInput = {
  db: string;
}

export default ({ db }: TInput) => {

  const connect = () => {
    mongo
      .connect(
        db,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      )
      .then((data) => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  connection.on('disconnected', connect);
};
