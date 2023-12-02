import mongoose from 'mongoose';

const dbConnection = async () => {
  const MONGODB_CONN_URI = process.env.MONGODB_CONN_URI;
  const DB_NAME = process.env.DB_NAME;
  try {
    await mongoose.connect(`${MONGODB_CONN_URI}/${DB_NAME}`);
    console.log('Database connection successfully established!');
  } catch (error) {
    console.log('Database connection failed!', error);
  }
};

export default dbConnection;
