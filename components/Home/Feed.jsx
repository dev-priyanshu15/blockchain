import React from "react";

//INTERNAL IMPORT
import MusicFeedCard from "./MusicFeedCard";

const Feed = ({
  allPost,
  setPlayMusic,
  activeUser,
  setOpenComment,
  setReCall,
  reCall,
  setContractId,
  path,
  openComponent,
}) => {
  const reversedPostArray = [...allPost].reverse();
  return (
    <div
      style={{ position: "relative", willChange: "height", height: "100px" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
        }}
      >
        <div
          data-test-id="virtuoso-item-list"
          style={{
            boxSizing: "border-box",
            paddingTop: "0px",
            paddingBottom: "100px",
            marginTop: "0px",
          }}
        >
          {reversedPostArray?.map((item, index) => (
            <MusicFeedCard
              activeUser={activeUser}
              setPlayMusic={setPlayMusic}
              key={index}
              item={item}
              setOpenComment={setOpenComment}
              setReCall={setReCall}
              reCall={reCall}
              setContractId={setContractId}
              path={path}
              openComponent={openComponent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
