import React from "react";

import {
  PlaylistCard1,
  PlaylistCard2,
  PlaylistCard3,
  Heart,
  Comment,
} from "../SVG/index";

const PlaylistCard = ({ post }) => {
  return (
    <div className="relative flex min-w-0 items-center truncate rounded-md bg-white py-2 leading-[18px] text-neutral600 hover:bg-neutral50 lt:px-2">
      <div className="group relative mr-2 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
        <img
          width={48}
          height={48}
          src={post?.image}
          style={{
            color: "transparent",
            borderRadius: "8px",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
        <button
          tabIndex={-1}
          className="c-tiUlW absolute left-0 top-0 transition-all duration-300 ease-in-out group-hover:visible lg:invisible"
        >
          <div
            className="c-hYjZQi c-hYjZQi-shkcA-loading-false c-hYjZQi-iJFnBg-size-m c-hYjZQi-kvPNFp-color-transparent play-button-container"
            tabIndex={0}
          >
            <div
              className="c-cFovLR"
              style={{ marginLeft: "0px", color: "rgb(0, 0, 0)" }}
            >
              <PlaylistCard1 />
            </div>
            <PlaylistCard2 />
          </div>
        </button>
      </div>
      <div className="flex flex-1 flex-col max-w-[calc(100%-72px)] lt:max-w-[calc(100%-87px)]">
        <span className="shrink-0 text-title-xxs font-bold">{post?.title}</span>
        <span className="flex-1 truncate text-title-xxs">
          <Heart /> {post?.likes.length} . Comment {post?.comments.length}
        </span>
      </div>
      <button className="flex items-center justify-center rounded-md  text-neutral500 hover:text-neutral800 ">
        <PlaylistCard3 />
      </button>
    </div>
  );
};

export default PlaylistCard;
