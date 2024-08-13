function SelectPoints({ handleChange }) {
  return (
    <div className="py-[10px] w-[49%]">
      <h1 className="font-bold">Use my points for a discount</h1>

      <div>
        <div className="my-2">
          <input
            required
            type="radio"
            name="points"
            value="true"
            id="usePoints"
            onClick={handleChange}
          />
          <label htmlFor="usePoints" className="ml-[10px]">
            Yes
          </label>
        </div>

        <div className="my-2">
          <input
            required
            type="radio"
            name="points"
            id="dontUsePoints"
            value="false"
            onClick={handleChange}
          />

          <label htmlFor="dontUsePoints" className="ml-[10px]">
            No
          </label>
        </div>
      </div>
    </div>
  );
}
export default SelectPoints;
