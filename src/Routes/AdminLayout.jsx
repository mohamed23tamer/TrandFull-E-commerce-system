import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";

import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

function logOut() {
  localStorage.removeItem("admin");
}

function AdminLayout() {
  async function checkLoggedIn() {
    if (localStorage.getItem("admin")) {
      try {
        const response = await axios.post(
          "http://localhost:3000/control/token",
          {
            token: localStorage.getItem("admin"),
          }
        );
      } catch (err) {
        localStorage.removeItem("admin");
        window.location.href = "http://localhost:5173/control/admin/login";
      }
    } else {
      window.location.href = "http://localhost:5173/control/admin/login";
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
            <Link to="/control/admin">
              <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                <div className="flex items-center">
                  <AiOutlineHome className="w-5 h-5 mr-2" />
                  Home
                </div>
              </li>
            </Link>

            <Link to="/control/admin/products">
              <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                <div className="flex items-center">
                  <AiOutlineProduct className="w-5 h-5 mr-2" />
                  Products
                </div>
              </li>
            </Link>

            <Link to="/control/admin/allBuyers">
              <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                <div className="flex items-center">
                  <RiAccountPinBoxLine className="w-5 h-5 mr-2" />
                  Buyers Accounts
                </div>
              </li>
            </Link>

            <Link to="/control/admin/allSellers">
              <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                <div className="flex items-center">
                  <VscAccount className="w-5 h-5 mr-2" />
                  Sellers Accounts
                </div>
              </li>
            </Link>

            <Link to="/control/admin/support">
              <li className="text-sm p-5 hover:cursor-pointer hover:bg-[#F39E31]">
                <div className="flex items-center">
                  <RiCustomerServiceLine className="w-5 h-5 mr-2" />
                  Support
                </div>
              </li>
            </Link>

            <Link to="/control/admin/login" onClick={logOut}>
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

export default AdminLayout;
