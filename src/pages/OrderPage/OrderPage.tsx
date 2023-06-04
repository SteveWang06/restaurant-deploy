import { useAppDispatch, useAppSelector } from "../../store";
import Wrapper from "../../components/shared/Wrapper";
import React, { Key, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import userRequester from "../../services/requester/userRequester";
import { CartType } from "../../types/FoodType";
import Swal from "sweetalert2";
import { addToCart, removeCart } from "../../store/restaurant/food";

const OrderPage = () => {
  const { cartList } = useAppSelector((state) => state.restaurant.food);
  const { profile } = useAppSelector((state) => state.restaurant.auth);
  const navigate = useNavigate();
  const dispath = useAppDispatch()
  useEffect(() => {
    if(!profile) {
      navigate('/food')
    }
    if (cartList.length <= 0) {
      navigate("/food");
    }
  }, []);

  const handleOrderFood = async () => {
    try {
      if(!profile) {
        navigate('/login')
      }
      if (profile && cartList) {
        const orderData = {
          user_id: profile.id,
          foods: cartList.map((ele: any) => {
            return { food_id: ele.food.id, quatity: Number(ele.quantity) };
          }),
        };
        await userRequester.userOrderFood(orderData);
        await dispath(removeCart([]));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/food");
      }
    } catch (err) {
      await dispath(removeCart([]));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Order fail!",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/food");
    }
  };
  return (
    <Wrapper className="mt-20">
      <h1 className="text-3xl border-b border-solid pb-5">Order And Payment</h1>

      <div className="grid grid-cols-12 mt-5 gap-4">
        <div className="col-span-7">
          {cartList?.map((ele: any, index: Key) => {
            return (
              <div
                key={index}
                className="mb-4 pr-4 flex items-center gap-4 border border-solid border-lineGray rounded-tl-md rounded-bl-md overflow-hidden"
              >
                <div className="w-1/4 h-[150px] overflow-hidden ">
                  <img
                    className="w-full h-full object-cover"
                    src={ele?.food?.image[0].image}
                    alt={ele?.food.food_name}
                  />
                </div>
                <div className="w-3/4 ">
                  <h1 className="text-xl font-medium">{ele?.food.food_name}</h1>
                  <p className="mt-2 line-clamp-2">{ele?.food.description}</p>
                  <span></span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-5">
          <div className="border border-soid border-lineGray shadow-lg">
            <h2 className="text-center border-b border-lineGray py-2 text-2xl font-medium">
              Total Bill
            </h2>
            <div className="p-5">
              {cartList.map((ele: any, key: Key) => {
                return (
                  <div
                    key={key}
                    className="flex justify-between border-b bordere-solid border-lineGrey pb-2 last-of-type:border-b-0 last-of-type:pb-0"
                  >
                    <h5 className="text-lg font-medium">
                      {ele.food.food_name}
                    </h5>
                    <span className="font-medium text-rose">
                      $ {ele.food.price}
                    </span>
                    <span>{ele.quantity}</span>
                  </div>
                );
              })}
              <div className="flex justify-between pt-2">
                <span className="text-lg font-medium ">Total: </span>
                <span className="text-lg font-medium text-rose">
                  ${" "}
                  {cartList.reduce(
                    (total, item) => total + item.food.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="mt-5">
                <Button
                  onClick={handleOrderFood}
                  className="w-full font-medium bg-starYellow hover:bg-transparent"
                >
                  Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderPage;
