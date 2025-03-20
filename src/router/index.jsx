import { createHashRouter } from "react-router-dom";
import FrountLayout from "../layout/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CheckoutFormPage from "../pages/CheckoutFormPage";
import CheckoutPaymentPage from "../pages/CheckoutPaymentPage";
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import AdminLayout from "../layout/adminLayout";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminCouponPage from "../pages/admin/AdminCouponPage"
const router = createHashRouter([
    {
        path: '/',
        element: <FrountLayout />,
        children: [
            {
                path:'',
                element: <HomePage />,
            },
            {
                path:'products',
                element: <ProductsPage />,
            },
            {
                path:'products/:id',
                element: <ProductDetailPage />,
            },
            {
                path:'cart',
                element: <CartPage />,
            },
            {
                path: 'checkout-form',
                element:<CheckoutFormPage />
            },
            {
                path: 'checkout-payment/:id',
                element:<CheckoutPaymentPage />
            },
            {
                path: 'checkout-success',
                element:<CheckoutSuccessPage />
            }
        ]
    },
    {
        path: '/Login',
        element: <LoginPage />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path:'products',
                element: <AdminProductsPage />,
            },
            {
                path:'orders',
                element: <AdminOrdersPage />,
            },
            {
                path:'coupon',
                element: <AdminCouponPage />,
            },
        ]
    },
    {
        path:'*',
        element: <NotFound />,
    }
])

export default router