import React from "react";
import axios from "axios";
//ICON IMPORT
import { Twitter, Instagram, Discord, Store } from "../SVG/index";

//INTERNAL IMPORT
import Follow from "./Follow";
import Link from "./Link";

const RightSidebar = ({ followerArray, followingUsers, setReCall, reCall }) => {
  const footer = [
    {
      name: "Terms of Service",
      link: "#",
    },
    {
      name: "Privacy Policy",
      link: "#",
    },
  ];
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

  ///FOLLOWER USER
  const FOLLOW_USER = async (_id) => {
    try {
      console.log(_id);
      const currentUser = await CHECK_AUTH();
      const userId = currentUser._id;
      const res = await axios({
        method: "POST",
        url: `/api/user/follow/${userId}`,
        withCredentials: true,
        data: {
          _id: _id,
        },
      });

      if (res.status === 200) {
        setReCall(reCall + 1);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///UNFOLLOWER USER
  const UNFOLLOW_USER = async (_id) => {
    try {
      console.log(_id);
      const currentUser = await CHECK_AUTH();
      const userId = currentUser._id;
      const res = await axios({
        method: "POST",
        url: `/api/user/unfollow/${userId}`,
        withCredentials: true,
        data: {
          _id: _id,
        },
      });

      if (res.status === 200) {
        setReCall(reCall + 1);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="relative hidden h-full min-w-0 flex-[0_0_304px] lt:inline"
      style={{ minHeight: "944px" }}
    >
      <div className="relative flex" style={{ marginTop: "0px" }} />
      <div
        className="scrollbar-transparent sticky hidden h-fit min-w-0 overflow-x-hidden lt:flex"
        style={{ top: "12px" }}
      >
        <div className="flex min-h-screen w-full min-w-0 flex-col pb-28">
          <div className="relative" />
          <div className="flex h-full flex-col justify-between gap-10">
            {followerArray.length != 0 && (
              <div className="hidden w-full flex-00auto flex-col gap-5 lt:flex lt:pl-2">
                <div className="line-clamp-1 font-title text-title-s font-medium text-base800">
                  Suggested Follows
                </div>
                <div className="flex w-full flex-col gap-5">
                  {followerArray
                    .map((user, index) => (
                      <Follow user={user} FOLLOWER={FOLLOW_USER} type={true} />
                    ))
                    .slice(0, 6)}
                </div>
              </div>
            )}

            {followingUsers.length != 0 && (
              <div className="hidden w-full flex-00auto flex-col gap-5 lt:flex lt:pl-2">
                <div className="line-clamp-1 font-title text-title-s font-medium text-base800">
                  Your Followers
                </div>
                <div className="flex w-full flex-col gap-5">
                  {followingUsers.map((user, index) => (
                    <Follow user={user} FOLLOWER={UNFOLLOW_USER} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-20 flex flex-col">
              <div className="bg-base200 h-[1px] w-full mb-4" />
              <div className="flex items-center justify-center gap-4 text-neutral400">
                <Link icon={<Twitter />} link={"#"} />
                <Link icon={<Instagram />} link={"#"} />
                <Link icon={<Discord />} link={"#"} />
                <Link icon={<Store />} link={"#"} />
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-base-xs text-neutral400">
                {footer.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <p>{item.name}</p>
                  </a>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-base-xs text-neutral400">
                <a href="#">For Artists</a>
                <div className="c-lbNOYO">
                  <p className="cursor-pointer" type="button" id="radix-:r8:">
                    More
                  </p>
                </div>
                <p>© 2024 theblockchaincoders.com</p>
              </div>
            </div>
          </div>
          <div className="relative" />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
