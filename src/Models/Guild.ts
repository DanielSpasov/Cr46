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
  icon: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  channels: {
    text: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
    voice: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
    categories: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
    news: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
    store: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
    stage: [
      {
        id: { type: String },
        type: { type: String },
        name: { type: String },
        parent: { type: String || undefined },
        position: { type: Number },
      },
    ],
  },
  validChannels: [
    {
      type: String,
    },
  ],
  league: {
    allowed: {
      type: Boolean,
      required: true,
    },
  },
  moveByActivity: {
    allowed: {
      type: Boolean,
      required: true,
    },
  },
  roles: {
    allowed: {
      type: Boolean,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  music: {
    youtube: {
      allowed: {
        type: Boolean,
        required: true,
      },
      playlists: {
        type: Boolean,
        required: true,
      },
      mixes: {
        type: Boolean,
        required: true,
      },
    },
    spotify: {
      allowed: {
        type: Boolean,
        required: true,
      },
      playlists: {
        type: Boolean,
        required: true,
      },
      albums: {
        type: Boolean,
        required: true,
      },
    },
  },
  gambling: {
    allowed: {
      type: Boolean,
      required: true,
    },
  },
  voiceCommands: {
    allowed: {
      type: Boolean,
      required: true,
    },
  },
});

export default model("Guild", guildSchema);
