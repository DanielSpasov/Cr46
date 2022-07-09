import { Interaction } from "../../../../Interfaces/Interaction";
import ExtendedClient from "../../../../Client";

export const validServers = [
  "br1",
  "eun1",
  "euw1",
  "jp1",
  "la1",
  "la2",
  "kr",
  "na1",
  "oc2",
  "ru",
  "tr1",
];

export const championsCount = (
  client: ExtendedClient,
  interaction: Interaction
): number => {
  const championsData = interaction.options._hoistedOptions.find(
    (x) => x.name === "champions"
  );
  if (championsData && Number(championsData.value) > 15) {
    throw {
      channelID: interaction.channelId,
      message: `The maximum number of champions Cr46 can display at once is \`15\``,
      error_code: 400,
    };
  }
  return championsData
    ? Number(championsData.value.toLowerCase())
    : Number(client.config.default_number_of_champs);
};

export const serverName = (
  client: ExtendedClient,
  interaction: Interaction
): string => {
  const serverProps = interaction.options._hoistedOptions.find(
    (x) => x.name === "server"
  );
  if (serverProps && !validServers.includes(serverProps.value)) {
    throw {
      channelID: interaction.channelId,
      message: `Server not Found: \`${
        serverProps.value
      }\`\nValid Servers: \`${validServers.join("`, `")}\``,
      error_code: 404,
    };
  }
  return serverProps
    ? serverProps.value.toLowerCase()
    : client.config.default_league_server;
};

export const summonerName = (interaction: Interaction): string => {
  return interaction.options._hoistedOptions.find((x) => x.name === "summoner")
    .value;
};
