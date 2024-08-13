import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";

import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

function logOut() {
  localStorage.removeItem("sellerToken");
}

function SellerLayout() {
  const [render, setRender] = useState(false);

  async function checkLoggedIn() {
    if (localStorage.getItem("sellerToken")) {
      try {
        const request = await axios.post(
          "http://localhost:3000/api/seller/token",
          {
            token: localStorage.getItem("sellerToken"),
          }
        );

        setRender(true);
      } catch (err) {
        localStorage.removeItem("sellerToken");
        window.location.href = "http://localhost:5173/seller/login";
      }
    } else {
      window.location.href = "http://localhost:5173/seller/login";
    }
  }

  checkLoggedIn();

  if (render) {
    return (
      <div className="flex">
        <div className="mr-48">
          <aside className="w-48 min-h-screen bg-[#3E64DA] text-white fixed">
            <div className="flex justify-center items-center pt-6 pb-4">
              <div className="flex justify-center items-center">
                <img
                  src="/public/images/logo-nobg-white.png"
                  alt=""
                  className="w-32"
                />
              </div>
            </div>

            <ul>
              <Link to="/seller">
                <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                  <div className="flex items-center">
                    <AiOutlineProduct className="w-5 h-5 mr-2" />
                    Products
                  </div>
                </li>
              </Link>

              <Link to="/seller/inventory">
                <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                  <div className="flex items-center">
                    <MdOutlineInventory2 className="w-5 h-5 mr-2" />
                    Inventory
                  </div>
                </li>
              </Link>

              <Link to="/seller/history">
                <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                  <div className="flex items-center">
                    <GoChecklist className="w-5 h-5 mr-2" />
                    Orders
                  </div>
                </li>
              </Link>

              <Link to="/seller/settings">
                <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                  <div className="flex items-center">
                    <IoSettingsOutline className="w-5 h-5 mr-2" />
                    Settings
                  </div>
                </li>
              </Link>

              <Link to="/seller/login" onClick={logOut}>
                <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                  <div className="flex items-center">
                    <GrLogout className="w-5 h-5 mr-2" />
                    Log Out
                  </div>
                </li>
              </Link>
            </ul>
          </aside>
        </div>

        <Outlet />
      </div>
    );
  }
}

export default SellerLayout;
