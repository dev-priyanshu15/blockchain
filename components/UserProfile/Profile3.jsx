import React from "react";

const Profile3 = () => {
  return (
    <div className="sticky top-0 z-stickyHeader flex bg-white lt:pt-6">
      <div className="relative mt-6 flex w-full flex-shrink-0 gap-6 overflow-x-auto border-b border-solid border-b-base200 align-baseline scrollbar-none lg:mt-8 lt:mt-0">
        <a className="transition-color border-b-2 border-solid pb-1 font-title !text-title-m capitalize outline-none duration-100 ease-in font-medium [-webkit-tap-highlight-color:transparent] hover:text-base800 md:pb-2 border-b-black text-base800">
          posts
        </a>
        <a className="transition-color border-b-2 border-solid border-b-transparent pb-1 font-title !text-title-m capitalize outline-none duration-100 ease-in font-medium [-webkit-tap-highlight-color:transparent] hover:text-base800 md:pb-2 text-base500">
          collection
        </a>
        <a className="transition-color border-b-2 border-solid border-b-transparent pb-1 font-title !text-title-m capitalize outline-none duration-100 ease-in font-medium [-webkit-tap-highlight-color:transparent] hover:text-base800 md:pb-2 text-base500">
          playlists
        </a>
      </div>
    </div>
  );
};

export default Profile3;
