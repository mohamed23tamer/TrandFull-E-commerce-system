const address = [
  {
    type: "text",
    Abstract: "First Name*",
    id: "firstName",
    pattern: "([a-z]|[A-Z]){3,}",
  },
  {
    type: "text",
    Abstract: "Last Name*",
    id: "lastName",
    pattern: "([a-z]|[A-Z]){3,}",
  },
  {
    type: "email",
    Abstract: "Email Address*",
    id: "email",
    pattern: "([a-z]|[A-Z])\\w{0,}@\\w{4,}.com",
  },
  {
    type: "tel",
    Abstract: "Phone*",
    id: "phone",
    pattern: "01(0|1|2|5)[0-9]{8}",
  },
  {
    type: "text",
    Abstract: "Address*",
    id: "address",
    pattern: "([a-z]|[A-Z]|\\s){3,}",
  },
  {
    type: "text",
    Abstract: "City*",
    id: "city",
    pattern: "([a-z]|[A-Z]|\\s){3,}",
  },
];

function AddressInfo({ handleChange }) {
  return (
    <div className="border-[1px] border-solid  border-[gray] rounded-[10px] mr-[10px] text-[15px] p-[5px] w-[100%]">
      <h1 className="mb-[5px] ml-[10px]">
        BILLING ADDRESS{" "}
        <span className="text-[10px] text-red-700">Required Field*</span>
      </h1>

      {address.map((object, index) => {
        return (
          <input
            pattern={object.pattern}
            onChange={handleChange}
            key={index}
            onFocus={(e) => {
              e.target.placeholder = "";
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                e.target.placeholder = address[index].Abstract;
              }
            }}
            name={object.id}
            type={object.type}
            required
            placeholder={object.Abstract}
            className={`bg-[#eee] rounded-[3px] ml-[10px] my-2  ${
              index < 2 ? "w-[220px]" : "w-[460px]"
            } w-[220px] ${
              index === 0 ? "mr-[10px]" : ""
            } p-[5px] outline-none text-[13px] placeholder:text-[gray]`}
          />
        );
      })}
    </div>
  );
}

export default AddressInfo;
