import React from "react";

import { PlayNow1, PlayNow2, PlayNow3 } from "../SVG/index";
import { convertTime, shortenAddress } from "../../utils/utils";

const PlayNow = ({ setPlayginNow, playMusic }) => {
  console.log(playMusic);
  return (
    <div>
      <div
        className="react-modal-sheet-container md!bottom-20 !bottom-0 !left-[unset] !right-0 !z-audioPlayerQueueMobile !h-full !overflow-hidden !rounded-none !rounded-t-md shadow-md md:absolute md:max-h-[64%] md:max-w-[390px]"
        style={{
          zIndex: 2,
          position: "fixed",
          right: "0px",
          bottom: "0px",
          width: "100%",
          backgroundColor: "rgb(255, 255, 255)",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px -2px 16px",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "auto",
          height: "calc(100% - env(safe-area-inset-top) - 34px)",
          transform: "none",
        }}
      >
        <div
          className="react-modal-sheet-content !overflow-hidden"
          style={{
            flex: "1 1 0%",
            overflow: "auto",
            position: "relative",
            userSelect: "none",
            touchAction: "pan-x",
          }}
        >
          <div className="relative max-h-screen overflow-auto bg-white p-6 md:h-full md:rounded-r-md md:rounded-t-md">
            <button
              onClick={() => setPlayginNow(false)}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css absolute right-5 top-5 p-[3px]"
            >
              <PlayNow1 />
            </button>
            <section className="[&:not(:first-of-type)]:mt-6">
              <div className="mb-4 flex">
                <h2 className="font-title text-title-m font-medium">Artist</h2>
              </div>
              <ul>
                <div style={{ position: "relative", height: "64px" }}>
                  <div
                    data-viewport-type="window"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0px",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        marginTop: "0px",
                      }}
                    >
                      <div style={{ overflowAnchor: "none" }}>
                        <li className="c-gKOMLZ c-gKOMLZ-jyChjf-isActive-true">
                          <button className="c-jpqdfl">
                            <img
                              width={96}
                              height={96}
                              src={
                                playMusic?.user.profilePicture ||
                                "theblockchaincoders.jpg"
                              }
                              style={{ color: "transparent" }}
                            />
                            <div className="c-hucdIx">
                              <PlayNow2 />
                            </div>
                          </button>
                          <button className="c-kvQrOV">
                            <div className="relative h-5 w-auto overflow-hidden">
                              <a className="flex w-full max-w-[100%] items-center">
                                <div className="c-Wkdwb">
                                  <div className="c-AsWAM">
                                    <span className="block w-fit whitespace-nowrap font-title text-title-xs font-medium text-base800">
                                      {playMusic?.user.fullName ||
                                        playMusic?.user.username}
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <span className="c-TCyxN">
                              {shortenAddress(playMusic?.address)}
                            </span>
                          </button>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </section>
            <section className="[&:not(:first-of-type)]:mt-6">
              <div className="mb-4 flex">
                <h2 className="font-title text-title-m font-medium">
                  Current Song
                </h2>
              </div>
              <ul>
                <div
                  data-virtuoso-scroller="true"
                  style={{ position: "relative", height: "64px" }}
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
                      style={{
                        boxSizing: "border-box",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        marginTop: "0px",
                      }}
                    >
                      <div style={{ overflowAnchor: "none" }}>
                        <li className="c-gKOMLZ">
                          <button className="c-jpqdfl">
                            <img
                              width={96}
                              height={96}
                              src={
                                playMusic?.image || "theblockchaincoders.jpg"
                              }
                              style={{ color: "transparent" }}
                            />
                            <div className="c-hucdIx">
                              <PlayNow3 />
                            </div>
                          </button>
                          <button className="c-kvQrOV">
                            <div className="relative h-5 w-auto overflow-hidden">
                              <a className="flex w-full max-w-[100%] items-center">
                                <div className="c-Wkdwb">
                                  <div className="c-AsWAM">
                                    <span className="block w-fit whitespace-nowrap font-title text-title-xs font-medium text-base800">
                                      {playMusic?.title}
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <span className="c-TCyxN">
                              {convertTime(playMusic?.createdAt)}
                            </span>
                          </button>
                          <div className="c-giMKno" />
                        </li>
                        <p>{playMusic?.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayNow;
