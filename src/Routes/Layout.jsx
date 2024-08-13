import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import Category from "../Components/Category";

function Layout() {
  const [value, setValue] = useState(false);
  const [input, setInput] = useState(" ");
  const [name, setName] = useState("sign in");
  const [categories, setCategories] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  function logOut() {
    if (name !== "sign in") {
      localStorage.removeItem("token");
      localStorage.removeItem("total");
      localStorage.removeItem("cart");
    }
  }

  window.addEventListener("storage", () => {
    setCartCounter(JSON.parse(localStorage.getItem("cart")).length);
  });

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCartCounter(JSON.parse(localStorage.getItem("cart")).length);
    }
  }, [cartCounter]);

  async function check() {
    if (localStorage.getItem("token")) {
      try {
        const request = await axios.post(
          "http://localhost:3000/api/buyer/token",
          {
            token: localStorage.getItem("token"),
          }
        );

        setName(request.data.name);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");

      setCategories(response.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  function showNav() {
    setValue(true);
    document.body.style.overflow = "hidden";
  }

  function hidenav() {
    setValue(false);
    document.body.style.overflow = "visible";
  }

  return (
    <>
      <header className="bg-[#3E64DA]">
        <div className="w-full grid grid-cols-3 items-center justify-between text-white p-5">
          <div className="w-fit border border-transparent border-solid rounded cursor-pointer">
            <Link to="/">
              <img
                src="/images/logo-nobg-white.png"
                alt=""
                className="w-[100px] h-[60px]"
              />
            </Link>
          </div>

          <form className="h-8 flex justify-self-center rounded overflow-hidden">
            <input
              type="search"
              placeholder="Search by name or category"
              className="w-96 px-3 text-black outline-none"
              onChange={(e) => setInput(e.target.value)}
            />

            <Link to={"/search/" + input}>
              <button type="submit">
                <div className="text-black px-2 py-1 rounded-r bg-orange-300 hover:bg-[orangered] cursor-pointer">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </button>
            </Link>
          </form>

          <div className="flex justify-self-end justify-center items-center">
            <div className="sign p-2.5 pr-[15px] text-left rounded cursor-pointer relative border border-transparent border-solid">
              <span className="block text-[10px] text-[#c7c3c7]">
                Hello, {name}
              </span>

              <span className="after:absolute after:content-[''] after:border-[4px] after:border-solid after:border-b-transparent after:border-l-transparent after:bottom-0 after:right-[-10px] after:border-r-transparent after:border-t-white  relative font-[700] text-[12px]">
                Account & list
              </span>

              <div className="bg-white absolute w-[400px] left-[-100px] rounded hidden list-lan after:left-[190px] after:content-[''] after:absolute after:border-[5px] after:border-solid after:border-l-transparent after:border-b-white after:top-[-9px] after:border-r-transparent after:border-t-transparent cursor-default">
                <div className="w-fit mx-auto text-center py-4">
                  <Link to="/login">
                    <button
                      onClick={logOut}
                      className="text-black bg-orange-400 px-16 py-1 mx-auto block rounded text-[13px]"
                    >
                      {name === "sign in" ? "Sign In" : "Log Out"}
                    </button>
                  </Link>

                  {name === "sign in" ? (
                    <Link to="/register">
                      <span className="text-black text-[10px]">
                        New Customer?
                      </span>
                      <span className="text-blue-700 text-[10px] ml-1">
                        Start here.
                      </span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>

                <div className="w-11/12 mx-auto border-b-[#eee] border-solid border-t"></div>

                <div className="text-black font-bold flex justify-around p-4">
                  <div>
                    <Link to="/settings">
                      <span className="text-[13px]">Your Account</span>
                    </Link>
                  </div>

                  <div>
                    <Link to="/history">
                      <span className="text-[13px]">Your Points</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgb(0,0,0,0.6)] fixed w-full h-full top-0 left-0 hidden"></div>

            <Link to="/history">
              <div className="p-2.5 rounded cursor-pointer pt-[20px] font-[700] Order border border-transparent border-solid ">
                Orders
              </div>
            </Link>

            <Link to="/cart">
              <div className="cart flex rounded p-2.5 cursor-pointer border border-transparent border-solid relative">
                <span className="absolute w-[20px] h-[20px] rounded-full bg-red-500 flex justify-center items-center left-[40px] top-[0px]">
                  {cartCounter}
                </span>

                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-[50px] h-[30px]"
                />

                <p className="text-[15px] pt-[10px]">Cart</p>
              </div>
            </Link>
          </div>
        </div>

        <Category categories={categories} showNav={showNav} />

        <FontAwesomeIcon
          icon={faXmark}
          onClick={hidenav}
          className={`absolute top-[10px] ${
            !value ? "left-[-30px]" : "left-[320px]"
          } duration-[0.3s] cursor-pointer h-[30px] text-white z-20`}
        />

        <nav
          className={`fixed  w-[300px] min-h-screen max-h-screen overflow-x-hidden bg-white z-20 top-0  duration-[0.3s] ${
            !value ? "left-[-300px]" : "left-[0px]"
          }`}
        >
          <Link to="/login">
            <div className=" bg-slate-800 text-white p-[20px] cursor-pointer">
              <FontAwesomeIcon icon={faUser} />
              <p className="inline-block ml-[5px]">Hello, {name}</p>
            </div>
          </Link>

          <ul className="text-left border-b border-[silver] border-solid">
            <li className={"p-[10px] text-[#111] font-bold"}>
              {"Navigation & Settings"}
            </li>

            <Link to="/history">
              <li
                onClick={hidenav}
                className={"cursor-pointer p-[10px] hover:bg-[#eee]"}
              >
                {"Purchase History"}
              </li>
            </Link>

            <Link to="/settings">
              <li
                onClick={hidenav}
                className={"cursor-pointer p-[10px] hover:bg-[#eee]"}
              >
                {"Your Account"}
              </li>
            </Link>

            <Link to="/support">
              <li
                onClick={hidenav}
                className="cursor-pointer p-[10px] hover:bg-[#eee]"
              >
                Support
              </li>
            </Link>

            <Link to="/login">
              <li
                onClick={logOut}
                className="cursor-pointer p-[10px] hover:bg-[#eee]"
              >
                {name === "sign in" ? "Sign in" : "Log Out"}
              </li>
            </Link>
          </ul>
        </nav>

        <div
          onClick={hidenav}
          className={`bg-[rgb(0,0,0,0.6)] absolute w-full h-full top-0 left-0 z-10 ${
            !value ? "hidden" : ""
          }`}
        ></div>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
