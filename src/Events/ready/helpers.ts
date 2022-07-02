import { Client } from "discord.js";

import { sendMessage } from "../../Client/sendMessage";

const mapActivity = {
  production: "@Cr46",
  development: "Under Maintenance",
};

const mapActivityType = {
  production: "LISTENING",
  development: "WATCHING",
};

export const setActivity = (client: Client) => {
  client.user.setActivity(mapActivity[process.env.NODE_ENV], {
    type: mapActivityType[process.env.NODE_ENV],
  });
};

export const sendStartupMessage = async (client: Client) => {
  sendMessage({
    client,
    embed: {
      description: `<@${client.user.id}> is running in **${process.env.NODE_ENV}** mode.`,
      color: "GREEN",
    },
  });
  console.log("Cr46 is Online!");
};
