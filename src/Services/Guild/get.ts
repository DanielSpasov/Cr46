import { Guild as IGuild } from "../../Interfaces/Core";
import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";

export const getGuild = async (
  client: ExtendedClient,
  guildId: string
): Promise<IGuild> => {
  try {
    return await Guild.findOne({ id: guildId });
  } catch (error) {
    errorHandler({ client, error });
  }
};
