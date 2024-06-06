import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';
import {
  logDatabaseConnectionSuccess,
  logServerStart,
} from './middleware/logger';

dotenv.config();

const port = process.env.PORT || '5000';
const dbUrl: string = process.env.DB_HOST || 'database_url';

const startServer = async () => {
  try {
    await mongoose.connect(dbUrl);
    logDatabaseConnectionSuccess();

    app.listen(port, () => {
      logServerStart(port);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message.red);
    } else {
      console.log('Unknown error'.red);
    }
    process.exit(1);
  }
};

startServer();
