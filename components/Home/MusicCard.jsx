import React, { useEffect, useState } from "react";
import axios from "axios";
//INTERNAM ICON
import { Play, Heart } from "../SVG/index";
import MusicPostImg from "./MusicPostImg";
import { convertTime } from "../../utils/utils";

const MusicCard = ({ id, music, setPlayMusic }) => {
  return (
    <div key={id} className="w-[100px] md:w-36">
      <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-md md:h-36 md:w-36">
        <div className="c-eeqGMk">
          <div className="relative mr-2 h-full w-full flex-shrink-0 overflow-hidden rounded-md">
            <img
              alt="Coming Home To You"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              sizes="144px"
              src={music?.image || "theblockchaincoders.jpg"}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <button
              onClick={() => setPlayMusic(music)}
              className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
              color="transparent"
            >
              <div className="absolute inset-0 bg-black/80" />
              <div className="z-above1">
                <Play />
              </div>
            </button>
          </div>
        </div>
        <div className="absolute left-0 top-0 flex-shrink-0 flex-col justify-center gap-1 overflow-hidden rounded-br-md bg-black bg-opacity-90 h-[35px] w-[35px] md:h-[38px] md:w-[38px] flex">
          <div className="w-full text-center font-title font-medium leading-3 text-white md:text-title-m">
            {id + 1}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="musicCardProfile" style={{ minWidth: "0px" }}>
          <MusicPostImg
            image={music?.user.profilePicture || "theblockchaincoders.jpg"}
          />
          <a href={`creator?userId=${music?.user._id}`}>
            <h4 className="mt-2 line-clamp-1 font-base text-base-xs font-normal uppercase text-base800">
              {music?.user.fullName || music?.user.username}
            </h4>
          </a>
        </div>
        <a>
          <div className="flex flex-row items-end gap-2">
            <h4 className="mt-1 line-clamp-1 font-title text-title-xs font-medium text-black">
              {music?.title || "Hidden"}
            </h4>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-base ml-1 text-base-xs text-base600">
              {music?.likes.length > 0
                ? `${music?.likes.length} likes - ${music?.comments.length} comments`
                : `${convertTime(music?.createdAt)}`}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MusicCard;
