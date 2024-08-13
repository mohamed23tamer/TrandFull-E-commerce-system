import PricingSection from "../Components/PricingSection";
import MiddleSection from "../Components/MiddleSection";
import LeftSection from "../Components/LeftSection";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function ProductPage() {
  const [render, setRender] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/" + id);

        setData(response.data);
        setRender(true);
      } catch (err) {
        setRender(false);
      }
    };

    fetchData();
  }, []);

  if (render) {
    return (
      <>
        <div className="flex p-[15px]">
          <LeftSection images={data.images} />

          <MiddleSection
            price={data.price}
            name={data.name}
            description={data.description}
          />

          <PricingSection id={data.id} price={data.price} stock={data.stock} />
        </div>
      </>
    );
  } else {
    return <ErrorPage />;
  }
}
export default ProductPage;
