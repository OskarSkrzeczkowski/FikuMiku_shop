
export interface Product {
    _id: string;
    name: string;
    price: number; 
    img: string;
    slug: string;
    category?: string; 
    tag?: string;      
}

export interface CartItem extends Product {
    quantity: number;
}

export type FavoriteItem = Product;

export interface User {
    email: string;

}
export interface ShippingDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    deliveryMethod: 'courier' | 'parcel_locker' | 'pickup';
}

export interface Order {
    _id?: string;
    customer: ShippingDetails;
    items: CartItem[];
    totalPrice: number;
    createdAt: string;
    status: 'pending' | 'processing' | 'completed';
}