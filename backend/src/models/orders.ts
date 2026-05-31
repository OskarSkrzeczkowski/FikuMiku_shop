import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customer: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postalCode: string;
        deliveryMethod: string;
    };
    items: Array<{
        _id: string;
        name: string;
        price: number;
        quantity: number;
        img: string;
    }>;
    totalPrice: number;
    createdAt: Date;
    status: string;
}

const orderSchema: Schema = new Schema({
    customer: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        deliveryMethod: { type: String, required: true }
    },
    items: [
        {
            _id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            img: { type: String, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' }
}, {
    timestamps: true
});

export default mongoose.model<IOrder>('Order', orderSchema);