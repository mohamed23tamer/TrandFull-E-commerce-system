import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs-react";

function SellerAccount() {
  const [seller, setSeller] = useState({});
  const [navigate, setNavigate] = useState({
    toNameChange: false,
    toPhoneChange: false,
    toEmailChange: false,
    toPassChange: false,
    mainBox: true,
  });
  const [errors, setErros] = useState({});
  const [fields, setFields] = useState({
    nameChange: "",
    emailChange: "",
    phoneChange: "",
    currentPassChange: "",
    newPassChange: "",
    rePassChange: "",
  });

  async function getInfo() {
    if (localStorage.getItem("sellerToken")) {
      try {
        const request = await axios.post(
          "http://localhost:3000/api/sellerInfo",
          {
            token: localStorage.getItem("sellerToken"),
          }
        );
        setSeller(request.data);
      } catch (err) {
        localStorage.removeItem("sellerToken");
        window.location.href = "http://localhost:5173/seller/login";
      }
    } else {
      window.location.href = "http://localhost:5173/seller/login";
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function updateInfo(
    name = seller.name,
    email = seller.email,
    mobile = seller.mobile
  ) {
    if (localStorage.getItem("sellerToken")) {
      try {
        const request = await axios.patch(
          "http://localhost:3000/api/sellerInfo",
          {
            token: localStorage.getItem("sellerToken"),
            newName: name,
            newEmail: email,
            newMobile: mobile,
          }
        );

        getInfo();

        setFields({
          nameChange: "",
          emailChange: "",
          phoneChange: "",
          currentPassChange: "",
          newPassChange: "",
          rePassChange: "",
        });
        setNavigate({
          toNameChange: false,
          toPhoneChange: false,
          toEmailChange: false,
          toPassChange: false,
          mainBox: true,
        });
      } catch (err) {
        setErros({ emailError: err.response.data });
      }
    } else {
      window.location.href = "http://localhost:5173/seller/login";
    }
  }

  function encryptPassword(newPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    return hash;
  }

  async function updatePassword(currentPass, newPass) {
    if (localStorage.getItem("sellerToken")) {
      try {
        const encryptedPassword = await encryptPassword(newPass);

        const request = await axios.patch(
          "http://localhost:3000/api/sellerPasswordChange",
          {
            token: localStorage.getItem("sellerToken"),
            currentPassword: currentPass,
            newPassword: encryptedPassword,
          }
        );
      } catch (err) {
        localStorage.removeItem("sellerToken");
        window.location.href = "http://localhost:5173/seller/login";
      }
    } else {
      window.location.href = "http://localhost:5173/seller/login";
    }
  }

  // Handeling Navigation Starts
  const handleNavigation = (e) => {
    setNavigate({ ...navigate, [e.target.name]: true, mainBox: false });
  };
  const handleReverseNavigation = (e) => {
    setFields({
      nameChange: "",
      emailChange: "",
      phoneChange: "",
      currentPassChange: "",
      newPassChange: "",
      rePassChange: "",
    });
    setErros({});
    setNavigate({ ...navigate, [e.target.name]: false, mainBox: true });
  };
  // Handeling Navigation Ends
  //Handeling Fields Change Start
  const handleChange = (e) => {
    if (errors) {
      if (
        e.target.name === "nameChange" ||
        e.target.name === "phoneChange" ||
        e.target.name === "emailChange"
      ) {
        setErros({});
      } else {
        if (e.target.name === "currentPassChange") {
          setErros({ ...errors, currentPassError: "" });
        } else if (e.target.name === "newPassChange") {
          setErros({ ...errors, newPassError: "" });
        } else if (e.target.name === "rePassChange") {
          setErros({ ...errors, rePassError: "" });
        }
      }
    }
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const settingBoxInfo = [
    {
      title: "Name",
      buttonText: "Edit",
      message: seller.name,
      eName: "toNameChange",
    },
    {
      title: "Email",
      buttonText: "Edit",
      message: seller.email,
      eName: "toEmailChange",
    },
    { title: "Password", buttonText: "Edit", eName: "toPassChange" },
  ];
  //Handeling Submitting Starts
  const handlePassSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const passReg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
    if (fields.currentPassChange === "") {
      errors.currentPassError = "You must provide this field";
    }
    if (fields.newPassChange === "") {
      errors.newPassError = "You must provide this field";
    } else if (!passReg.test(fields.newPassChange)) {
      errors.newPassError = "Password is invalid";
    }
    if (fields.rePassChange === "") {
      errors.rePassError = "You must provide this field";
    } else if (fields.rePassChange !== fields.newPassChange) {
      errors.rePassError = "Passwords must be identical";
    }

    if (Object.keys(errors).length === 0) {
      updatePassword(fields.currentPassChange, fields.newPassChange);
      setNavigate({ ...navigate, toPassChange: false, mainBox: true });
      return;
    }
    setErros(errors);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const err = {};
    const phoneReg = /\+20\d{11}/;
    if (fields.phoneChange === "") {
      errors.phoneError = "You must provide this field";
    } else if (!phoneReg.test(fields.phoneChange)) {
      errors.phoneError = "Invalid phone number";
    }

    if (Object.keys(err).length === 0) {
      updateInfo(undefined, undefined, fields.phoneChange);
      return;
    }
    setErros(err);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const err = {};
    const mailReg = /([a-z]|[A-Z])([\w-])*@[\w-]+.com/;
    if (fields.emailChange === "") {
      err.emailError = "You must provide this field";
    } else if (!mailReg.test(fields.emailChange)) {
      err.emailError = "Invalid email";
    }

    if (Object.keys(err).length === 0) {
      updateInfo(undefined, fields.emailChange, undefined);
      return;
    }
    setErros(err);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (fields.nameChange === "") {
      err.nameError = "You must provide this field";
    }

    if (Object.keys(err).length === 0) {
      updateInfo(fields.nameChange, undefined, undefined);
      return;
    }
    setErros(err);
  };

  return (
    <div className="mx-auto mt-5">
      {/* Setting Page --------------------------------------------------------------------------- */}
      <div
        className={`p-4 mx-auto my-5 ${
          navigate.mainBox ? "visible" : "hidden"
        }`}
      >
        <h1 className="text-xl font-bold mb-5">Login & Security</h1>

        <div className="w-[500px] border-2 border-[#ccc] rounded-lg">
          {settingBoxInfo.map((box, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between items-center p-4 ${
                  index != 3 ? "border-b" : ""
                }`}
              >
                <p className="font-bold p-[10px]">
                  {box.title}
                  {box.title !== "Password" ? (
                    <span className="block font-normal text-[13px]">
                      {box.title === "Primary mobile number" &&
                      box.message === "" ? (
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          className="pr-[5px] text-amber-500"
                        />
                      ) : (
                        ""
                      )}
                      {box.title === "Primary mobile number" &&
                      box.message === ""
                        ? "Add your phone number"
                        : box.message}
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                <button
                  onClick={handleNavigation}
                  name={box.eName}
                  className="pt-[5px] pb-[5px] pl-[50px] pr-[50px] rounded-[10px] text-[13px]  bg-[#3e64da] text-[white] "
                >
                  {box.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Name Change ------------------------------------------------------------------------------ */}
      <div
        className={`p-4 mx-auto my-5 ${
          navigate.toNameChange ? "visible" : "hidden"
        }`}
      >
        <h1 className="text-[20px] font-bold mb-[15px]">Change your name</h1>

        <div className="w-96 border-2 border-[#ccc] rounded-lg">
          <div className="p-[15px]">
            <p className="text-sm mb-[30px]">
              If you want to change the name associated with your Trendful
              account, you may do so below. Make sure to click the
              <span className="font-bold"> Save Changes</span> button when you
              are done.
            </p>

            <form className="mb-[15px]">
              <label
                htmlFor="name"
                className="font-bold text-[13px] block mb-[10px]"
              >
                New name
              </label>

              <input
                onChange={handleChange}
                value={fields.nameChange}
                type="text"
                name="nameChange"
                id="name"
                className={`w-full border-solid ${
                  errors.nameError ? `border-red-500` : `border-[#000]`
                } border-[#000] border-[1px] rounded outline-none text-[13px] p-[5px] `}
              />
              {errors.nameError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className=" text-[14px] mr-3 text-red-500"
                  />
                  <span className=" text-[14px] text-red-500">
                    {errors.nameError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
            <button
              type="submit"
              onClick={handleNameSubmit}
              className="w-full pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Save Changes
            </button>
            <button
              onClick={handleReverseNavigation}
              name="toNameChange"
              className="w-full block pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Return to settings menu
            </button>
          </div>
        </div>
      </div>

      {/* Email Change------------------------------------------------------------------------------ */}
      <div
        className={`w-96 p-4 mx-auto my-5 ${
          navigate.toEmailChange ? "visible" : "hidden"
        }`}
      >
        <h1 className="text-[20px] font-bold mb-[15px]">Change your email</h1>

        <div className="border-2 border-[#ccc] rounded-lg">
          <div className="p-4">
            <p className="text-sm mb-[30px]">
              Enter the new email address you would like to associate with your
              account below.
            </p>
            <form className="mb-[15px]">
              <label
                htmlFor="email"
                className="font-bold text-[13px] block mb-[5px]"
              >
                New email address
              </label>
              <input
                onChange={handleChange}
                value={fields.emailChange}
                type="email"
                name="emailChange"
                id="email"
                className={`border-solid ${
                  errors.emailError ? `border-red-500` : `border-[#000]`
                } w-[100%] border-[1px] rounded outline-none text-[13px] p-[5px] `}
              />
              {errors.emailError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className=" text-[14px] mr-3 text-red-500"
                  />
                  <span className=" text-[14px] text-red-500">
                    {errors.emailError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
            <button
              type="submit"
              onClick={handleEmailSubmit}
              className="pt-[5px] pb-[5px] w-[100%] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Continue
            </button>
            <button
              onClick={handleReverseNavigation}
              name="toEmailChange"
              className="pt-[5px] pb-[5px] w-[100%] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Return to settings menu
            </button>
          </div>
        </div>
      </div>

      {/* Password Change--------------------------------------------------------------------------- */}
      <div
        className={`w-96 p-4 mx-auto my-5 ${
          navigate.toPassChange ? "visible" : "hidden"
        }`}
      >
        <h1 className="text-[20px] font-bold mb-[15px]">Change Password</h1>

        <div className="border-2 border-[#ccc] rounded-lg">
          <div className="p-[15px]">
            <p className="text-[14px] mb-[30px]">
              Use the form below to change the password for your Trendful
              account
            </p>
            <form className="mb-[30px]">
              <label
                htmlFor="password"
                className="font-bold text-[13px] block mb-[5px]"
              >
                Current password:
              </label>
              <input
                onChange={handleChange}
                value={fields.currentPassChange}
                type="password"
                name="currentPassChange"
                id="password"
                className={`w-full border-solid ${
                  errors.currentPassError ? `border-red-500` : `border-[#000]`
                }  border-[1px] rounded outline-none text-[13px] p-[5px] `}
              />
              {errors.currentPassError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className=" text-[14px] mr-3 text-red-500"
                  />
                  <span className=" text-[14px] text-red-500">
                    {errors.currentPassError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
            <form className="mb-[30px]">
              <label
                htmlFor="newPassword"
                className="font-bold text-[13px] block mb-[5px]"
              >
                New password:
              </label>
              <input
                onChange={handleChange}
                value={fields.newPassChange}
                type="password"
                name="newPassChange"
                id="newPassword"
                className={`w-full border-solid ${
                  errors.newPassError ? `border-red-500` : `border-[#000]`
                }   border-[1px] rounded outline-none text-[13px] p-[5px] `}
              />
              {errors.newPassError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className=" text-[14px] mr-3 text-red-500"
                  />
                  <span className=" text-[14px] text-red-500">
                    {errors.newPassError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
            <form className="mb-[15px]">
              <label
                htmlFor="newPasswordR"
                className="font-bold text-[13px] block mb-[5px]"
              >
                Reenter new password:
              </label>
              <input
                onChange={handleChange}
                value={fields.rePassChange}
                type="password"
                name="rePassChange"
                id="newPasswordR"
                className={`w-full border-solid ${
                  errors.rePassError ? `border-red-500` : `border-[#000]`
                }   border-[1px] rounded outline-none text-[13px] p-[5px] `}
              />
              {errors.rePassError ? (
                <div className="mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className=" text-[14px] mr-3 text-red-500"
                  />
                  <span className=" text-[14px] text-red-500">
                    {errors.rePassError}
                  </span>
                </div>
              ) : (
                ""
              )}
            </form>
            <button
              type="submit"
              onClick={handlePassSubmit}
              className="w-full pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Save Changes
            </button>
            <button
              onClick={handleReverseNavigation}
              name="toPassChange"
              className="w-full block pt-[5px] pb-[5px] pl-[10px] pr-[10px] bg-[#3e64da] text-[white] rounded-[8px] text-[13px]  mb-[10px]"
            >
              Return to setting menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerAccount;
