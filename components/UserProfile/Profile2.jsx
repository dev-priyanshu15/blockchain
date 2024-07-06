import React from "react";

const Profile2 = ({ activeUser }) => {
  return (
    <div className="md:hidden">
      <div className="flex w-full flex-col gap-6">
        <div className="relative flex w-full items-center gap-3">
          <img
            alt="Profile Image"
            width={48}
            height={48}
            className="aspect-square h-full rounded-full object-cover"
            src="sound_letter_s.svg"
            style={{
              color: "transparent",
              minWidth: "48px",
              minHeight: "48px",
            }}
          />
          <div className="flex flex-col gap-1">
            <h2 className="font-title text-[20px] font-medium leading-[24px] text-white">
              @{activeUser?.username}
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
  );
};

export default Profile2;
