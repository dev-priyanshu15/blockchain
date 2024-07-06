import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Notification1 } from "../SVG/index";

const Notifications = ({
  setEmail,
  rewardToken,
  REWARD_TOKEN,
  activeUser,
  rewardLock,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  ///CHECK_AUTH
  const CHECK_AUTH = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/auth/refetch",
        withCredentials: true,
      });
      let user;
      if (res.status === 200) {
        user = res.data;
        console.log(res.data._id);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  ///VERIFY_ACCOUNT
  const claimReward = async (REWARD_TOKEN) => {
    try {
      const transaction = await rewardToken(REWARD_TOKEN);
      const currentUser = await CHECK_AUTH();
      console.log(transaction);
      if (transaction.hash) {
        //BACKEND
        const res = await axios({
          method: "PUT",
          url: `/api/user/playcount/${currentUser._id}`,
          withCredentials: true,
          data: {
            play: 0,
          },
        });

        if (res.status === 200) {
          notifySuccess("transaction updated Successfully");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
      notifyError("Try again later");
    }
  };
  return (
    <div className="min-w-0 flex-1">
      <div className="flex w-full flex-1 flex-col">
        <h1 className="hidden text-center font-title text-title-l font-medium text-black md:block md:text-left">
          Notifications
        </h1>
        <div className="z-above1 flex w-full flex-col">
          <h1>
            {" "}
            <strong>Played:</strong> {activeUser?.play} -{" "}
            <strong>Remain:</strong> {5 - activeUser?.play}
          </h1>
          <div className="md:pt-4" style={{ opacity: 1 }}>
            <div
              data-virtuoso-scroller="true"
              style={{
                position: "relative",
                willChange: "height",
                height: "65px",
              }}
            >
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
                  data-test-id="virtuoso-item-list"
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginTop: "0px",
                  }}
                >
                  <div
                    data-index={0}
                    data-known-size={65}
                    data-item-index={0}
                    style={{ overflowAnchor: "none" }}
                  >
                    <div style={{ opacity: 1, minHeight: "64px" }}>
                      <div style={{ opacity: 1, minHeight: "64px" }}>
                        <div className="group relative z-base flex min-h-[40px] w-full items-center justify-between gap-0.5 py-4 text-base-m after:absolute after:inset-0 after:-left-4 after:-right-4 after:z-below after:rounded-[6px]  after:content-[''] after:hover:bg-base50 md:min-h-[48px] md:border-b md:border-b-base200 lt:py-3 ">
                          <div className="flex w-full cursor-pointer items-center gap-2 md:gap-3">
                            <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-[6px] bg-base900 ">
                              <Notification1 />
                            </div>
                            <div className="flex flex-wrap">
                              <span className="whitespace-nowrap font-semibold">
                                GM frens!&nbsp;
                              </span>
                              <span>Get&nbsp;</span>
                              <span className="md:hidden">emails&nbsp;</span>
                              <span className="hidden md:block">
                                email notifications&nbsp;
                              </span>
                              <br className="block md:hidden" />
                              <span>on new drops</span>
                            </div>
                          </div>
                          <div className="min-w-[80px] lt:min-w-[124px] dt:min-w-[136px]">
                            <button
                              onClick={() => setEmail(true)}
                              className="c-bPnuSX c-bPnuSX-kAMERu-size-XS c-bPnuSX-iRULOu-variant-tertiary hidden h-7 min-w-[78px] flex-shrink-0 px-1 py-2 transition-all duration-500 ease-in-out hover:bg-white hover:shadow-tertiary lt:flex"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div />
              </div>
            </div>
          </div>
          <h3 className="mt-4">🎵 Music Listening Reward Program 🎵</h3>
          <p className="mt-4">
            Welcome to our Music Listening Reward Program! We're excited to
            reward you for enjoying great music on our platform. Here's how it
            works:
          </p>
          <h3 className="mt-4">💰 Step 2: Earn TBC Tokens</h3>
          <p className="mt-4">
            For every 10 tracks you listen to, you'll earn TBC tokens as a
            reward for your engagement and support. These tokens can be used for
            various perks and benefits within our ecosystem.
          </p>
          <h3 className="mt-4">🏆 Step 3: Claim Your Reward</h3>
          <p className="mt-4">
            Once you've successfully listened to 10 tracks, you can claim your
            TBC tokens. Simply navigate to the rewards section of our platform
            and follow the prompts to claim your well-deserved tokens.
          </p>
          <h3 className="mt-4">🚀 Step 4: Keep Exploring and Earning</h3>
          <p className="mt-4">
            The more you listen, the more you earn! Keep exploring new music,
            discovering hidden gems, and accumulating TBC tokens along the way.
            Your support helps us grow and enrich our music community.
          </p>
          <h3 className="mt-4">🎉 Step 5: Spread the Word</h3>
          <p className="mt-4">
            Share your experience with friends and family! Let them know about
            our Music Listening Reward Program and how they too can earn rewards
            simply by enjoying music.
          </p>
          <h3 className="mt-4">📣 Note:</h3>
          <p className="mt-4">
            Start listening, start earning, and let the music carry you to new
            heights! Thank you for being a valued member of our community.
          </p>
        </div>

        {activeUser?.play >= rewardLock && (
          <div className="z-above1 flex w-full flex-col mb-12">
            <div className="md:pt-4" style={{ opacity: 1 }}>
              <div
                data-virtuoso-scroller="true"
                style={{
                  position: "relative",
                  willChange: "height",
                  height: "65px",
                }}
              >
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
                    data-test-id="virtuoso-item-list"
                    style={{
                      boxSizing: "border-box",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginTop: "0px",
                    }}
                  >
                    <div
                      data-index={0}
                      data-known-size={65}
                      data-item-index={0}
                      style={{ overflowAnchor: "none" }}
                    >
                      <div style={{ opacity: 1, minHeight: "64px" }}>
                        <div style={{ opacity: 1, minHeight: "64px" }}>
                          <div className="group relative z-base flex min-h-[40px] w-full items-center justify-between gap-0.5 py-4 text-base-m after:absolute after:inset-0 after:-left-4 after:-right-4 after:z-below after:rounded-[6px]  after:content-[''] after:hover:bg-base50 md:min-h-[48px] md:border-b md:border-b-base200 lt:py-3 ">
                            <div className="flex w-full cursor-pointer items-center gap-2 md:gap-3">
                              <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-[6px] bg-base900 ">
                                {/* <Notification1 /> */}
                                <img src="/logo.png" alt="" />
                              </div>
                              <div className="flex flex-wrap">
                                <span className="whitespace-nowrap font-semibold">
                                  Reward Avalible!&nbsp;
                                </span>
                                <span>Get&nbsp;</span>
                                <span className="md:hidden">your&nbsp;</span>
                                <span className="hidden md:block">
                                  reward token&nbsp;
                                </span>
                                <br className="block md:hidden" />
                                <span>for listening music</span>
                              </div>
                            </div>
                            <div className="min-w-[80px] lt:min-w-[124px] dt:min-w-[136px]">
                              <button
                                onClick={() => claimReward(REWARD_TOKEN)}
                                className="c-bPnuSX c-bPnuSX-kAMERu-size-XS c-bPnuSX-iRULOu-variant-tertiary hidden h-7 min-w-[78px] flex-shrink-0 px-1 py-2 transition-all duration-500 ease-in-out hover:bg-white hover:shadow-tertiary lt:flex"
                              >
                                Claim Reward 5 TBC Token
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
