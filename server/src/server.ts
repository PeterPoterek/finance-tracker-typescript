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

    console.log('Database connection successful'.green);

    app.listen(port, () => {
      const url = `http://localhost:${port}`.cyan;
      console.log(`Server running at ${url} 🎉`);
    });
  } catch (err) {
    console.log((err as string).red);
    process.exit(1);
  }
};

startServer();
