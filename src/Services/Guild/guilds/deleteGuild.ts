import { Client } from "discord.js";

import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";

export const deleteGuild = async (client: Client, guildId: string) => {
  try {
    const deletedGuild = await Guild.findOneAndDelete({ id: guildId });
    if (!deletedGuild) {
      throw {
        type: "Database Error",
        message: `Failed to delete Guild with ID: ${guildId}.`,
        error_code: 400,
      };
    }
  } catch (error) {
    errorHandler(client, error);
  }
};
