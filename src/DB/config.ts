import mongoose from 'mongoose';



export default () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cr46.gzcfr.mongodb.net/Cr46`, {});
    const db = mongoose.connection;
    db.once('error', () => console.log('Connection Error!'));
    db.once('open', () => console.log('Database Connected!'));
}