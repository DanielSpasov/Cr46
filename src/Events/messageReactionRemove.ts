import { Event } from '../Interfaces';



export const event: Event = {
    name: 'messageReactionRemove',
    run: (client, reaction, user) => {
        try {
            if (reaction.message.channel.id === client.config.roles_channel) handleReaction(reaction, user, false);
        } catch(error) { console.log(error.message) }
    }
}

const handleReaction = (reaction, user, add) => {

    const emojis = {
        league: 'League of Legends',
        tft: 'TFT',
        valorant: 'VALORANT',
        minecraft: 'Minecraft',
        gtav: 'Grand Theft Auto V',
    }

    if (user.id === '890877562404884531') return;

    const emoji = reaction._emoji.name;
    const { guild } = reaction.message;
    const roleName = emojis[emoji];

    if (!roleName) return;

    const role = guild.roles.cache.find(role => role.name === roleName);
    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        console.log(`Adding role ${roleName} for ${user.username}.`);
        member.roles.add(role);
    } else {
        console.log(`Removing role ${roleName} for ${user.username}.`);
        member.roles.remove(role);
    }
}