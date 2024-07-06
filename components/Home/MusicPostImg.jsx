import React, { useEffect } from "react";
import axios from "axios";

const MusicPostImg = ({ image }) => {
  return (
    <div className="musicCardProfileIMg">
      <span className="hidden lt:block">
        <div className="relative w-[16px]">
          <div className="c-hrywGi c-hrywGi-holfMk-border-true c-hrywGi-ikkHwcD-css">
            <img
              alt="Music-Garden"
              loading="lazy"
              width={16}
              height={16}
              decoding="async"
              data-nimg={1}
              sizes="16px"
              src={image}
              style={{
                color: "transparent",
                borderRadius: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </span>
      <span className="block lt:hidden">
        <div className="relative w-[12px]">
          <div className="c-hrywGi c-hrywGi-holfMk-border-true c-hrywGi-ikkHwcD-css">
            <img
              alt="Music-Garden"
              loading="lazy"
              width={12}
              height={12}
              decoding="async"
              data-nimg={1}
              sizes="12px"
              src={image}
              style={{
                color: "transparent",
                borderRadius: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </span>
    </div>
  );
};

export default MusicPostImg;
