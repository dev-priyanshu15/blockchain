import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  Verified,
  Play,
  ArrowUp,
  CircleArrowUp,
  ArrowReshare,
  Comment,
} from "../SVG/index";
///INTERNAM IMPORT
import MusicAvatar from "./MusicAvatar";
import { Heart, UnLike } from "../SVG/index";
import { convertTime } from "../../utils/utils";
//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../../context/context";

const MusicFeedCard = ({
  item,
  setPlayMusic,
  activeUser,
  setOpenComment,
  path,
  setReCall,
  reCall,
  setContractId,
  openComponent,
}) => {
  const [likeState, setLikeState] = useState(false);

  const { fetchMusicNFT } = useContext(MusicNFTContext);

  ///CHECK_AUTH
  const CHECK_AUTH = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/auth/refetch",
        withCredentials: true,
      });
      let user;
      if (res.status === 200) {
        user = res.data;
        console.log(res.data._id);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };
  ///LIKE_POST
  const LIKE_POST = async (postID) => {
    try {
      const currentUser = await CHECK_AUTH();

      console.log(postID);

      const res = await axios({
        method: "POST",
        url: `/api/post/like/${postID}`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///DISLIKE_POST
  const DISLIKE_POST = async (postID) => {
    try {
      const currentUser = await CHECK_AUTH();

      const res = await axios({
        method: "POST",
        url: `/api/post/dislike/${postID}`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ overflowAnchor: "none" }}>
      <div>
        <div className="cursor-pointer rounded-lg md:pr-6">
          <div className="flex flex-row">
            {/* //1? */}
            <MusicAvatar
              image={
                openComponent == "Profile"
                  ? activeUser?.profilePicture || "theblockchaincoders.jpg"
                  : path == "/creator"
                  ? activeUser?.profilePicture || "theblockchaincoders.jpg"
                  : item?.user.profilePicture || "theblockchaincoders.jpg"
              }
            />
            {/* //2 */}
            <div className="w-full min-w-0">
              <div className="flex flex-00auto items-start gap-2 pb-1.5 md:gap-4">
                <div className="flex flex-col gap-0.5 md:flex-row md:items-center">
                  <a data-state="closed" style={{ minWidth: "0px" }} />
                  <a>
                    <div className="flex items-center gap-1">
                      <div className="font-base text-base-m font-semibold text-base800 md:text-base-l">
                        {openComponent == "Profile"
                          ? activeUser?.username
                          : path == "/creator"
                          ? activeUser?.username
                          : item.user.username}
                      </div>
                      <div>
                        {/* {item?.user.verify && (
                          <div className="block md:!hidden">
                            <div className="c-PJLV c-PJLV-ijAFnOy-css md:[&_svg]:hover:rounded-full md:[&_svg]:hover:shadow-secondary">
                              <Verified />
                            </div>
                          </div>
                        )} */}

                        {item?.user.verify && (
                          <div className="!hidden md:!block">
                            <div
                              className="c-PJLV c-PJLV-ijAFnOy-css cursor-default hover:cursor-default md:[&_svg]:hover:rounded-full md:[&_svg]:hover:shadow-secondary"
                              data-state="closed"
                            >
                              <Verified />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center self-start font-base text-base-m font-normal text-base500 md:ml-1 md:text-base-l lg:h-6">
                    <p> posted</p>
                    <div className="flex flex-row items-center">
                      <span className="px-1 text-[8px] font-normal">•</span>
                      <button data-state="closed" className="cursor-default">
                        <span className="hover:text-base600">
                          {convertTime(item.createdAt)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <div className="overflow-hidden whitespace-pre-wrap break-words transition-[max-height] duration-200 ease-in-out max-h-[140px] md:max-h-[152px]">
                    <div>
                      <div className="whitespace-pre-wrap font-base text-base-m md:text-base-l">
                        <p>
                          <span>{item.caption}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-col gap-2 md:flex">
                  <div
                    className="align-center relative flex w-full items-center rounded-xl h-auto md:h-[152px] p-3 md:p-4"
                    style={{ backgroundColor: "rgb(26, 21, 98)" }}
                  >
                    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-base800 opacity-50" />

                    <div className="relative flex flex-1 items-stretch gap-4 overflow-hidden">
                      <div className="relative aspect-square flex-00auto overflow-hidden rounded-md w-[60px] md:w-[128px]">
                        <img
                          src={item?.image || "theblockchaincoders.jpg"}
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: "0px",
                            color: "transparent",
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between overflow-hidden">
                        <div className="flex w-full min-w-0 items-center justify-between gap-2">
                          <div className="flex min-w-0 flex-col gap-1 pt-1">
                            <div
                              className="w-fit"
                              data-state="closed"
                              style={{ minWidth: "0px" }}
                            >
                              <a className="line-clamp-1 min-w-0 text-ellipsis whitespace-nowrap font-base text-base-s font-medium text-white">
                                {item.title}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 whitespace-nowrap font-title text-title-s font-medium text-white">
                              <a className="overflow-hidden text-ellipsis">
                                {path == "/creator"
                                  ? item.user.username
                                  : "New"}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex w-full self-end">
                            <div className="relative w-full h-5">
                              <img
                                src="audiowave.png"
                                style={{
                                  position: "absolute",
                                  height: "200%",
                                  width: "80%",
                                  top: "-2rem",
                                }}
                              />
                            </div>
                          </div>
                          {path == "/creator" || openComponent == "Profile" ? (
                            ""
                          ) : (
                            <a
                              href={`creator?userId=${item?.user._id}`}
                              className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary flex self-end !rounded-[100px] !border-[rgba(255,255,255,0.2)] !bg-transparent !p-3 transition-colors duration-300 ease-in-out hover:!border-white hover:![box-shadow:none]"
                            >
                              Profile
                            </a>
                          )}

                          <button
                            color="white"
                            tabIndex={-1}
                            className="c-tiUlW"
                          >
                            <div
                              className="c-hYjZQi c-hYjZQi-shkcA-loading-false c-hYjZQi-dzmrsH-rounded-true c-hYjZQi-bhicFP-size-xs c-hYjZQi-kOOZez-color-white play-button-container"
                              tabIndex={0}
                              onClick={() => setPlayMusic(item)}
                            >
                              <Play />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:hidden">
                  <div
                    className="align-center relative flex w-full items-center rounded-xl h-auto md:h-[152px] p-3 md:p-4"
                    style={{ backgroundColor: "rgb(26, 21, 98)" }}
                  >
                    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-base800 opacity-50" />
                    <div className="absolute right-4 top-4 z-above1 flex text-white"></div>
                    <div className="relative flex h-full flex-1 flex-col justify-between gap-3 overflow-hidden">
                      <div className="flex w-full min-w-0 items-center gap-3">
                        <div className="relative aspect-square flex-00auto overflow-hidden rounded-md w-[60px] md:w-[128px]">
                          <img
                            src={item?.image || "theblockchaincoders.jpg"}
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              inset: "0px",
                              color: "transparent",
                            }}
                          />
                        </div>
                        <div className="flex w-full min-w-0 items-center justify-between">
                          <div className="mr-auto flex min-w-0 flex-col gap-1">
                            <div
                              className="w-fit"
                              data-state="closed"
                              style={{ minWidth: "0px" }}
                            >
                              <a className="line-clamp-1 min-w-0 text-ellipsis whitespace-nowrap font-base text-base-s font-medium text-white">
                                {item.title}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 whitespace-nowrap font-title text-title-s font-medium text-white">
                              <a className="overflow-hidden text-ellipsis">
                                {path == "/creator" ? "" : item.user.username}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {path == "/creator" ? (
                          ""
                        ) : (
                          <a
                            href={`creator?userId=${item?.user._id}`}
                            className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary flex self-end !rounded-[100px] !border-[rgba(255,255,255,0.2)] !bg-transparent !p-3 transition-colors duration-300 ease-in-out hover:!border-white hover:![box-shadow:none]"
                          >
                            Profile
                          </a>
                        )}
                        <button
                          data-testid="play-button"
                          aria-disabled="false"
                          color="white"
                          tabIndex={-1}
                          className="c-tiUlW"
                        >
                          <div
                            className="c-hYjZQi c-hYjZQi-shkcA-loading-false c-hYjZQi-dzmrsH-rounded-true c-hYjZQi-bhicFP-size-xs c-hYjZQi-kOOZez-color-white play-button-container"
                            tabIndex={0}
                            onClick={() => setPlayMusic(item)}
                          >
                            <div
                              className="c-cFovLR"
                              style={{
                                marginLeft: "4%",
                                color: "rgb(0, 0, 0)",
                              }}
                            ></div>

                            <Play />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mx-2 -my-1 flex h-7 items-center gap-8">
                  <button
                    onClick={() => (setPlayMusic(item), setOpenComment(true))}
                    className="cursor-pointer rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <Comment />
                      <span className="font-base font-medium text-base900">
                        {item.comments.length}
                      </span>
                    </div>
                  </button>

                  {item?.likes.includes(activeUser?._id) ? (
                    <button
                      onClick={() => DISLIKE_POST(item?._id)}
                      type="button"
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                    >
                      <Heart />
                      <span className="font-base font-medium text-base900">
                        {item?.likes.length || 0}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => LIKE_POST(item?._id)}
                      type="button"
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                    >
                      <UnLike />
                      <span className="font-base font-medium text-base900">
                        {item?.likes.length || 0}
                      </span>
                    </button>
                  )}

                  <button className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95">
                    <ArrowReshare />
                    <span className="font-base font-medium text-base900">
                      <a
                        target="_blank"
                        href={`https://www.oklink.com/amoy/tx/${item?.txHash}`}
                      >
                        txHash
                      </a>
                    </span>
                  </button>
                  <button
                    onClick={() => setContractId(item?.tokenId)}
                    type="button"
                    className="cursor-pointer rounded-md px-2 py-1 hover:bg-neutral100 active:scale-95"
                  >
                    <ArrowUp />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="flex h-[1px] w-full flex-col items-center justify-center overflow-visible py-5">
            <div class="h-[1px] w-full flex-shrink-0 bg-base200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicFeedCard;
