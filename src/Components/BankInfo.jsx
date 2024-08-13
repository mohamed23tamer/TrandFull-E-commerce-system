import { useState } from "react";

const netBanking = [
  {
    id: "bank",
    Abstract: "XXXX XXXX XXXX XXXX",
    label: "VISA Card Number",
    error: "Credit Card Number",
    regex: /^\d{4}(?:\s\d{4}){3}$/,
  },
  {
    id: "cvc",
    Abstract: "CVC",
    label: "CVC/CVV",
    error: "CVC Number",
    regex: /^\d{3}$/,
  },
  {
    id: "EX",
    Abstract: "MM/YY",
    label: "Expire Date",
    error: "Expire Date",
    regex: /^(0[1-9]|1[0-2])\/(0[0-9]|1[0-9]|2[0-9]|3[0-9])$/,
  },
  {
    id: "Cname",
    Abstract: "Name Of Card",
    label: "Name Of Card",
    error: "Name Of Credit Card",
    regex: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  },
];

function BankInfo({ handleChange }) {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    bank: "",
    cvc: "",
    EX: "",
    Cname: "",
  });
  return (
    <div
      action=""
      className="border-[1px] border-solid border-[gray] rounded-[10px] text-[15px] p-[5px] w-[100%]"
    >
      <h1 className="mb-[10px] ml-[10px]">NET BANKING</h1>

      {netBanking.map((object, index) => {
        return (
          <>
            <label
              htmlFor={object.id}
              className="ml-[10px] text-[12px] mt-6 font-bold block"
            >
              {object.label}
            </label>

            <input
              key={index}
              onChange={(e) => {
                const name = e.target.name;
                const value = e.target.value;
                const check = object.regex;
                // Example regex for a simple email validation
                const isValid = check.test(value);
                setError(isValid ? "" : object.id);
                setData((prev) => {
                  return { ...prev, [name]: value };
                });
                if (!e.target.value) {
                  setError("");
                }
              }}
              name={object.id}
              type="text"
              required
              placeholder={object.Abstract}
              onFocus={(e) => {
                e.target.placeholder = "";
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.placeholder = netBanking[index].Abstract;
                }
              }}
              className={`bg-[#eee] rounded-[3px]  ml-[10px]  ${
                index === 1 || index === 2 ? "w-[220px]" : "w-[460px]"
              } p-[5px] outline-none text-[13px] placeholder:text-[gray]`}
            />
            {error === object.id ? (
              <div className="text-[13px] p-[5px]  ml-[10px] text-[red]">
                Invalid {object.error}
              </div>
            ) : (
              ""
            )}
          </>
        );
      })}
      {data.Cname && data.EX && data.bank && data.cvc ? (
        ""
      ) : (
        <div className="text-[13px] text-[red] p-[5px] ml-[10px]">
          You Must fill this Form
        </div>
      )}
    </div>
  );
}
export default BankInfo;
