import React from 'react';
import { Navigate } from 'react-router-dom';

// 这是一个检查用户是否已登录的函数。可以根据实际情况调整，比如检查 localStorage 或上下文中的用户信息。
const isAuthenticated = () => {
    return !!localStorage.getItem('loggedIn');
};

const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
