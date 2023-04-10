import mongoose from "mongoose";
const sigupSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member',
    }
}, { timestamps: true, versionKey: false })
export default mongoose.model('User', sigupSchema)