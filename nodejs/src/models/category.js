import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
    {
        name: {
            type: String,
        },
        slug: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);