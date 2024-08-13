import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const imageURL = "http://localhost:3000/api/uploads/images/";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  function calculateTotal(products) {
    let sum = 0;
    products.forEach((product) => {
      sum += product.price * product.quantity;
    });

    setTotal(sum);
  }

  function increaseQuantity(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const products = [...cartProducts];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart[i].quantity++;
        products[i].quantity++;
        break;
      }
    }

    calculateTotal(products);

    setCartProducts(products);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function decreaseQuantity(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let products = [...cartProducts];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].quantity > 0) {
        cart[i].quantity--;
        products[i].quantity--;
      }

      if (cart[i].id == id && cart[i].quantity == 0) {
        if (i == 0) {
          cart.shift();
          products.shift();
          break;
        } else if (i == cart.length - 1) {
          cart.pop();
          products.pop();
          break;
        }

        cart = cart.slice(0, i).concat(cart.slice(i + 1));
        products = cartProducts.slice(0, i).concat(cartProducts.slice(i + 1));
        break;
      }
    }

    calculateTotal(products);

    setCartProducts(products);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));
  }

  function removeProduct(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((product) => product.id != id);

    let products = [...cartProducts];
    products = products.filter((product) => product.id != id);

    calculateTotal(products);

    setCartProducts(products);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));
  }

  useEffect(() => {
    const fetchData = async () => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const products = [];

      if (cart) {
        for (let i = 0; i < cart.length; i++) {
          const response = await axios.get(
            "http://localhost:3000/api/v1/cart/" + cart[i].id
          );

          const product = response.data;

          const info = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: cart[i].quantity,
            image: product.image,
          };

          products.push(info);
        }

        setCartProducts(products);

        calculateTotal(products);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-[700px] grid items-center gap-4 mx-auto my-8">
        {cartProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="grid grid-cols-3 p-2 border border-gray-300 border-1 rounded-lg"
            >
              <div className="flex justify-center items-center">
                <Link to={"/product/" + product.id}>
                  <img
                    src={imageURL + product.image}
                    alt=""
                    className="max-w-48 max-h-32"
                  />
                </Link>
              </div>

              <div className="flex justify-center items-center text-2xl">
                <span
                  className="px-2 cursor-pointer text-gray-400"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </span>

                <span className="px-3">{product.quantity}</span>

                <span
                  className="px-2 cursor-pointer text-gray-400"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </span>
              </div>

              <div>
                <p className="text-lg">{product.name}</p>
                <p className="text-sm text-gray-500 mb-[15px]">
                  {"EGP " + product.price * product.quantity}
                </p>

                <button
                  className="text-sm border border-red-300 border-1 rounded-md px-3 py-1 hover:bg-red-500 hover:text-[white] transition duration-200 linear "
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {cartProducts.length > 0 ? (
          <div className="flex justify-between items-center">
            <p>
              <span>Total</span>
              <br />
              <span className="font-bold text-sm">EGP </span>
              <span className="font-bold">{total}</span>
            </p>

            <Link to="/checkout">
              <button className="text-sm border border-green-300 border-1 rounded-md px-3 py-1 hover:bg-green-500 hover:text-[white] transition duration-200 linear">
                Purchase
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      {cartProducts.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="w-[100px] h-[70px] "
          />
          <p className="mt-3 text-center text-gray-500">Cart is empty</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Cart;
