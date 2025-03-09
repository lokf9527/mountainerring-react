import { createHashRouter } from "react-router-dom";
import FrountLayout from "../layout/FrontLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import NotFount from "../pages/NotFound";
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
        ]
    },
    {
        path:'*',
        element: <NotFount />,
    }
])

export default router