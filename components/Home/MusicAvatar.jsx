import React from "react";

//INTERNAL IMPORT
import { CirclePlus } from "../SVG/index";

const MusicAvatar = ({ image }) => {
  return (
    <div className="pr-3 md:pr-4">
      <div className="relative mr-1 flex items-center justify-center self-start md:mr-0">
        <a style={{ minWidth: "0px" }}>
          <div>
            <div className="relative w-[48px]">
              <a href="#">
                <div className="c-hrywGi c-hrywGi-iiaRruO-css">
                  <img
                    alt="Yoshiro Mare"
                    loading="lazy"
                    width={48}
                    height={48}
                    decoding="async"
                    data-nimg={1}
                    sizes="48px"
                    src={image}
                    style={{
                      color: "transparent",
                      borderRadius: "999px",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              </a>
            </div>
            <button
              class="absolute -bottom-1 -right-2 bg-transparent"
              aria-label="Follow user"
            >
              <CirclePlus />
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MusicAvatar;
