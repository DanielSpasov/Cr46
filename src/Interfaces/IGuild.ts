import { IChannel } from "./IChannel";

export interface IGuild {
  id: string;
  name: string;
  icon: string;
  prefix: string;
  channels: {
    text: IChannel[];
    voice: IChannel[];
    category: IChannel[];
  };
  validChannels: string[];
  league: {
    allowed: boolean;
  };
  moveByActivity: {
    allowed: boolean;
  };
  roles: {
    allowed: boolean;
    channel: string;
  };
  music: {
    youtube: {
      allowed: boolean;
      playlists: boolean;
      mixes: boolean;
    };
    spotify: {
      allowed: boolean;
      playlists: boolean;
      albums: boolean;
    };
  };
  gambling: {
    allowed: boolean;
  };
  voiceCommands: {
    allowed: boolean;
  };
}
