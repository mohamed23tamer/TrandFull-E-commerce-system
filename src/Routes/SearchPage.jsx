import SearchProduct from "../Components/SearchProduct";

function SearchPage() {
  return (
    <div className="bg-[rgb(227,230,230)] min-h-screen">
      <main className="bg-[rgb(227,230,230)] p-8 min-h-screen">
        <div className="bg-white p-5">
          <h1 className="font-bold mb-10">Products</h1>

          <div className="grid grid-cols-2 gap-8">
            <SearchProduct />
          </div>
        </div>
      </main>
    </div>
  );
}
export default SearchPage;
