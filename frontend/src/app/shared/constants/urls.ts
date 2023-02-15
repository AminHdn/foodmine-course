const BASE_URL="http://localhost:5000";

export const FOODS_URL=BASE_URL+'/api/foods';

export const FOODS_TAGS_URL=FOODS_URL+'/tags';

export const FOODS_BY_SEARCH_URL=FOODS_URL+'/search/';

export const FOODS_BY_TAGS_URL=FOODS_URL+'/tag/';

export const FOOD_BY_ID_URL=FOODS_URL+'/';

export const USER_LOGIN_URL=BASE_URL+"/api/users/login";
export const USER_Register_URL=BASE_URL+"/api/users/register";


export const ORDERS_URL=BASE_URL+'/api/orders';
export const ORDER_CREATE_URL=ORDERS_URL+'/create';
export const ORDER_NEW_FOR_CREATE_USER_URL=ORDERS_URL+'/newOrderForCurrentUser';
