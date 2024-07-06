import React from "react";

const Mobile = () => {
  return (
    <div className="md:hidden">
      <div className="flex w-full flex-col">
        <div className="relative flex h-10 w-full items-center justify-center">
          <div className="center absolute left-0 flex h-10">
            <button>
              <div className="relative w-[28px]">
                <div className="c-hrywGi c-hrywGi-ijsqUvB-css">
                  <img
                    alt="profile"
                    width={28}
                    height={28}
                    src="/logo.png"
                    style={{
                      color: "transparent",
                      borderRadius: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </button>
          </div>
          <span className="font-title font-medium text-black">
            Artists Studio
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
