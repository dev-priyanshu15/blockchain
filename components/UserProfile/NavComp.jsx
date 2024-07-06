import React from "react";

const NavComp = ({ title, info }) => {
  return (
    <div className="flex flex-col items-start group cursor-pointer">
      <h3 className="font-title text-title-xs font-medium text-base800 group-hover:text-black md:text-title-m">
        {info}
      </h3>
      <p className="font-base text-base-s font-medium capitalize text-base400 group-hover:text-base500 md:text-base-m">
        {title}
      </p>
    </div>
  );
};

export default NavComp;
