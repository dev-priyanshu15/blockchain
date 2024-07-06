import React from "react";

//INTERNAL IMPORT
import { Plus3, Play, ViralPlus } from "../SVG/index";

const ViralCard = ({ image, id, name, title, post, setPlayMusic }) => {
  return (
    <div className="flex h-36 w-full gap-5">
      <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-md">
        <div className="c-eeqGMk">
          <div className="relative mr-2 h-full w-full flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={post?.image}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <button
              onClick={() => setPlayMusic(post)}
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
      <div className="flex flex-1 flex-col gap-3 py-1">
        <div>
          <div className="flex flex-row items-center justify-between gap-1 md:gap-2">
            <div className="flex flex-row items-end gap-2">
              <a>
                <h2 className="w-[calc(100% - 42px)] line-clamp-1 font-base text-black md:text-base-m">
                  {post.title}
                </h2>
              </a>
            </div>
          </div>
        </div>
        <div>
          <p className="relative -m-2 line-clamp-2 p-2 pb-0 font-base text-base-xs text-base800 md:text-base-s" />
          <div
            className="-ml-1 mr-1 inline-flex cursor-pointer items-center rounded-full bg-base200 py-0 pl-1 align-sub hover:bg-base300"
            style={{ minWidth: "0px" }}
          >
            <a className="inline-flex items-center" href="#" />
            <div
              className="relative w-[16px]"
              style={{
                marginTop: "-25px",
                marginLeft: "2px",
              }}
            >
              <a className="inline-flex items-center" />
              <a>
                <div className="c-hrywGi c-hrywGi-ikkHwcD-css">
                  <img
                    width={16}
                    height={16}
                    src={post.user.profilePicture || "theblockchaincoders.jpg"}
                    style={{
                      color: "transparent",
                      borderRadius: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </a>
            </div>
            <p className="whitespace-nowrap p-1 font-base text-base-xs font-semibold text-base800">
              {post.user.username}
            </p>
            <button>
              <ViralPlus />
            </button>
          </div>
          <div>
            <a className="text-base500">{post.caption.slice(0, 155)}</a>
          </div>

          <p />
        </div>
        <a>
          <p className="-mt-2 font-base text-base-xs text-base500 md:text-base-s">
            <span>FeedBack:</span>&nbsp;{post.likes.length || 0}&nbsp;likes,{" "}
            {post.likes.length || 0} comments
          </p>
        </a>
      </div>
    </div>
  );
};

export default ViralCard;
