import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import axios from "axios";

function DeletePop({ id }) {
  const [pop, setPop] = useState(true);

  async function deleteProduct() {
    if (localStorage.getItem("sellerToken")) {
      try {
        const response = await axios.delete(
          "http://localhost:3000/seller/delete-product/" +
            localStorage.getItem("sellerToken") +
            "/" +
            id
        );

        window.location.reload();
      } catch (error) {
        localStorage.removeItem("sellerToken");
        window.location.href = "http://localhost:5173/seller/login";
      }
    }
  }

  return pop ? (
    <>
      <div
        onClick={() => setPop(false)}
        className="fixed w-full min-h-screen top-0 left-0 bg-black opacity-50"
      ></div>
      <div className="z-10 absolute text-[20px] rounded-[10px]  bg-white z-100  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
        <FaCircleXmark
          onClick={() => setPop(false)}
          className="absolute top-2 right-2 cursor-pointer text-[#3E64DA]"
        />
        <p className="text-[#3E64DA] p-5">
          Do You Want To Remove {name ? "this Account" : "this Product"} ?
        </p>
        <div className="flex justify-around align-middle text-[#3E64DA]">
          <button
            onClick={() => {
              setPop(false);
              deleteProduct();
            }}
            className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
          >
            Delete
          </button>
          <button
            onClick={() => setPop(false)}
            className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
export default DeletePop;
