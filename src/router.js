import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import App from "./App";
import MyPage from "./Pages/MyPage";
import CartPage from "./Pages/CartPage";
import CategoryPage from "./Pages/CategoryPage";
import GoodPage from "./Pages/GoodPage";
import OrderSubmissionPage from "./Pages/OrderSubmissionPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import PayPage from "./Pages/PayPage";
import SubcategoryPage from "./Pages/SubcategoryPage";
import AddressPage from "./Pages/AddressPage";
import OrdersPage from "./Pages/OrdersPage";
import searchResults from "./Pages/SearchResults";
import SearchResultsPage from "./Pages/SearchResults";
import RegisterPage from "./Pages/RegisterPage";


const router = createBrowserRouter([
    { 
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: 'search-results',
                element: <SearchResultsPage />,
            },
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: "my",
                element: <MyPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "category",
                element: <CategoryPage />,
            },
            {
                path: "good/:id",
                element: <GoodPage />,
            },
            {
                path: "order-submit/:cart_id",
                element: <OrderSubmissionPage />,
            },
            {
                path: "order/:order_id",
                element: <OrderDetailsPage />,
            },
            {
                path: "pay/:order_id",
                element: <PayPage />
            },
            {
                path: "subcategory/:subcategory_id",
                element: <SubcategoryPage />
            },
            {
                path: "address-management",
                element: <AddressPage />
            },
            {
                path: "orders/:state",
                element: <OrdersPage />
            }
        ],
    },
]);

export default router;