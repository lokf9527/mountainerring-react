import { NavLink, Outlet } from "react-router-dom"

const routes = [
    { path: "/", name: "前台首頁" },
    { path: "/admin/products", name: "產品列表" },
    { path: "/admin/orders", name: "訂單" },
    { path: "/admin/coupon", name: "優惠卷" },
  ];

export default function AdminLayout () {
    
    return (
        <>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container">
                    <ul className="navbar-nav flex-row gap-5 fs-5">
                        {routes.map((route) =>(
                            <li key={route.path} className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={route.path}>{route.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}