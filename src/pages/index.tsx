import ErrorPage from "./ErrorPage";
export const NotFoundPage = ErrorPage[404];
export const ServerErrorPage = ErrorPage[500];
export const NoAuthorizedPage = ErrorPage[403];


export {default as HomePage} from './home';
export {default as LoadingPage} from './LoginPage';
export {default as LoginPage} from './LoginPage';
export {default as FoodPage} from './FoodPage';
export {default as CalenderWorkPage} from './CalendarWorkPage';