import { useState } from "react";

const InputField = ({
  title,
  name,
  type,
  placeholder,
  value,
  handleChange,
}) => {
  const [files, setFiles] = useState([]);

  function handleFiles(e) {
    const selectedFile = e.target.files;
    setFiles(selectedFile);
    handleChange(selectedFile);
  }

  return (
    <div className="mb-2">
      <label className="block text-[#3E64DA] mb-1">{title}</label>

      {type !== "file" ? (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          onChange={(e) => handleChange(e)}
          className="w-full pl-3 border border-[#3E64DA] border-solid hover:border-[#F39E31] outline-none rounded-md"
        />
      ) : (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={(e) => handleFiles(e)}
            className="w-full pl-3"
            multiple
            accept=".jpg, .jpeg, .png"
          />
          <div>
            {[...files].map((element, index) => {
              return <div key={index}>{element.name}</div>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default InputField;
