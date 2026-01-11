import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected : ", conn.connection.host);
        console.log("MongoDB Name : ", conn.connection.name);

    } catch (error) {
        console.log(error);
        process.exit(1);
        // next(error);
    }
}

export default connectDB;