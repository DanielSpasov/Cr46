import { Interaction } from "../../../../Interfaces/Core";
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
  if (!championsData) return client.config.default_number_of_champs;

  const champCount = championsData.value;
  if (champCount < 1 || champCount > 15) {
    throw {
      message: `\`${champCount}\` is not a valid amount, please enter a number between \`1\` and \`15\`.`,
      error_code: 400,
    };
  }

  return champCount;
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
