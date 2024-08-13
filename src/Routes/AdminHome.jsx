import { useEffect, useState } from "react";
import axios from "axios";

const imageURL = "http://localhost:3000/api/uploads/images/";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/get-home-products"
      );

      const home = response.data;
      const allHomeProducts = [];

      for (let i = 0; i < home.length; i++) {
        const response = await axios.get(
          "http://localhost:3000/api/v1/cart/" + home[i].productID
        );

        allHomeProducts.push(response.data);
      }

      setHomeProducts(allHomeProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const home = await axios.get(
        "http://localhost:3000/api/get-home-products"
      );

      const response = await axios.get(
        "http://localhost:3000/api/v1/home-products"
      );

      const data = response.data;

      if (home.data.length) {
        const allProducts = [];

        for (let i = 0; i < data.length; i++) {
          let flag = true;

          for (let j = 0; j < home.data.length; j++) {
            if (home.data[j].productID == data[i]._id) {
              flag = false;
              break;
            }
          }

          if (flag) {
            allProducts.push(data[i]);
          }
        }

        setProducts(allProducts);
      } else {
        setProducts(data);
      }
    };

    fetchData();
  }, []);

  async function removeHomeProduct(id) {
    const response = await axios.post(
      "http://localhost:3000/admin/remove-home-product",
      {
        id: id,
      }
    );

    const allHomeProducts = homeProducts.filter((product) => product.id != id);
    setHomeProducts(allHomeProducts);

    const addedProduct = await axios.get(
      "http://localhost:3000/api/v1/cart/" + id
    );

    addedProduct.data._id = addedProduct.data.id;
    delete addedProduct.data.id;

    const allProducts = [...products];
    allProducts.unshift(addedProduct.data);
    setProducts(allProducts);
  }

  async function addHomeProduct(id) {
    const response = await axios.post(
      "http://localhost:3000/admin/add-home-product",
      {
        id: id,
      }
    );

    const addedProduct = await axios.get(
      "http://localhost:3000/api/v1/cart/" + id
    );

    const allHomeProducts = [...homeProducts];
    allHomeProducts.push(addedProduct.data);
    setHomeProducts(allHomeProducts);

    const allProducts = products.filter((product) => product._id != id);
    setProducts(allProducts);
  }

  return (
    <main className="w-full min-h-screen p-[20px]">
      <div className="mb-10">
        <div className="flex items-center justify-between text-[#3E64DA] uppercase mb-5">
          <h3>Home Products</h3>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {homeProducts.map((product, index) => {
            if (homeProducts != []) {
              return (
                <div key={index} className="bg-[#eee] p-2">
                  <div className="h-48 flex justify-center items-center mb-4">
                    <img
                      src={imageURL + product.image}
                      alt=""
                      className="max-w-80 max-h-48 mix-blend-multiply"
                    />
                  </div>

                  <div className="flex justify-between px-2">
                    <div className="pr-5">
                      <h6 className="font-bold text-left text-[13px] mb-[10px] text-black">
                        {product.name}
                      </h6>

                      <h6 className="font-bold text-left text-[13px] mb-[10px] text-black">
                        {product.price} L.E
                      </h6>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          removeHomeProduct(product.id);
                        }}
                        className=" text-[#3E64DA] text-center border-solid border-[#3E64DA] border-[1px] hover:border-[#F39E31] hover:text-[#F39E31] text-[15px] w-[70px] rounded-[5px] mb-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-[#3E64DA] uppercase mb-5">
          <h3>Add Products</h3>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {products.map((product, index) => {
            if (products != []) {
              return (
                <div key={product._id + index} className="bg-[#eee] p-2">
                  <div className="h-48 flex justify-center items-center mb-4">
                    <img
                      src={imageURL + product.image}
                      alt=""
                      className="max-w-80 max-h-48 mix-blend-multiply"
                    />
                  </div>

                  <div className="flex justify-between px-2">
                    <div className="pr-5">
                      <h6 className="font-bold text-left text-[13px] mb-[10px] text-black">
                        {product.name}
                      </h6>

                      <h6 className="font-bold text-left text-[13px] mb-[10px] text-black">
                        {product.price} L.E
                      </h6>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          addHomeProduct(product._id);
                        }}
                        className=" text-[#3E64DA] text-center border-solid border-[#3E64DA] border-[1px] hover:border-[#F39E31] hover:text-[#F39E31] text-[15px] w-[70px] rounded-[5px] mb-[10px]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}

export default AdminHome;
