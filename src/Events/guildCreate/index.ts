import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";
import Guild from "../../Database/Models/Guild";

export const event: Event = {
  name: "guildCreate",
  run: async (client, guild) => {
    try {
      const newGuild = await new Guild({
        id: guild.id,
        name: guild.name,
        validChannels: [],
        users: [],
      });
      await newGuild.save();
      console.log(`Cr46 was added to Guild with ID: ${guild.id}.`);
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
