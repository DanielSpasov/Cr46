export const defaultValues = {
  prefix: "/",
  validChannels: [],
  league: {
    allowed: true,
  },
  moveByActivity: {
    allowed: false,
  },
  roles: {
    allowed: false,
    channel: false,
  },
  music: {
    youtube: {
      allowed: true,
      playlists: false,
      mixes: false,
    },
    spotify: {
      allowed: false,
      playlists: false,
      albums: false,
    },
  },
  gambling: {
    allowed: false,
  },
  voiceCommands: {
    allowed: false,
  },
};
