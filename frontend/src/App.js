import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import UserProfile from "./pages/user/UserProfile";
import OrderDetails from "./pages/user/OrderDetails";
import UserOrder from "./pages/user/UserOrder";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserChatRoutes from "./components/user/UserChatRoutes";

function App() {
  return (
    <h2>Hello</h2>
    // <BrowserRouter>
    //   <Header />
    //   <Routes>
    //     <Route element={<UserChatRoutes />}>
    //       <Route path="/" element={<Home />} />

    //       <Route path="/cart" element={<Cart />} />

    //       <Route path="/login" element={<Login />} />

    //       <Route path="/register" element={<Register />} />

    //       <Route path="/list" element={<ProductList />} />

    //       <Route path="/detail" element={<ProductDetail />} />

    //       <Route path="*" element="Page not found" />

    //       <Route element={<ProtectedRoutes />}>
    //         <Route path="/user" element={<UserProfile />} />

    //         <Route path="/user/order-details" element={<OrderDetails />} />

    //         <Route path="/usercart" element={<userCart />} />

    //         <Route path="/user/order" element={<UserOrder />} />
    //       </Route>
    //     </Route>

    //     {/* admin pages */}
    //   </Routes>
    //   <Footer />
    // </BrowserRouter>
  );
}

export default App;
