
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