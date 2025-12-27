import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI


const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log("Already Connected")
    }
    if (connectionState === 2) {
        console.log("Connecting...")
    }
    try {
        mongoose.connect(MONGODB_URI, {
           dbName:('AppDB'),
           bufferCommands:true
        })
        console.log("Connected")
    } catch (error) {
    console.log("Error",error)
    throw new Error("Error:",error)
    }

}
export default connect;