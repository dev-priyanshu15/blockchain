import React, { useState } from "react";

//INTERNAL IMPORT
import VerifiedCard from "./VerifiedCard";

const Follow = ({ user, FOLLOWER, type }) => {
  return (
    <div
      key={user?.fullName}
      className="flex flex-col items-center gap-2 lt:flex-row"
    >
      <div
        className="aspect-square h-10 w-10 overflow-hidden rounded-full bg-neutral100"
        style={{ minWidth: "0px" }}
      >
        <div className="relative w-[40px]">
          <a>
            <div className="c-hrywGi c-hrywGi-iiaRruO-css">
              <img
                alt={user?.fullName}
                width={40}
                height={40}
                src={user?.profilePicture || "theblockchaincoders.jpg"}
                style={{
                  color: "transparent",
                  borderRadius: "999px",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                }}
              />
            </div>
          </a>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <div style={{ minWidth: "0px" }}>
          <a className="flex items-center">
            <div className="font-title text-title-xxs font-medium text-base600">
              {user?.fullName || `@${user?.username}`}
            </div>
            {user?.verify && <VerifiedCard />}
          </a>
        </div>
        <button className="w-fit appearance-none text-base-xs font-medium text-base500 transition-all duration-500 ease-in-out hover:text-base600">
          {user?.followers.length} {user?.followers.length > 999 ? "K" : ""}
          &nbsp;followers
        </button>
      </div>
      <button
        onClick={() => FOLLOWER(user._id)}
        className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary h-7 w-[71px] min-w-[auto] font-base text-base-s font-semibold"
      >
        {type ? "Follow" : "Unfollow"}
      </button>
    </div>
  );
};

export default Follow;
