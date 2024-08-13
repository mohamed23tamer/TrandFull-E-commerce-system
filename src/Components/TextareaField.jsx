const TextareaField = ({ title, name, placeholder, value, handleChange }) => {
  return (
    <div className="mb-2">
      <label className="block text-[#3E64DA] mb-1">{title}</label>

      <textarea
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="block w-full h-24 pl-3 resize-none hover:border-[#F39E31] border border-[#3E64DA] border-solid outline-none rounded-md"
      ></textarea>
    </div>
  );
};

export default TextareaField;
