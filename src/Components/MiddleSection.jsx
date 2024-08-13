import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faAngleDown,
  faX,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const MiddleSection = ({ name, description, price }) => {
  const [cents, setCents] = useState(
    Math.ceil((price - Math.trunc(price)) * 100)
  );

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-[50%]">
      <div className="row1 border-b border-solid border-b-gray-400 ">
        <div className="text-[24px] font-normal">{name}</div>
        <div className="text-blue-700 cursor-pointer hover:text-orange-500 border-b-2 border-solid border-b-transparent hover:border-b-orange-500 w-fit">
          {/* Brand:{specifications[0]} */}
        </div>
        <FontAwesomeIcon className="text-orange-500" icon={faStar} />
      </div>

      <div className="row2 border-b border-solid border-b-gray-400 mb-3">
        <div className="text-[28px] ml-4 relative w-fit mb-3">
          {price}
          {cents > 0 ? (
            <div className="absolute -right-4 -top-0 text-[13px]">{cents}</div>
          ) : (
            ""
          )}
          <div className="absolute -left-6 -top-0 text-[13px]">EGP</div>
        </div>
      </div>

      <div>
        <h3 className="font-bold">About this product</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default MiddleSection;
