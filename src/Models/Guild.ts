import mongoose from 'mongoose';



const guildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        unique: false,
    },
    validChannels: [{
        type: String
    }],
    leagueModule: {
        type: Boolean,
        required: true,
        unique: false,
    },
    tftModule: {
        type: Boolean,
        required: true,
        unique: false,
    },
    moveByActivityModule: {
        type: Boolean,
        required: true,
        unique: false,
    },
    rolesModule: {
        type: Boolean,
        required: true,
        unique: false,
    },
    music: {
        youtubeModule: {
            type: Boolean,
            required: true,
            unique: false,
        },
        spotifyModule: {
            type: Boolean,
            required: true,
            unique: false,
        },
        soundcloudModule: {
            type: Boolean,
            required: true,
            unique: false,
        }
    },
    gamblingModule: {
        type: Boolean,
        required: true,
        unique: false,
    },
    voiceCommands: {
        type: Boolean,
        required: true,
        unique: false,
    }
});



export default mongoose.model('Guild', guildSchema);