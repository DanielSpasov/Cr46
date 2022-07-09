import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";

export const deleteGuild = async (client: ExtendedClient, guildId: string) => {
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
    errorHandler({ client, error });
  }
};
