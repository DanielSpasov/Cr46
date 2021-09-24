import { Event } from '../Interfaces';



export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log('Cr46 is Online!')
        client.user.setActivity(
            process.env.NODE_ENV === 'production' ? '@Cr46' : 'Under Maintenance',
            { type: process.env.NODE_ENV === 'production' ? 'LISTENING' : 'WATCHING' }
        )
    }
}