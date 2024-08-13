import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
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

function Register() {
  const [fields, setFields] = useState({
    regName: "",
    regEmail: "",
    regPass: "",
    rePass: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    if (errors) {
      if (e.target.name === "regEmail") {
        setErrors({ ...errors, regMailError: "" });
      } else if (e.target.name === "regPass") {
        setErrors({ ...errors, regPassError: "" });
      } else if (e.target.name === "regName") {
        setErrors({ ...errors, regNameError: "" });
      } else if (e.target.name === "rePass") {
        setErrors({ ...errors, regRePassError: "" });
      }
    }
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();

    const err = {};

    const passReg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;

    const phoneReg = /\+20\d{11}/;

    const mailReg = /([a-z]|[A-Z])([\w-])*@[\w-]+.com/;

    if (!fields.regName) {
      err.regNameError = "Name is required";
    }

    if (!fields.regEmail) {
      err.regMailError = "Email is required";
    } else if (
      !mailReg.test(fields.regEmail) &&
      !phoneReg.test(fields.regEmail)
    ) {
      err.regMailError = "Invalid email.";
    }

    if (!fields.regPass) {
      err.regPassError = "Password is required";
    } else if (!passReg.test(fields.regPass)) {
      err.regPassError = "Invalid password.";
    }

    if (fields.rePass != fields.regPass) {
      err.regRePassError = "Passwords must be identical.";
    }

    if (Object.keys(err).length) {
      setErrors(err);
    } else {
      try {
        const request = await axios.post("http://localhost:3000/register", {
          name: fields.regName,
          email: fields.regEmail,
          password: fields.regPass,
        });

        if (request) {
          localStorage.setItem("token", request.data.token);
          window.location.href = "http://localhost:5173/";
        }
      } catch (error) {
        setErrors({ regMailError: "Email already exists." });
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
            className="sign-form rounded-md border-solid border-[#e1e1e1] border w-full p-6 mb-6"
            onSubmit={handleRegSubmit}
          >
            <h2 className="text-left mb-2 text-3xl font-normal">
              Create account
            </h2>

            <div className="field-container mb-5">
              <label
                htmlFor="name"
                className="text-left block mb-1 font-bold text-[13px]	"
              >
                Your name
              </label>

              <input
                onChange={handleChange}
                name="regName"
                value={fields.regName}
                id="name"
                type="text"
                className={`outline-none block border-solid	${
                  errors.regNameError ? `border-red-500` : `border-[#b5b5b5]`
                } border rounded w-full	h-8 pl-1.5 field-shadow text-[13px]"`}
                placeholder="First and last name "
              />

              {errors.regNameError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className=" text-red-600 text-[13px]">
                    {errors.regNameError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="field-container mb-5">
              <label
                htmlFor="reg-email"
                className="text-left block mb-1 font-bold text-[13px]	"
              >
                Email
              </label>

              <input
                onChange={handleChange}
                name="regEmail"
                value={fields.regEmail}
                id="reg-email"
                type="text"
                className={`outline-none block border-solid	${
                  errors.regMailError ? `border-red-500` : `border-[#b5b5b5]`
                }
 border rounded w-full	h-8 pl-1.5 field-shadow`}
              />

              {errors.regMailError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className=" text-red-600 text-[13px]">
                    {errors.regMailError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="field-container mb-5">
              <label htmlFor="reg-password" className="font-bold text-[13px]	">
                Password
              </label>

              <input
                onChange={handleChange}
                name="regPass"
                value={fields.regPass}
                id="reg-password"
                type="password"
                className={`outline-none block border-solid	${
                  errors.regPassError ? `border-red-500` : `border-[#b5b5b5]`
                } border rounded w-full	h-8 pl-1.5 field-shadow text-sm`}
                placeholder="At least 8 characters"
              />

              {errors.regPassError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className=" text-red-600 text-[13px]">
                    {errors.regPassError}
                  </span>
                </div>
              ) : (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamation} className="mr-3" />
                  <span className="text-[13px]">
                    Password must be at least 8 characters
                  </span>
                </div>
              )}
            </div>

            <div className="field-container mb-5">
              <label htmlFor="re-password" className="font-bold text-[13px]	">
                Re-enter Password
              </label>

              <input
                onChange={handleChange}
                name="rePass"
                value={fields.rePass}
                id="re-password"
                type="password"
                className={`outline-none block border-solid	${
                  errors.regRePassError ? `border-red-500` : `border-[#b5b5b5]`
                } border rounded w-full h-8 pl-1.5 field-shadow text-sm`}
              />
              {errors.regRePassError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className="mr-3 text-red-500"
                  />
                  <span className=" text-red-600 text-[13px]">
                    {errors.regRePassError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="block mb-5 w-full bg-[#3E64DA] text-[white] p-2 rounded-lg text-[13px]"
            >
              Continue
            </button>

            <Link
              to="/login"
              className="block w-full text-center bg-[#3E64DA] text-[white] p-2 rounded-lg text-[13px]"
            >
              Return to login
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
