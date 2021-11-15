import mongoose from 'mongoose';



const guildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});



export default mongoose.model('Guild', guildSchema);