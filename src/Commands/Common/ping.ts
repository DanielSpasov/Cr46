import { MessageEmbed } from "discord.js";

import { Command } from "../../Interfaces/Core";

export const command: Command = {
  name: "ping",
  arguments: [],
  aliases: [],
  run: async (client, message, args) => {
    try {
      const outputMessage = new MessageEmbed().setDescription(
        `\`${client.ws.ping}ms\``
      );

      if (client.ws.ping <= 75) outputMessage.setColor("#78ff66");
      if (client.ws.ping > 75 && client.ws.ping <= 150)
        outputMessage.setColor("#e6fa64");
      if (client.ws.ping >= 150) outputMessage.setColor("#fa7664");

      message.channel.send({ embeds: [outputMessage] });
    } catch (error) {
      console.log(error);
    }
  },
};
