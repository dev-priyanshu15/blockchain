import React, { useState, useEffect } from "react";
import { Feed, RightSidebar } from "../index";
import axios from "axios";

import { shortenAddress } from "../../utils/utils";
import { UserProfile, UserProfile1, UserProfile2 } from "../SVG/index";
import Profile1 from "./Profile1";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile4 from "./Profile4";

const Profile = ({
  setopenComponent,
  setOpenCreateBox,
  setPlayMusic,
  activeUser,
  setOpenComment,
  setAllUsers,
  followerArray,
  followingUsers,
  activeUserPost,
  path,
  setReCall,
  reCall,
  openComponent,
  setContractId,
}) => {
  const [allUserPosts, setAllUserPosts] = useState([]);
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
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };
  ///CREATE_POST
  const GET_ALL_POSTS = async (caption, fileURL) => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const res = await axios({
        method: "GET",
        url: `/api/post/user/${currentUser._id}`,
        withCredentials: true,
      });

      if (res?.status === 200) {
        setAllUserPosts(res?.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GET_ALL_POSTS();
  }, [reCall]);

  const redirectTo = (url) => {
    window.location.href = "/create";
  };

  console.log(activeUser);

  return (
    <main className="c-PJLV">
      <div className="flex min-h-screen w-full flex-col bg-white pb-[120px] md:pb-[130px]">
        <div className="relative">
          <div className="relative w-full bg-base800 h-[232px] md:h-[300px]">
            <img
              alt="cover image"
              className="object-cover object-center"
              src={
                activeUser?.coverPicture
                  ? `${activeUser?.coverPicture}`
                  : "sound_letter_s.svg"
              }
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-full bg-[linear-gradient(180deg,rgba(14,18,19,0.00)_0%,#0E1213_100%)] md:hidden" />
        </div>
        <div className="relative flex min-h-page justify-center overflow-x-clip md:min-h-md-page">
          <div className="flex w-full gap-20 px-4 pb-6 md:px-6 dt:max-w-content">
            <div className="min-w-0 flex-1">
              <div className="relative -top-[60px] z-above3 mx-auto mt-0 flex w-full max-w-content flex-col md:-top-14 lg:-top-32 lt:pr-12">
                <Profile1
                  activeUser={activeUser}
                  shortenAddress={shortenAddress}
                  setopenComponent={setopenComponent}
                />
                <div className="md:hidden">
                  <div className="flex w-full flex-col gap-6">
                    <div className="relative flex w-full items-center gap-3">
                      <img
                        alt="Profile Image"
                        width={48}
                        height={48}
                        className="aspect-square h-full rounded-full object-cover"
                        src={
                          activeUser?.profilePicture
                            ? `${activeUser?.profilePicture}`
                            : "sound_letter_s.svg"
                        }
                        style={{
                          color: "transparent",
                          minWidth: "48px",
                          minHeight: "48px",
                        }}
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-title text-[20px] font-medium leading-[24px] text-white">
                          {activeUser?.username}
                        </h2>
                        <div className="cursor-pointer font-base text-base-m font-medium text-white opacity-80 copy-trigger flex items-center gap-1.5">
                          <p className="publicAddr publicAddress margin-0 cursor-pointer">
                            {shortenAddress(activeUser?.address)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex w-full flex-col gap-4">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex gap-2">
                          <div className="flex flex-col items-start group cursor-pointer">
                            <h3 className="font-title text-title-xs font-medium text-base800 group-hover:text-black md:text-title-m">
                              1
                            </h3>
                            <p className="font-base text-base-s font-medium capitalize text-base400 group-hover:text-base500 md:text-base-m">
                              Posts
                            </p>
                          </div>
                          <div className="flex flex-col items-start group cursor-pointer">
                            <h3 className="font-title text-title-xs font-medium text-base800 group-hover:text-black md:text-title-m">
                              0
                            </h3>
                            <p className="font-base text-base-s font-medium capitalize text-base400 group-hover:text-base500 md:text-base-m">
                              Followers
                            </p>
                          </div>
                          <div className="flex flex-col items-start group cursor-pointer">
                            <h3 className="font-title text-title-xs font-medium text-base800 group-hover:text-black md:text-title-m">
                              0
                            </h3>
                            <p className="font-base text-base-s font-medium capitalize text-base400 group-hover:text-base500 md:text-base-m">
                              Collected
                            </p>
                          </div>
                        </div>
                        <div className="block md:hidden">
                          <div className="flex items-center gap-2">
                            <a className="!text-[unset] [text-decoration:unset]">
                              <button className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-iRULOu-variant-tertiary font-title text-title-xs md:h-10 h-[32px] !w-auto min-w-[100px] rounded-full !px-3">
                                Edit Profile
                              </button>
                            </a>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="flex items-center gap-2">
                            <a className="!text-[unset] [text-decoration:unset]">
                              <button className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-iRULOu-variant-tertiary h-9 font-title text-title-xs md:h-10">
                                Edit Profile
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h2 className="hidden font-title text-title-s font-medium text-base800 lg:flex">
                          About
                        </h2>
                        <div className="flex flex-col gap-3 md:hidden">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex w-full items-center gap-2">
                                <UserProfile />
                                <span className="font-base text-base-s font-medium capitalize text-base500 md:text-[14px] md:leading-[24px] md:text-base400">
                                  Since Mar 2024
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:flex">
                          <div className="flex w-full items-center gap-2">
                            <UserProfile1 />
                            <span className="font-base text-base-s font-medium capitalize text-base500 md:text-[14px] md:leading-[24px] md:text-base400">
                              Since Mar 2024
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-7 mt-8 hidden md:block">
                  <div
                    onClick={() => redirectTo()}
                    className="flex w-full items-center gap-2 md:gap-4"
                  >
                    <div className="flex-shrink-0 rounded-full h-10 w-10 md:h-12 md:w-12">
                      <div className="relative w-[48px]">
                        <a>
                          <div className="c-hrywGi c-hrywGi-igLQzAt-css">
                            <img
                              alt="Daulat Hussain"
                              loading="lazy"
                              width={48}
                              height={48}
                              src={
                                activeUser?.profilePicture
                                  ? `${activeUser?.profilePicture}`
                                  : "playlist_cover_background.png"
                              }
                              style={{
                                color: "transparent",
                                borderRadius: "50%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <button className="relative flex flex-1 items-center rounded-md bg-base100 px-3 py-2 text-base-l text-neutral500 ring-inset ring-base300 hover:bg-neutral50 hover:ring-1">
                      <div className="line-clamp-1 flex-1 text-left">
                        What's on your mind?
                      </div>
                    </button>
                    <button className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary bg-base800/30' bottom-0 right-0 flex h-10 items-center justify-center !rounded-[100px]">
                      Post
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex h-[1px] w-full flex-col items-center justify-center overflow-visible py-5">
                      <div className="h-[1px] w-full flex-shrink-0 bg-base200" />
                    </div>
                  </div>
                </div>

                <Feed
                  allPost={path == "/creator" ? activeUserPost : allUserPosts}
                  path={path}
                  setPlayMusic={setPlayMusic}
                  activeUser={activeUser}
                  setOpenComment={setOpenComment}
                  setReCall={setReCall}
                  reCall={reCall}
                  openComponent={openComponent}
                  setContractId={setContractId}
                />
              </div>
            </div>
            <div className="relative hidden h-full min-w-0 flex-[0_0_304px] lt:inline">
              <div className="sticky mt-3 hidden h-fit min-w-0 overflow-x-hidden lt:flex">
                <div className="flex w-full min-w-0 flex-col">
                  <div className="mt-8 flex w-full flex-col gap-10">
                    <RightSidebar
                      followerArray={followerArray}
                      followingUsers={followingUsers}
                      setReCall={setReCall}
                      reCall={reCall}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="fixed right-4 z-feedPostFloatingButton mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black/90 backdrop-blur-sm  transition-all active:scale-95 md:hidden"
        style={{
          bottom: "calc(68px + 56px + env(safe-area-inset-bottom))",
        }}
      >
        <UserProfile2 />
      </button>
    </main>
  );
};

export default Profile;
