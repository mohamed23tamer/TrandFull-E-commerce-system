import axios from "axios";
import { useEffect, useState } from "react";

const imageURL = "http://localhost:3000/api/uploads/images/";

function SellerOrders() {
  const [data, setData] = useState([]);

  async function getHistory() {
    const response = await axios.post(
      "http://localhost:3000/api/seller/purchase-history",
      {
        token: localStorage.getItem("sellerToken"),
      }
    );

    const products = response.data;
    const allProducts = [];

    if (response) {
      for (let i = 0; i < products.length; i++) {
        const response = await axios.get(
          "http://localhost:3000/api/v1/cart/" + products[i].productID
        );

        const product = response.data;

        const info = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: products[i].quantity,
          image: product.image,
        };

        allProducts.push(info);
      }
    }

    setData(allProducts);
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="w-[500px] grid items-center gap-4 mx-auto my-8">
      {data.map((product, index) => {
        return (
          <div
            key={product.id + index}
            className="grid grid-cols-2 p-2 border border-gray-300 border-1 rounded-lg"
          >
            <div className="flex justify-center items-center">
              <img
                src={imageURL + product.image}
                alt=""
                className="max-w-48 max-h-32"
              />
            </div>

            <div>
              <p className="my-2">Name: {product.name}</p>
              <p className="my-2">Quantity: {product.quantity}</p>
              <p className="my-2">Price: {product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SellerOrders;
