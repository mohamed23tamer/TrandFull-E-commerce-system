import { FaCircleXmark } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminEdit from "../Components/AdminEdit";

function AdminSellersAccounts() {
  const [sellers, setSellers] = useState([]);
  const [id, setID] = useState();

  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");

  const [pop, setPop] = useState(false);

  async function getAllSellers() {
    const response = await axios.get("http://localhost:3000/admin/get-sellers");

    setSellers(response.data);
  }

  useEffect(() => {
    getAllSellers();
  }, []);

  async function deleteSeller() {
    const response = await axios.delete(
      "http://localhost:3000/admin/delete-seller/" + id
    );

    getAllSellers();
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const seller = sellers.filter((seller) => seller._id == id)[0];

    if (Object.keys(data).length) {
      if (data.name == undefined || data.name == "") {
        data.name = seller.name;
      }
      if (data.email == undefined || data.email == "") {
        data.email = seller.email;
      }

      if (data.name != seller.name || data.email != seller.email) {
        try {
          const response = await axios.put(
            "http://localhost:3000/admin/edit-seller",
            {
              id: seller._id,
              name: data.name,
              email: data.email,
            }
          );

          getAllSellers();
          hideEdit();
        } catch (err) {
          setError(err.response.data);
        }
      }
    }
  }

  function showEdit() {
    const seller = sellers.filter((seller) => seller._id == id)[0];

    if (edit) {
      return (
        <AdminEdit
          name={seller.name}
          email={seller.email}
          handleChange={handleChange}
          hideEdit={hideEdit}
          handleSubmit={handleSubmit}
          error={error}
        />
      );
    }
  }

  function hideEdit() {
    setEdit(false);
  }

  return (
    <div className="w-1/3 grid items-center gap-5 mx-auto my-8">
      <div className="uppercase text-[#3E64DA] flex items-center justify-between mb-2">
        <h3>Sellers</h3>
      </div>

      {sellers.map((seller, index) => {
        return (
          <div
            key={seller._id + index}
            className="h-24 flex justify-between p-5 border border-gray-300 rounded-lg"
          >
            <div className="flex flex-col justify-between">
              <p>
                name: <span className="font-bold ml-2">{seller.name}</span>
              </p>
              <p>
                email: <span className="font-bold ml-2">{seller.email}</span>
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <button
                  onClick={() => {
                    setID(seller._id);
                    setEdit(true);
                  }}
                  className="w-20 text-[15px] text-[#3E64DA] rounded-md border border-[#3E64DA] hover:border-[#F39E31] hover:text-[#F39E31]"
                >
                  Edit
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setID(seller._id);
                    setPop(true);
                  }}
                  className="w-20 text-[15px] text-[#3E64DA] rounded-md border border-[#3E64DA] hover:border-[#F39E31] hover:text-[#F39E31]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}

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
              Do you want to delete this seller account?
            </p>

            <div className="text-base flex justify-around align-middle text-[#3E64DA]">
              <button
                onClick={() => {
                  setPop(false);
                  deleteSeller();
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

      {showEdit()}
    </div>
  );
}

export default AdminSellersAccounts;
