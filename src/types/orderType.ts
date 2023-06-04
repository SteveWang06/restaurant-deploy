export interface FoodOrderType  {
    id: string;
    quatity: number;
    food_name: string;
    description: string;
    price: number;
    image: string[];
}

export interface OrderType {
    id: string;
    status_type: string;
    role: number;
}

export interface OrderListType {
    id: string;
    total_price: number;
    order_status_id: string;
    user_id: string;
    user: {
        email: string;
        name: string;
        phone: string;
        avatar: string;
    };
    order_status: OrderType;
    food: FoodOrderType[];
}