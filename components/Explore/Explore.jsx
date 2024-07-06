import React from "react";

import { Explore1, Explore3 } from "../SVG/index";
import { ExploreCard } from "../index";

const Explore = ({ popularPost, allArtist, setPlayMusic }) => {
  return (
    <div className="mb-12 flex flex-col gap-6 px-6 pb-10 md:mx-auto lg:max-w-content">
      {/* //1 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex justify-between">
          <h3 className="font-title text-title-m font-medium md:text-title-l">
            Explore All
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {allArtist?.map((user, index) => (
            <a href={`creator?userId=${user?._id}`}>
              <div className="duration-6000 relative h-[116px] cursor-pointer overflow-hidden rounded-lg transition-all ease-in-out hover:brightness-[116%] md:h-[165px] md:w-full bg-green300">
                <p className="relative z-above1 px-4 py-3 font-title text-title-m font-medium text-white md:text-title-m">
                  {user?.fullName || `@${user.username}`}
                </p>
                <div className="absolute top-0 overflow-hidden">
                  <Explore1 />
                  <div className="z-0 absolute top-0 h-[100px] w-[178px] rounded-lg" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* //2 */}
      <div className="flex w-full flex-col gap-4">
        <div class="flex justify-between">
          <h3 class="font-title text-title-m font-medium md:text-title-l">
            Sounds by Genre
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {popularPost?.map((popularPost, index) => (
            <ExploreCard
              setPlayMusic={setPlayMusic}
              popularPost={popularPost}
              index={popularPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
