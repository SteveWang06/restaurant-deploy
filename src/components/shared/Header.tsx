import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/cuisine.png";
import avatar from "../../assets/avatar.jpg";
import { Button, Input, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Search } = Input;
import styles from "./Header.module.less";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addToCart,
  decrementCartItemQuantity,
  fetchAllFood,
  removeItemFormCart,
  selectCartTotalQuantity,
} from "../../store/restaurant/food";
import { DeleteFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { FoodType } from "../../types/FoodType";
import { logout } from "../../store/restaurant/auth";

const Header = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showCart, setshowCart] = useState<boolean>(false);
  const { profile } = useAppSelector((state) => state.restaurant.auth);
  const { cartList } = useAppSelector((state) => state.restaurant.food);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tabRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const quantityCart = cartList.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartList.reduce(
    (total, item) => total + item.quantity * item.food.price,
    0
  );

  const onSearch = (value: string) => {
    dispatch(fetchAllFood(value));
  };

  const handleDecrement = (foodId: string) => {
    dispatch(decrementCartItemQuantity(foodId));
  };

  const handleIncrement = (items: FoodType) => {
    const dataCart = { food: items, quantity: 1 };
    dispatch(addToCart(dataCart));
  };

  const handleRemoveItemCart = (foodId: string) => {
    dispatch(removeItemFormCart(foodId));
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired');
    dispatch(logout(undefined))
    setShowProfile(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) {
        setshowCart(false);
      }else if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      
    };
    document.addEventListener("click", handleClickOutside);
    
  }, []);

  return (
    <Layout className=" fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto h-20 flex items-center justify-between ">
        <div className="w-1/4">
          <img className="w-28" src={logo} alt="cuisine" />
        </div>

        <div className="flex items-end w-2/4 gap-8">
          <Link
            to={"/booking"}
            className="font-semibold text-lg hover:text-starYellow"
          >
            Booking
          </Link>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>

        <div className="w-1/4 text-right">
          {!profile && (
            <>
              <Button
                onClick={() => navigate("/login")}
                size="large"
                className="bg-black text-white hover:bg-starYellow mr-4"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                size="large"
                className="bg-black text-white hover:bg-starYellow "
              >
                Register
              </Button>
            </>
          )}

          {profile && (
            <div className="flex justify-end gap-8 items-end relative">
              <div ref={tabRef} className=" cursor-pointer relative">
                <span className="absolute -top-4 text-white font-medium rounded-full right-0 w-[20px] flex justify-center items-center h-[20px] bg-rose">
                  {quantityCart ? quantityCart : 0}
                </span>
                <ShoppingCartOutlined
                  onClick={() => setshowCart((current) => !current)}
                  className="text-3xl"
                />

                {showCart && cartList?.length > 0 && (
                  <div className={clsx("overflow-y-scroll absolute top-full right-0 bg-white py-10 px-5 shadow-lg w-[700px] ",{
                    'h-[360px]': cartList?.length === 2,
                    'h-[460px]': cartList?.length > 2,
                  })}>
                    {cartList?.map((ele: any, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className="py-2 flex items-center gap-4 border-b border-solid border-lightGray"
                        >
                          <div className="w-20 h-20">
                            <img
                              className="w-full h-full object-cover"
                              src={ele?.food?.image[0]?.image}
                              alt="..."
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-[16px] w-[350px] line-clamp-1">
                              {ele.food.food_name}
                            </h3>
                            <p className="text-rose">$ {ele?.food.price}</p>
                            <Button
                              onClick={() => handleDecrement(ele?.food.id)}
                            >
                              -
                            </Button>
                            <span>{ele?.quantity}</span>
                            <Button onClick={() => handleIncrement(ele?.food)}>
                              +
                            </Button>
                            <DeleteFilled
                              onClick={() => handleRemoveItemCart(ele?.food.id)}
                              className="text-3xl text-rose"
                            />
                          </div>
                        </div>
                      );
                    })}
                    <h3 className="px-4 mt-4 border border-solid bg-roseBg border-roseBorder rounded-sm text-lg font-medium ">
                      $ {totalPrice}
                    </h3>

                    <Button 
                    onClick={() => navigate('/order')}
                    className="font-medium hover:bg-transparent bg-starYellow hover:text-starYellow mt-5 block">
                      Order
                    </Button>
                  </div>
                )}
              </div>
              <div
              ref={avatarRef}
                onClick={() => setShowProfile((current) => !current)}
                className={clsx(
                  "w-16 h-16 rounded-full overflow-hidden border-2 border-solid border-white hover:border-blueSee transition-all duration-200 cursor-pointer",
                  styles.avatar
                )}
              >
                <img
                  className="object-cover"
                  src={profile?.avatar || avatar}
                  alt="avatar"
                />
              </div>
              {showProfile && (
                <div  className={clsx(styles.propfile, "text-left px-10")}>
                  <h3 className="text-lg">{profile?.name}</h3>
                  <p className="py-4">{profile?.email}</p>
                  <p>{profile?.phone}</p>
                  <Button 
                  onClick={() => navigate('/admin/home')}
                  className="mt-5 w-full">Admin Page</Button>
                  <Button 
                  onClick={handleLogout}
                  className="mt-5 w-full">Logout</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Header;
