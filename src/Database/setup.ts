import errorHandler from "../Errors/handler";
import ExtendedClient from "../Client";
import mongoose from "mongoose";

const connect = async (client: ExtendedClient) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected!");
    return true;
  } catch (err) {
    await errorHandler({
      client,
      error: {
        type: err.name,
        message: err.message,
        error_code: 501,
      },
    });
    console.error("Database Connection Error!\nShutting down...");
    client.destroy();
  }
};

export const database = {
  connect: connect,
};
