import { Client } from "discord.js";

const mapActivity = {
  production: "/",
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
