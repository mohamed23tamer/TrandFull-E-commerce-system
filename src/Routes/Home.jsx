import Product from "../Components/Product";

import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [adProducts, setAdProducts] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/advertising/get-products"
      );

      const ad = response.data;
      const allAdProducts = [];

      for (let i = 0; i < ad.length; i++) {
        const product = await axios.get(
          "http://localhost:3000/api/v1/cart/" + ad[i].productID
        );

        product.data._id = product.data.id;
        delete product.data.id;
        allAdProducts.push(product.data);
      }

      setAdProducts(allAdProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/get-home-products"
      );

      const home = response.data;
      const allHomeProducts = [];

      for (let i = 0; i < home.length; i++) {
        const product = await axios.get(
          "http://localhost:3000/api/v1/cart/" + home[i].productID
        );

        product.data._id = product.data.id;
        delete product.data.id;
        allHomeProducts.push(product.data);
      }

      setHomeProducts(allHomeProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/home-products"
      );

      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[rgb(227,230,230)] min-h-screen grid gap-8 p-8">
      {adProducts.length ? (
        <div className="bg-white p-5">
          <h1 className="font-bold mb-10">Promoted Products</h1>

          <div className="grid grid-cols-6 gap-8">
            {adProducts.map((product, index) => {
              return (
                <Product
                  key={index}
                  link={product._id}
                  img={product.image}
                  name={product.name}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      {homeProducts.length ? (
        <div className="bg-white p-5">
          <h1 className="font-bold mb-10">Recommended</h1>

          <div className="grid grid-cols-6 gap-8">
            {homeProducts.map((product, index) => {
              return (
                <Product
                  key={index}
                  link={product._id}
                  img={product.image}
                  name={product.name}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bg-white p-5">
        <h1 className="font-bold mb-10">Products</h1>

        <div className="grid grid-cols-6 gap-8">
          {data.map((object, index) => {
            return (
              <Product
                key={index}
                link={object._id}
                img={object.image}
                name={object.name}
                price={object.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
