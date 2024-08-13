import axios from "axios";
import { FaCircleXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const imageURL = "http://localhost:3000/api/uploads/images/";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [pop, setPop] = useState(false);
  const [info, setInfo] = useState();

  async function fetchData() {
    const response = await axios.get(
      "http://localhost:3000/api/search-products"
    );

    setProducts(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteProduct() {
    const response = await axios.delete(
      "http://localhost:3000/admin/delete-product/" +
        info.sellerID +
        "/" +
        info.id
    );

    fetchData();
  }

  return (
    <main className="min-h-screen p-5">
      <div className="uppercase text-[#3E64DA] flex items-center justify-between mb-5">
        <h3>Products</h3>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {products.map((product, index) => {
          return (
            <div
              key={product._id + index}
              className="flex justify-between border border-stone-300 rounded p-2"
            >
              <Link to={"/product/" + product._id}>
                <div className="flex">
                  <div className="w-48 h-48 flex justify-center items-center">
                    <img
                      src={imageURL + product.images[0]}
                      alt=""
                      className="max-w-48 max-h-48"
                    />
                  </div>

                  <div className="flex-1 text-[black] ml-4">
                    <h1 className="font-bold text-left mb-[5px]">
                      {product.name}
                    </h1>
                    <h1 className="text-left mb-[10px]">
                      {product.description}
                    </h1>
                  </div>
                </div>
              </Link>

              <div className="w-28 flex flex-col justify-between items-end p-1">
                <button
                  onClick={() => {
                    setPop(!pop);
                    setInfo({ id: product._id, sellerID: product.sellerID });
                  }}
                  className="text-[#3E64DA] border border-[#3E64DA] hover:border-[#F39E31] hover:text-[#F39E31] text-[15px] w-[70px] rounded-[5px] mb-[10px]"
                >
                  Delete
                </button>

                <h1 className="font-bold text-left mb-[10px]">
                  EGP {product.price}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      {pop ? (
        <>
          <div
            onClick={() => setPop(false)}
            className="fixed w-full min-h-screen top-0 left-0 bg-black opacity-50"
          ></div>

          <div className="z-10 fixed text-lg rounded-[10px] bg-white z-100  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-2">
            <FaCircleXmark
              onClick={() => setPop(false)}
              className="absolute top-2 right-2 cursor-pointer text-[#3E64DA]"
            />

            <p className="text-[#3E64DA] pt-6 pb-4">
              Do you want to delete this product?
            </p>

            <div className="text-base flex justify-around align-middle text-[#3E64DA]">
              <button
                onClick={() => {
                  setPop(false);
                  deleteProduct();
                }}
                className="text-[#3E64DA] border border-[#3E64DA] hover:border-[#F39E31] hover:text-[#F39E31] text-[15px] w-[70px] rounded-[5px] mb-[10px]"
              >
                Delete
              </button>

              <button
                onClick={() => setPop(false)}
                className="text-[#3E64DA] border border-[#3E64DA] hover:border-[#F39E31] hover:text-[#F39E31] text-[15px] w-[70px] rounded-[5px] mb-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </main>
  );
}

export default AdminProduct;
