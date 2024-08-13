import { Link } from "react-router-dom";

function PricingSection({ id, price, stock }) {
  const leftover = Math.trunc((price - Math.floor(price)) * 100);

  function addToCart() {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      let flag = true;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          cart[i].quantity++;
          flag = false;
          break;
        }
      }

      if (flag) {
        cart.push({ id: id, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([{ id: id, quantity: 1 }]));
    }

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="mt-[10px] w-[280px] ml-[10px] border-solid rounded-[10px] p-[20px] text-left border-[#EEE] border">
      <p
        className={`relative text-[20px] font-bold pl-[20px] after:content-['${leftover}'] before:content-['EGP'] after:absolute before:absolute after:top-[5px] before:top-[5px] after:left-[58px] before:left-0 after:text-[10px] before:text-[10px]`}
      >
        {price}
      </p>

      <p
        className={`mt-[10px] font-bold text-[18px]  ${
          stock ? "text-green-600" : "text-red-600"
        } `}
      >
        {stock ? "In Stock" : "Out of Stock"}
      </p>
      {stock ? (
        <button
          className="mt-[10px] mb-[10px] text-[13px] block bg-orange-300 text-center pt-[5px] pb-[5px] w-[100%] rounded-[10px]"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      ) : (
        <button
          disabled
          className="mt-[10px] mb-[10px] text-[13px] block bg-orange-300 opacity-50 cursor-not-allowed text-center pt-[5px] pb-[5px] w-[100%] rounded-[10px]"
        >
          Add to Cart
        </button>
      )}
      <Link to="/cart">
        {stock ? (
          <button
            onClick={addToCart}
            className="mt-[10px] mb-[10px] text-[13px] block bg-orange-500 text-center pt-[5px] pb-[5px] w-[100%] rounded-[10px]"
          >
            Buy Now
          </button>
        ) : (
          <button
            disabled
            className="mt-[10px] mb-[10px] opacity-50 cursor-not-allowed text-[13px] block bg-orange-500 text-center pt-[5px] pb-[5px] w-[100%] rounded-[10px]"
          >
            Buy Now
          </button>
        )}
      </Link>
    </div>
  );
}

export default PricingSection;
