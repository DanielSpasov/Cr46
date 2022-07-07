import { MessageEmbed } from "discord.js";

import { Command } from "../../Interfaces";

import Guild from "../../Database/Models/Guild";

import { menus } from "../Help/Menus/index";

export const command: Command = {
  name: "rockpaperscissors",
  arguments: [],
  aliases: ["rps"],
  run: async (client, message, args) => {
    try {
      const guild = await Guild.findOne({ id: message.guildId });

      if (!args[0]) return menus.other.rps(message, guild.prefix);

      const validOptions = ["rock", "paper", "scissors"];

      const winningCondition = {
        rock: "scissors",
        scissors: "paper",
        paper: "rock",
      };

      if (!validOptions.includes(args[0].toLowerCase()))
        return menus.other.rps(message, guild.prefix);

      const botChoice = validOptions[Math.floor(Math.random() * 3)];
      const isTie = args[0].toLowerCase() === botChoice;
      const isWinner = winningCondition[args[0].toLowerCase()] === botChoice;

      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(isTie ? "Tie" : isWinner ? "You Win" : "You Lose")
            .setColor(isTie ? "YELLOW" : isWinner ? "GREEN" : "RED")
            .setDescription(
              `User -- \`${args[0].toLowerCase()}\` -- VS -- \`${botChoice}\` -- Cr46`
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
