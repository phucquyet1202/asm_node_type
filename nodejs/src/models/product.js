import mongoose from "mongoose";
const { Schema } = mongoose
const productSchema = new Schema({
    name: {
        type: String
    },
    price: Number,
    original_price: Number,
    short_description: String,
    images: [
        {
            base_url: String
        }
    ],

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, { timestamps: true, versionKey: false })

export default mongoose.model('Product', productSchema)

