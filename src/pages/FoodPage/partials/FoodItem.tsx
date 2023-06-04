import React from "react";
import food from "../../../assets/download.jpg";
import { Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FoodItemProps } from "../../../types/FoodType";
import { useAppDispatch, useAppSelector } from "../../../store";
import {  addToCart } from "../../../store/restaurant/food";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ data }: FoodItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {profile} = useAppSelector(state => state.restaurant.auth);

  const handleAddToCart = (value: any) => {
    if(!profile) {
      navigate('/login')
    }
    const dataDispatch = {food: value, quantity: 1}
    dispatch(addToCart(dataDispatch))
  } 

  

  return (
    <div className="shadow-lg flex flex-col rounded-md overflow-hidden h-[600px] border border-solid border-lineGray">
      <div className="w-full h-1/2 overflow-hidden">
        <img className="object-cover w-full h-full hover:scale-105 transition-all duration-300 cursor-pointer" src={data?.image[0]?.image} alt="" />
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-medium capitalize line-clamp-2 h-[60px] cursor-pointer hover:text-starYellow transition-all duration-300">{data.food_name}</h1>
          <p className="mt-2 line-clamp-3 h-[77px]">{data?.description}</p>
          <Rate
            className="pb-2 text-blueSee text-[14px]"
            disabled
            defaultValue={4}
          />
          <div className="px-4 py-2 bg-lightGray rounded-lg shadow-inner">
            <p className="font-semibold text-rose text-xl">$ {data?.price}</p>
          </div>
        </div>

        <div className="flex gap-8 mt-4">
          <Button
          onClick={() => {
            if(!profile) {
              navigate('/login')
            }else {
              handleAddToCart(data);
              navigate('/order');
            }           
          }}
          >Order</Button>
          <Button 
            onClick={() => handleAddToCart(data)}
          className="flex items-center">
            <ShoppingCartOutlined />
            <span>Add to card</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
