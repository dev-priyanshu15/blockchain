import React from "react";

import NavComp from "./NavComp";
import ProfileBtn from "./ProfileBtn";
import ProfileImg from "./ProfileImg";
import { Verified } from "../SVG/index";

const Profile1 = ({ activeUser, shortenAddress, setopenComponent }) => {
  return (
    <div className="hidden md:block">
      <div className="flex w-full flex-col gap-6 lt:px-0">
        <ProfileImg activeUser={activeUser} />
        <div className="relative flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="flex  font-title text-title-xl font-medium">
                  @{activeUser?.username} {activeUser?.verify && <Verified />}
                </h2>
                <div className="cursor-pointer font-base text-base-m font-medium text-base400 copy-trigger flex items-center gap-1.5">
                  <p className="publicAddr publicAddress margin-0 cursor-pointer">
                    {shortenAddress(activeUser?.address) || "Update Profile"}
                  </p>
                </div>
              </div>
              <ProfileBtn
                title={"Edit Profile"}
                setopenComponent={setopenComponent}
                styleClass={`block md:hidden`}
                secondClass={`font-title text-title-xs md:h-10 h-[32px] !w-auto min-w-[100px] rounded-full !px-3`}
              />

              <ProfileBtn
                title={"Edit Profile"}
                setopenComponent={setopenComponent}
                styleClass={`hidden md:block`}
                secondClass={`h-9 font-title text-title-xs md:h-10`}
                link="/profileEdit"
              />
            </div>
          </div>
          <div className="flex gap-5 pt-1 md:gap-8">
            <NavComp title={"Posts"} info={activeUser?.posts.length} />
            <NavComp title={"Followers"} info={activeUser?.followers.length} />
            <NavComp title={"Following"} info={activeUser?.following.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile1;
