import { Schema, model } from "mongoose";

const walletSchema = new Schema({
  userID: String,
  daily: Date,
  balance: Number,
  crypto: [
    {
      symbol: String,
      name: String,
      balance: Number,
    },
  ],
});

export default model("Wallet", walletSchema);
