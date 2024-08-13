import { useEffect, useState } from "react";
import axios from "axios";

const imageURL = "http://localhost:3000/api/uploads/images/";

function SellerInventory() {
  const [products, setProducts] = useState([]);

  async function getSellerProducts() {
    try {
      const response = await axios.get(
        "http://localhost:3000/seller/get-products" +
          "/" +
          localStorage.getItem("sellerToken")
      );

      setProducts(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <main className="flex-1 p-[20px] text-white">
      <div className="flex justify-between">
        <h3 className="text-[#3E64DA]">INVENTORY</h3>
      </div>

      <table className=" bg-[#eee] w-[100%] border-collapse border  my-[15px] mt-[20px] border-[black]">
        <thead>
          <tr className="text-[white] w-[25%] text-center bg-[#3E64DA] h-[60px] border-collapse border border-[black]">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => {
            return (
              <tr
                key={index}
                className="text-[black] text-center border-collapse border border-[black]"
              >
                <td>
                  <div className="h-52 flex justify-center items-center px-5">
                    <img
                      src={imageURL + product.images[0]}
                      alt=""
                      className="max-h-48 my-2 mix-blend-multiply"
                    />
                  </div>
                </td>
                <td className="w-[25%] text-center">{product.name}</td>
                <td className="w-[25%] text-center">{product.price}</td>
                <td className="w-[25%] text-center ">{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default SellerInventory;
