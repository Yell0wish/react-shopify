import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/DashBoard/Dashboard";

import PrivateRoute from './PrivateRoute';
import UserList from "./pages/UserManagement/UserList";
import OrderList from "./pages/OrderManagement/OrderList";
import ProductList from "./pages/ProductManagement/ProductList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: "permissions/user-list",
                element: <UserList />,
            },
            {
                path: "permissions/role-list",
                element: <div>角色列表页面</div>,
            },
            {
                path: "permissions/menu-list",
                element: <div>菜单列表页面</div>,
            },
            {
                path: "permissions/resource-list",
                element: <div>资源列表页面</div>,
            },
            {
                path: "products",
                element: <ProductList />,
            },
            {
                path: "orders",
                element: <OrderList />,
            },
            {
                path: "marketing",
                element: <div>营销页面</div>,
            },
        ],
    },
]);
export default router;
