import axios from 'axios';
import { Event } from '../Interfaces';



export const event: Event = {
    name: 'guildDelete',
    run: async (client, guild) => {
        try {

            const req = await axios.delete(`${process.env.API_URL}/guild?guild=${guild.id}`)

            if (req.data.status === 'DELETED') {
                console.log(`Cr46 was removed from Guild with ID: ${guild.id}`);
            }
            
        } catch (error) { console.log(error.message) }
    }
}