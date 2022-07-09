import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";

export const event: Event = {
  name: "guildUpdate",
  run: async (client, oldGuild, newGuild) => {
    try {
      await Guild.findOneAndUpdate(
        { id: oldGuild.id },
        { id: newGuild.id, name: newGuild.name }
      );
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
