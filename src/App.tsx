import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Routes, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import PrivateRoute from "./components/Protected/AuthUser";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Orders from "./pages/order/Orders";
import SignInSide from "./components/login/Login";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <ThemeProvider theme={darkTheme}>
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
      </ThemeProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PrivateRoute element={<Home />} />,
        },
        {
          path: "/users",
          element: <PrivateRoute element={<Users />} />,
        },
        {
          path: "/products",
          element: <PrivateRoute element={<Products />} />,
        },
        {
          path: "/users/:id",
          element: <PrivateRoute element={<User />} />,
        },
        {
          path: "/products/:id",
          element: <PrivateRoute element={<Product />} />,
        },
        {
          path: "/orders",
          element: <PrivateRoute element={<Orders />} />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignInSide />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
