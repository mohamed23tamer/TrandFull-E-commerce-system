import { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import OptionBox from "./OptionBox";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import axios from "axios";

function ProductPop() {
  const [pop, setPop] = useState(true);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        const cat = [{ _id: 0, name: "" }, ...response.data];

        setCategories(cat);
      } catch (error) {}
    };
    getCategories();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    if (value != "") {
      setData({
        ...data,
        [name]: value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { name, description, price, quantity, category, images } = data;

    async function addProduct() {
      if (localStorage.getItem("sellerToken")) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/add-product",
            {
              token: localStorage.getItem("sellerToken"),
              name: name,
              description: description,
              price: price,
              quantity: quantity,
              category: category,
              images: images,
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

    if (
      name != null &&
      description != null &&
      price != null &&
      quantity != null &&
      category != null &&
      images
    ) {
      addProduct();
      setPop(false);
    }
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
            value={data.category}
            categories={categories}
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

          <div className="flex justify-center">
            <button className="block border-solid text-base px-4 py-1 mt-4 border-[#3E64DA] border-[1px] hover:border-[#F39E31] hover:text-[#F39E31] text-center  rounded-[5px] mb-[5px] text-[#3E64DA]">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    ""
  );
}

export default ProductPop;
