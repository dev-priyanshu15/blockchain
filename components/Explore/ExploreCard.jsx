import React from "react";

import { Patten } from "../SVG/index";

const ExploreCard = ({ popularPost, index, setPlayMusic }) => {
  return (
    <div
      key={index + 1}
      className="duration-6000 relative h-[116px] cursor-pointer overflow-hidden rounded-lg bg-black transition-all ease-in-out hover:brightness-[116%] md:h-[165px] md:w-full"
      style={{ backgroundColor: "rgb(67, 77, 98)" }}
      onClick={() => setPlayMusic(popularPost)}
    >
      <p
        className="absolute z-above1 px-4 py-3 font-title text-title-s font-medium text-white md:text-title-m"
        style={{ marginLeft: "-3rem" }}
      >
        {popularPost?.title}
      </p>
      <div className="relative top-0 overflow-hidden">
        <Patten />
        <div className="z-0 absolute top-0 h-[100px] w-[178px] rounded-lg" />
      </div>
      <div className="absolute right-0 top-10">
        <img
          alt="genre image"
          width={96}
          height={96}
          src={popularPost?.image}
          style={{ color: "transparent", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
};

export default ExploreCard;
