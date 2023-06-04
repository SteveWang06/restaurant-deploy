import Wrapper from "../../components/shared/Wrapper";
import React, { useEffect } from "react";
import FoodItem from "./partials/FoodItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllFood } from "../../store/restaurant/food/reducer";
import { FoodType } from "types/FoodType";
import { userLogin } from "../../store/restaurant/auth";

const FoodPage = () => {
  const dispatch = useAppDispatch();
  const { food } = useAppSelector((state) => state.restaurant.food);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if(token) {
      dispatch(userLogin())
    }
  }, []);

  useEffect(() => {
    
    dispatch(fetchAllFood(''));
  }, []);

  return (
    <Wrapper className="mt-20">
      <div className="grid grid-cols-12 gap-8">
        {food?.map((ele: FoodType, index: number) => (
          <div className="col-span-4">
            <FoodItem key={ele.id} data={ele} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default FoodPage;
