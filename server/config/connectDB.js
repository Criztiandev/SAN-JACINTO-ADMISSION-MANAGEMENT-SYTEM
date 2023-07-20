import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error?.message || error}`);
    process.exit(1);
  }
};

export default connectDb;
