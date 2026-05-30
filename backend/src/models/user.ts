import { Schema, model, Types } from 'mongoose';

export interface ICartItem {
    productId: Types.ObjectId;
    quantity: number;
}

export interface IUser {
    email: string;
    passwordHash: string;
    createdAt: Date;
    cart: ICartItem[];
    favorites: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        trim: true 
    },
    passwordHash: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            }
        }
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

export const UserModel = model<IUser>('User', userSchema);