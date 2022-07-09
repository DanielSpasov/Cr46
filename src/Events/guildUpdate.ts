import Guild from "../Database/Models/Guild";
import { Event } from "../Interfaces/Core";

export const event: Event = {
  name: "guildUpdate",
  run: async (client, oldGuild, newGuild) => {
    try {
      if (oldGuild.name !== newGuild.name)
        await Guild.findOneAndUpdate(
          { id: oldGuild.id },
          { name: newGuild.name }
        );
      if (oldGuild.icon !== newGuild.icon)
        await Guild.findOneAndUpdate(
          { id: oldGuild.id },
          { icon: newGuild.icon }
        );
      if (oldGuild.id !== newGuild.id)
        await Guild.findOneAndUpdate({ id: oldGuild.id }, { id: newGuild.id });
    } catch (error) {
      console.log(error.message);
    }
  },
};
