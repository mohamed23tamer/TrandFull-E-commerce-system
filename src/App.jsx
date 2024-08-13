import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Routes/Login";
import Register from "./Routes/Register";

import Layout from "./Routes/Layout";
import Home from "./Routes/Home";
import YourAccount from "./Routes/YourAccount";
import ProductPage from "./Routes/ProductPage";
import SearchPage from "./Routes/SearchPage";
import Cart from "./Routes/Cart";
import Payment from "./Routes/Payment";
import PurchaseHistory from "./Routes/PurchaseHistory";
import BuyerChat from "./Routes/BuyerChat";

import SellerLogin from "./Routes/SellerLogin";
import SellerRegister from "./Routes/SellerRegister";

import SellerLayout from "./Routes/SellerLayout";
import SellerProducts from "./Routes/SellerProducts";
import SellerInventory from "./Routes/SellerInventory";
import SellerOrders from "./Routes/SellerOrders";
import SellerAccount from "./Routes/SellerAccount";

import AdminLogin from "./Routes/AdminLogin";

import AdminLayout from "./Routes/AdminLayout";
import AdminHome from "./Routes/AdminHome";
import AdminProducts from "./Routes/AdminProducts";
import AdminBuyersAccounts from "./Routes/AdminBuyersAccounts";
import AdminSellersAccounts from "./Routes/AdminSellersAccounts";
import AdminChat from "./Routes/AdminChat";

import ErrorPage from "./Routes/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<YourAccount />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="search/" element={<SearchPage />} />
          <Route path="search/:word" element={<SearchPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="history" element={<PurchaseHistory />} />
          <Route path="checkout" element={<Payment />} />
          <Route path="support" element={<BuyerChat />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="seller/login" element={<SellerLogin />} />
        <Route path="seller/register" element={<SellerRegister />} />

        <Route path="seller/" element={<SellerLayout />}>
          <Route index element={<SellerProducts />} />
          <Route path="inventory" element={<SellerInventory />} />
          <Route path="history" element={<SellerOrders />} />
          <Route path="settings" element={<SellerAccount />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="control/admin/login" element={<AdminLogin />} />

        <Route path="control/admin/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="allBuyers" element={<AdminBuyersAccounts />} />
          <Route path="allSellers" element={<AdminSellersAccounts />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="control/admin/support" element={<AdminChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
