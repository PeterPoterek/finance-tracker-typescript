import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl: string = process.env.DB_HOST || 'database_url';

const startServer = async () => {
  try {
    await mongoose.connect(dbUrl);

    console.log('Database connection successful');

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
