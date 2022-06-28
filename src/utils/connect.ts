import mongoose from "mongoose";

async function connect() {
  const dbUri = process.env.DB_URI as string;
  try {
    console.log('DB connected');
    await mongoose.connect(dbUri);
  } catch (error) {
    console.log(`Could not connect to db: ${error}`);
    process.exit(1);
  }
}

export default connect;