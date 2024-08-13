/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SideNavBar = ({ showNav }) => {
  return (
    <>
      <li
        className="bold pt-[5px] pb-[5px] pr-[10px] ml-[30px] cursor-pointer text-[13px] rounded"
        onClick={showNav}
      >
        <FontAwesomeIcon icon={faBars} className="mr-[5px]" />
        All
      </li>
    </>
  );
};

export default SideNavBar;
