function SelectPayment({ handleChange }) {
  return (
    <div className="py-[10px] w-[49%]">
      <h1 className="font-bold">Payment</h1>

      <div>
        <div className="my-2">
          <input
            required
            type="radio"
            onClick={handleChange}
            name="payMethod"
            id="credit"
            value="credit"
          />

          <label htmlFor="credit" className="ml-[10px]">
            Credit Card
          </label>
        </div>

        <div className="my-2">
          <input
            required
            type="radio"
            name="payMethod"
            onClick={handleChange}
            id="cash"
            value="cash"
          />

          <label htmlFor="cash" className="ml-[10px]">
            Cash
          </label>
        </div>
      </div>
    </div>
  );
}

export default SelectPayment;
