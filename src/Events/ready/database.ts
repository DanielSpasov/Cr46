import { Client } from "discord.js";
import mongoose from "mongoose";

import errorHandler from "../../Errors/handler";

const connect = async (client: Client) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected!");
    return true;
  } catch (err) {
    await errorHandler(client, {
      type: err.name,
      message: err.message,
      error_code: 501,
    });
    console.error("Database Connection Error!");
    console.error("Shutting down...");
    client.destroy();
  }
};

export const database = {
  connect: connect,
};
