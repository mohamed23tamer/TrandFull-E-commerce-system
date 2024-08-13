/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";

function Category({ categories, showNav }) {
  return (
    <>
      <ul className="flex item-center text-white">
        <SideNavBar showNav={showNav} />

        {categories.map((object, index) => {
          return (
            <Link key={index} to={`/search/${object.name.toLowerCase()}`}>
              <li className="pt-[5px] pb-[5px] pr-[10px] pl-[10px] cursor-pointer text-[13px] rounded">
                {object.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default Category;
