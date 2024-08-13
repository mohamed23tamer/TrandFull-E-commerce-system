const OptionBox = ({ title, name, value, categories, handleChange }) => {
  return (
    <div className=" mb-[10px]">
      <label
        className={` block text-[#3E64DA] mb-[5px] ${
          title === "Name" ? "mt-[10px]" : ""
        }`}
      >
        {title}
      </label>

      <select
        value={value}
        onChange={handleChange}
        name={name}
        className=" p-[5px] border border-[#3E64DA] rounded-[5px] border-solid outline-none hover:border-[#F39E31]"
      >
        {categories.map((option) => {
          return (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OptionBox;
