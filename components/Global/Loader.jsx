import React from "react";

const Loader = () => {
  return (
    <div
      data-state="open"
      className="c-kZStZF c-kZStZF-ihcRhWX-css"
      style={{ pointerEvents: "auto" }}
    >
      <div className="tbc_loader">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="tbc_slider"
            style={{ "--i": index }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
