import React from "react";

const ProfileImg = ({ activeUser }) => {
  return (
    <div className="relative flex w-full items-end justify-between lg:items-end">
      <div className="group z-above2 flex">
        <img
          alt="Profile Image"
          width={144}
          height={144}
          className="aspect-square h-full rounded-md object-cover"
          src={
            activeUser?.profilePicture
              ? `${activeUser?.profilePicture}`
              : "playlist_cover_background.png"
          }
          style={{
            color: "transparent",
            minWidth: "144px",
            minHeight: "144px",
          }}
        />
      </div>
    </div>
  );
};

export default ProfileImg;
