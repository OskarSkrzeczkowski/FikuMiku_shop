import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    img: string;
    slug: string;
    category?: string;
    tag?: string;
}


const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: false },
    tag: { type: String, required: false }
}, { 
    timestamps: true 
});

export default mongoose.model<IProduct>('Product', productSchema);