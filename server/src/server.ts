import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';

dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl: string = process.env.DB_HOST || 'database_url';

const dividers = (length: number) => {
  let dividersCount = '';
  for (let i = 0; i < length; i++) {
    dividersCount += '─';
  }
  return dividersCount;
};

const startServer = async () => {
  try {
    const divider = dividers(50);
    await mongoose.connect(dbUrl);

    console.clear();
    console.log(divider.black);
    console.log('Database connection successful ✅'.green.bold);
    console.log('');

    app.listen(port, () => {
      const url = `http://localhost:${port}`.cyan.dim.underline;

      console.log(`🐱 Server is up and running at ${url} 🐱`.magenta.bold);
      console.log(divider.black);
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
