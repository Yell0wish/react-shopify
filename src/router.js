import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import App from "./App";
import MyPage from "./Pages/MyPage";
import CartPage from "./Pages/CartPage";
import CategoryPage from "./Pages/CategoryPage";
import GoodPage from "./Pages/GoodPage";

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
                index: true,
                element: <LoginPage />,
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
            }
        ],
    },
]);

export default router;