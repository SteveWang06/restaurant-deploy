import  paths  from "../constants/paths";
import React from 'react'
import { RouteObject, Outlet, Navigate } from "react-router-dom";
import { LoginPage, NoAuthorizedPage, NotFoundPage } from '../pages';
import { HomePage } from "../pages";
import { StoreState, useAppSelector } from "../store";
import { AuthStatus } from "../constants/authConst";
import { AppLayout, FoodLayout } from "../layouts";
const OrderPage = React.lazy(() => import("../pages/OrderPage/OrderPage")) ;
const FoodPage = React.lazy(() => import('../pages/FoodPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'))
const CalenderWorkPage = React.lazy(() => import('../pages/CalendarWorkPage'));

export interface PrivateRouteProps {
    renderIfTrue?: (state: StoreState) => boolean;
    children: React.ReactElement;
    fallBackComponent?: React.ReactElement;
}


export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const {
        renderIfTrue,
        children,
        fallBackComponent = <NoAuthorizedPage />,
      } = props;
    const store = useAppSelector((store) => store);

    if((renderIfTrue && renderIfTrue(store)) || !renderIfTrue) {
        return children
    }

    return fallBackComponent;

};


const extendedRoutes: RouteObject[] = [
    
    {
        path: paths.home,
        element: <HomePage />
    },
    {
        path: paths.calendarWork,
        element: <CalenderWorkPage />
    }
];

const foodLayoutRoutes: RouteObject[] = [
    {
        index: true,
        path: paths.food,
        element: <FoodPage />
    },
    {
        path: 'order',
        element: <OrderPage />
    }
]

const Routes: RouteObject[] = [
    {
        path: paths.default,
        element: (
            <FoodLayout >
                <Outlet />
            </FoodLayout>
        ),
        children: [
            ...foodLayoutRoutes,
            {
                path: '*',
                element: <FoodPage />
            }
        ]
    },
    {
        path: paths.admin,
        element: (
        //     <PrivateRoute
        //     renderIfTrue={(state) => state.restaurant.auth.status === AuthStatus.Auth}
        //     fallBackComponent={<Navigate to={"/login"} />}
        //   >
          <AppLayout>
            <Outlet />
          </AppLayout>
        //   </PrivateRoute>
        ),
        children:  [
            ...extendedRoutes,
            {
                path: '*',
                element: <NotFoundPage/>
            },
        ],
    },
    {
        path: paths.login,
        element: (
            <LoginPage />
        )
    },
    {
        path: paths.register,
        element: <RegisterPage />
    }
];

export default Routes;