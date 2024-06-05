import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';

dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl: string = process.env.DB_HOST || 'database_url';

const startServer = async () => {
  try {
    await mongoose.connect(dbUrl);

    console.log('Database connection successful ✅'.green.bold);

    app.listen(port, () => {
      const url = `http://localhost:${port}`.cyan.dim.underline;
      console.log('---------------------------------------------------'.black);
      console.log(`🐱 Server is up and running at ${url} 🐱`.magenta.bold);
      console.log('---------------------------------------------------'.black);
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
