import { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import OptionBox from "./OptionBox";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import axios from "axios";

function EditPop({ id }) {
  const [pop, setPop] = useState(true);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {}
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/product/" + id
        );
        setData(response.data);
      } catch (err) {}
    };
    fetchData();
  }, [id]);

  async function updateProduct() {
    if (localStorage.getItem("sellerToken")) {
      try {
        const response = await axios.put(
          "http://localhost:3000/seller/update-product/" + id,
          {
            token: localStorage.getItem("sellerToken"),
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.category,
            images: data.images,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        window.location.reload();
      } catch (error) {
        localStorage.removeItem("sellerToken");
        window.location.href = "http://localhost:5173/seller/login";
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPop(false);
    updateProduct();
  }

  return pop ? (
    <>
      <div
        onClick={() => setPop(false)}
        className="fixed w-full min-h-screen top-0 left-0 bg-black opacity-50 "
      ></div>
      <div className="z-10 absolute w-96 text-[15px] max-h-[90%] overflow-auto rounded-[10px]  bg-white z-100  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
        <FaCircleXmark
          onClick={() => setPop(false)}
          className="absolute top-2 right-2 cursor-pointer text-[#3E64DA]"
        />

        <p className="text-[#3E64DA] p-2 text-center">Edit Page</p>

        <form onSubmit={handleSubmit}>
          <InputField
            title="Name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={data.name}
            handleChange={handleChange}
          />

          <TextareaField
            title="Description"
            name="description"
            placeholder="at least 10 characters"
            value={data.description}
            handleChange={handleChange}
          />

          <InputField
            title="Price"
            name="price"
            type="number"
            placeholder="Price must be greater than 0"
            value={data.price}
            handleChange={handleChange}
          />

          <InputField
            title="Quantity"
            name="quantity"
            type="number"
            placeholder="Quantity must be greater than 0"
            value={data.quantity}
            handleChange={handleChange}
          />

          <OptionBox
            title="Category"
            name="category"
            categories={categories}
            value={data.category}
            handleChange={handleChange}
          />

          {/* Image */}
          <InputField
            title="Choose Images (at least 1 image)"
            name="images"
            type="file"
            map="map"
            handleChange={(images) => {
              setData({
                ...data,
                images: images,
              });
            }}
          />

          <div className="flex justify-around align-middle py-2 text-[15px] text-[#3E64DA]">
            <button
              type="submit"
              className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
            >
              Edit
            </button>
            <button
              onClick={() => setPop(false)}
              className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    ""
  );
}
export default EditPop;
