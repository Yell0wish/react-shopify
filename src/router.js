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
import SearchResultsPage from "./Pages/SearchResults";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: "home",
                element: <ProtectedRoute element={<HomePage />} />,
            },
            {
                path: 'search-results',
                element: <ProtectedRoute element={<SearchResultsPage />} />,
            },
            {
                path: "my",
                element: <ProtectedRoute element={<MyPage />} />,
            },
            {
                path: "cart",
                element: <ProtectedRoute element={<CartPage />} />,
            },
            {
                path: "category",
                element: <ProtectedRoute element={<CategoryPage />} />,
            },
            {
                path: "good/:id",
                element: <ProtectedRoute element={<GoodPage />} />,
            },
            {
                path: "order-submit/:cart_id",
                element: <ProtectedRoute element={<OrderSubmissionPage />} />,
            },
            {
                path: "order/:order_id",
                element: <ProtectedRoute element={<OrderDetailsPage />} />,
            },
            {
                path: "pay/:order_id",
                element: <ProtectedRoute element={<PayPage />} />
            },
            {
                path: "subcategory/:subcategory_id",
                element: <ProtectedRoute element={<SubcategoryPage />} />
            },
            {
                path: "address-management",
                element: <ProtectedRoute element={<AddressPage />} />
            },
            {
                path: "orders/:state",
                element: <ProtectedRoute element={<OrdersPage />} />
            }
        ],
    },
]);

export default router;
