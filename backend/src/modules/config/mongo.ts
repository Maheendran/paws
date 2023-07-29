import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://paws:Eyi3sKnfNNtVPEjg@cluster0.df7nzvx.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("mongo connect");
      });
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
