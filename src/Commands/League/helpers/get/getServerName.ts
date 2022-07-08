import ExtendedClient from "../../../../Client";
import { Interaction } from "../../../../Interfaces/Interaction";

export const getServerName = (
  client: ExtendedClient,
  interaction: Interaction
): string => {
  const serverProps = interaction.options._hoistedOptions.find(
    (x) => x.name === "server"
  );
  return serverProps
    ? serverProps.value.toLowerCase()
    : client.config.default_league_server;
};
