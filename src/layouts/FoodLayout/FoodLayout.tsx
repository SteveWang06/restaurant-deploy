import React, {useEffect} from 'react';
import Header from '../../components/shared/Header';
import { useAppDispatch, useAppSelector } from '../../store';
import userRequester from '../../services/requester/userRequester';
import { useNavigate } from 'react-router-dom';


export interface FoodLayoutProps {
    children?: React.ReactElement | React.ReactNode
}

const FoodLayout = ({children}: FoodLayoutProps) => {
  const {profile} = useAppSelector(state => state.restaurant.auth);
  const dispatch = useAppDispatch;
  const navigate = useNavigate()
  const fetchProfile = async () => {
    try {
      await userRequester.userFetchProfile();
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if(!profile) {
      fetchProfile()
    } 
  }, [])

  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default FoodLayout