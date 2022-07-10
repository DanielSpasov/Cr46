import { Schema, model } from "mongoose";

const guildSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  validChannels: [
    {
      type: String,
    },
  ],
  users: [
    {
      id: String,
      wallet: {
        balance: Number,
        crypto: [
          {
            symbol: String,
            name: String,
            balance: Number,
          },
        ],
      },
    },
  ],
});

export default model("Guild", guildSchema);
