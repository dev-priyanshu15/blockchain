import React from "react";

//IMPORT ICON
import { ArrowRoght } from "../SVG/index";
import MusicCard from "./MusicCard";

const Music = ({ allArtist, popularPost, setPlayMusic }) => {
  console.log(popularPost);
  return (
    <section>
      <div className="flex items-center justify-center overflow-x-hidden">
        <h1 className="font-title text-title-m font-medium md:text-title-l">
          Popular Music
        </h1>
        <a className="ml-auto font-base text-base-xs text-base600">
          <div className="ml-[8px] flex h-6 w-6 items-center justify-center">
            <ArrowRoght />
          </div>
        </a>
      </div>
      {/* // */}
      <div className="scrollbar-transparent mt-4 flex justify-between gap-4 overflow-y-scroll pb-4 lg:pb-10">
        {popularPost?.map((music, index) => (
          <MusicCard setPlayMusic={setPlayMusic} music={music} id={index} />
        ))}
      </div>
    </section>
  );
};

export default Music;
