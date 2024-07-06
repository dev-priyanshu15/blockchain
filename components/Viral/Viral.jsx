import React, { useState, useEffect } from "react";
import axios from "axios";

import { ViralCard } from "../index";

const Viral = ({ setPlayMusic, allPost }) => {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-col">
        <h1 className="hidden text-center font-title text-title-l font-medium text-black md:block md:text-left">
          Viral Sounds
        </h1>
        <div
          className="mt-4  flex flex-col gap-6"
          style={{
            marginBottom: "6rem",
          }}
        >
          {allPost?.map((post, index) => (
            <ViralCard
              setPlayMusic={setPlayMusic}
              image={"theblockchaincoders.jpg"}
              id={index}
              name={"Daulat hussain"}
              title={"Home Comming"}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viral;
