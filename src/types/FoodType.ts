export interface FoodType  {
    id: string;
    food_name: string;
    description: string;
    price: number;
    createAt: any;
    updateAt: any;
    image: {
        id: string;
        image: string;
    }[],
    oder: any;
}

export interface FoodItemProps {
    data: FoodType[] | any;
}

export interface PaginationType {
    keyWord: string;
}

export interface OrderFoodType {
    user_id: string;
    foods: {
        food_id: string;
        quantity: number;
    }[],
}

export interface CartType {
    food: FoodType[];
    quatity: number;
}