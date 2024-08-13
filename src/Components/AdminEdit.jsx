import { FaCircleXmark } from "react-icons/fa6";

function AdminEdit({
  name,
  email,
  handleChange,
  hideEdit,
  handleSubmit,
  error,
}) {
  return (
    <>
      <div
        onClick={hideEdit}
        className="fixed w-full min-h-screen top-0 left-0 bg-black opacity-50 "
      ></div>
      <div className="z-10 fixed w-80 px-4 py-2 text-[15px] max-h-[90%] overflow-auto rounded-[10px] bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FaCircleXmark
          onClick={hideEdit}
          className="absolute top-2 right-2 cursor-pointer text-[#3E64DA]"
        />

        <div className="uppercase text-center text-[#3E64DA]">Edit</div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid">
            <label htmlFor="name">Name</label>
            <input
              pattern="([a-z]|[A-Z]){3,}"
              type="text"
              id="name"
              placeholder={name}
              onChange={handleChange}
              className="pl-2 mt-1 border border-slate-400 rounded-md"
            />
          </div>

          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              pattern="([a-z]|[A-Z])\w{0,}@\w{4,}.com"
              type="email"
              id="email"
              placeholder={email}
              onChange={handleChange}
              className="pl-2 mt-1 border border-slate-400 rounded-md"
            />
          </div>

          {error != "" ? (
            <>
              <div className="text-sm text-red-600 -my-2">
                <p>{error}</p>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="flex justify-around align-middle text-[15px] text-[#3E64DA]">
            <button
              type="submit"
              className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
            >
              Edit
            </button>
            <button
              onClick={hideEdit}
              className=" border-solid border-[1px] border-[#3E64DA]  rounded-xl  py-1 px-2 hover:text-[#F39E31] hover:border-[#F39E31]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminEdit;
