import React, { useState, useEffect } from "react";

import { Music, Post, Feed } from "../index";

const Home = ({
  allArtist,
  setExchange,
  setPlayMusic,
  activeUser,
  setOpenComment,
  setAllUsers,
  allPost,
  popularPost,
  setReCall,
  reCall,
  setContractId,
  openComponent,
}) => {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex w-full flex-1 flex-col">
        <Music
          allArtist={allArtist}
          popularPost={popularPost}
          setPlayMusic={setPlayMusic}
        />
        <Post setExchange={setExchange} />
        <div className="hidden pb-5 md:block md:pr-2 ">
          <div className="flex h-[1px] w-full flex-col items-center justify-center overflow-visible py-5">
            <div className="h-[1px] w-full flex-shrink-0 bg-base200" />
          </div>
        </div>
        <Feed
          allPost={allPost}
          setPlayMusic={setPlayMusic}
          activeUser={activeUser}
          setOpenComment={setOpenComment}
          setReCall={setReCall}
          reCall={reCall}
          setContractId={setContractId}
          openComponent={openComponent}
        />
      </div>
    </div>
  );
};

export default Home;
