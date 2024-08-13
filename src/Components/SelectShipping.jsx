function SelectShipping({ handleChange }) {
  return (
    <div className="py-[10px] w-[49%]">
      <h1 className="font-bold">Select Shipping Method</h1>

      <div>
        <div className="my-2">
          <input
            required
            type="radio"
            name="shipping"
            value="50"
            id="one"
            onClick={handleChange}
          />

          <label htmlFor="one" className="ml-[10px]">
            Standard Shipping 50EGP
          </label>
        </div>

        <div className="my-2">
          <input
            required
            type="radio"
            name="shipping"
            id="two"
            value="100"
            onClick={handleChange}
          />

          <label htmlFor="two" className="ml-[10px]">
            Express Shipping 100EGP
          </label>
        </div>
      </div>
    </div>
  );
}
export default SelectShipping;
