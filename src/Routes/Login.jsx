import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

async function checkLoggedIn() {
  if (localStorage.getItem("token")) {
    try {
      const request = await axios.post(
        "http://localhost:3000/api/buyer/token",
        {
          token: localStorage.getItem("token"),
        }
      );

      window.location.href = "http://localhost:5173/";
      return true;
    } catch (err) {
      localStorage.removeItem("token");
      return true;
    }
  } else {
    localStorage.removeItem("token");
    return false;
  }
}

function Login() {
  const [fields, setFields] = useState({
    logEmail: "",
    logPass: "",
  });

  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const err = {};

    if (!fields.logEmail) {
      err.logEmailError = "Email is required";
    }
    if (!fields.logPass) {
      err.logPassError = "Password is required";
    }

    if (Object.keys(err).length) {
      setErrors(err);
    } else {
      try {
        const request = await axios.post("http://localhost:3000/login", {
          email: fields.logEmail,
          password: fields.logPass,
        });

        if (request) {
          localStorage.setItem("token", request.data.token);
          window.location.href = "http://localhost:5173/";
        }
      } catch (error) {
        setErrors({
          logPassError: "Invalid email or password.",
        });
      }
    }
  };

  if (checkLoggedIn()) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="my-5 mx-auto w-fit">
          <img src="/images/logo-nobg.png" alt="" className="w-[150px]" />
        </div>

        <div className="container w-[90%] sm:w-96 mr-auto ml-auto">
          <form
            className="sign-form rounded-md border-solid border-[#e1e1e1] border w-full p-6 mb-4"
            onSubmit={handleLoginSubmit}
          >
            <h2 className="text-left mb-2 text-3xl font-normal">Sign in</h2>
            <div className="field-container mb-5">
              <label
                htmlFor="email"
                className="text-left block mb-1 font-bold text-[13px]	"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                name="logEmail"
                value={fields.logEmail}
                id="email"
                type="text"
                className={`outline-none block border-solid ${
                  errors.logEmailError ? `border-red-500` : `border-[#b5b5b5]`
                }	border rounded w-full	h-8 pl-1.5 field-shadow`}
              />
              {errors.logEmailError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className="text-[13px] text-red-500">
                    {errors.logEmailError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="field-container mb-5 relative">
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="font-bold text-[13px]	">
                  Password
                </label>
              </div>
              <input
                onChange={handleChange}
                id="password"
                type="password"
                name="logPass"
                value={fields.logPass}
                className={`outline-none block border-solid ${
                  errors.logPassError ? `border-red-500` : `border-[#b5b5b5]`
                }	border rounded w-full	h-8 pl-1.5 field-shadow`}
              />

              {visible ? (
                <AiOutlineEye
                  className="absolute top-[32px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setVisible(!visible);
                    document
                      .getElementById("password")
                      .setAttribute("type", "password");
                  }}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute top-[32px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setVisible(!visible);
                    document
                      .getElementById("password")
                      .setAttribute("type", "text");
                  }}
                />
              )}
              {errors.logPassError ? (
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className=" text-red-600 text-[13px]">
                    {errors.logPassError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="block mt-5 w-full bg-[#3E64DA] text-[white] p-2 rounded-lg text-[13px]"
            >
              Sign in
            </button>
          </form>
        </div>

        <div className="text-[13px] text-center text-[gray] mb-3">
          New to Trendful?
        </div>

        <Link
          to="/register"
          className="w-96 text-center p-1 rounded-lg text-[13px] border-solid	border-[#e1e1e1] border hover:bg-[#edfdff]"
        >
          Create your Trendful account
        </Link>

        <Link
          to="/seller/login"
          className="text-[13px] text-center text-blue-600 mt-10 hover:text-orange-500 transition-colors duration-300"
        >
          Your Seller Account
        </Link>
      </div>
    );
  }
}

export default Login;
