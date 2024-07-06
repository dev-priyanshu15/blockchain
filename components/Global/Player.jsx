import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Pause,
  UnLike,
  Heart,
  Player1,
  Player2,
  Player3,
  Player4,
  Player5,
  Player6,
  Player7,
  Player8,
} from "../SVG/index";

const Player = ({
  setExchange,
  setPlayginNow,
  setOpenProduct,
  setCredit,
  playMusic,
  activeUser,
  setReCall,
  reCall,
  allPost,
  setPlayMusic,
}) => {
  const [fileURL, setFileURL] = useState(
    "https://gateway.pinata.cloud/ipfs/QmYyYfZka2ZKVAH7dz4suFuf8eDJvtnWnUgwkTZXTb6ehh"
  );

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  //UPDATE
  const [skiped, setSkiped] = useState(false);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);

    console.log("PERCENTE:", percentage);
    console.log("THUMB:", centerThumb);
    console.log("PROGRESS:", centerProgressBar);
    if (percentage == 100 && skiped == false) {
      PLAY_COUNT();
      console.log("Completed");
      console.log("YES SKPIED", skiped);
    } else {
      console.log("ON API");
      console.log("NO SKIPED", skiped);
    }
  }, [percentage]);

  function secondsToHms(seconds) {
    if (!seconds) return "00m 00s";

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min == 0) {
      return `00m ${sec}s`;
    } else {
      return `${min}m ${sec}s`;
    }
  }

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
    setSkiped(true);
  };

  const play = () => {
    console.log("play");
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const resetMusic = () => {};

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
  ///LIKE_POST
  const LIKE_POST = async (postID) => {
    try {
      const currentUser = await CHECK_AUTH();

      const res = await axios({
        method: "POST",
        url: `/api/post/like/${postID}`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///DISLIKE_POST
  const DISLIKE_POST = async (postID) => {
    try {
      const currentUser = await CHECK_AUTH();

      const res = await axios({
        method: "POST",
        url: `/api/post/dislike/${postID}`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///PLAY_COUNT
  const PLAY_COUNT = async () => {
    try {
      const currentUser = await CHECK_AUTH();

      //BACKEND
      const res = await axios({
        method: "PUT",
        url: `/api/user/playcount/${currentUser._id}`,
        withCredentials: true,
        data: {
          play: Number(activeUser?.play) + 1,
        },
      });

      if (res.status === 200) {
        notifySuccess("Successfully Played");
        console.log(res.data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);

      notifyError("Try again later");
    }
  };

  //NEXT MUSIC PLAY
  const onNextClick = (allPost) => {
    if (currentIndex == 0) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex <= allPost.length - 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    // setPosition(0);
    // setMarginLeft(0);
    // setProgressBarWidth(0);
    // setCurrentTime(0);
    // setDuration(0);
    const nextMusic = allPost[currentIndex];
    setPlayMusic(nextMusic);
  };

  const onPreviousClick = (allPost) => {
    if (currentIndex == 0) {
      setCurrentIndex(allPost.length - 1);
    } else if (currentIndex <= allPost.length - 2) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
    // setPosition(0);
    // setMarginLeft(0);
    // setProgressBarWidth(0);
    // setCurrentTime(0);
    // setDuration(0);
    const nextMusic = allPost[currentIndex];
    console.log(nextMusic);
    setPlayMusic(nextMusic);
  };

  return (
    <div
      className="fixed bottom-0 z-audioPlayerContainer hidden h-20 max-h-20 w-full flex-col items-center border-t border-t-neutral200 bg-white md:flex [&_.like-icon]:[&_svg]:!h-4 [&_.like-icon]:[&_svg]:!w-4"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex w-full justify-between p-3">
        <div className="flex h-full w-full overflow-hidden md:max-w-[360px]">
          <div className="flex h-full w-full items-center gap-3">
            <div className="h-14 w-14 self-center overflow-hidden rounded-sm">
              <a
                className="relative h-full w-full overflow-hidden rounded-sm"
                href="#"
              >
                <img
                  width={112}
                  height={112}
                  src={playMusic?.image}
                  style={{ color: "transparent" }}
                />
              </a>
            </div>
            <div className="mr-6 flex flex-1 flex-col overflow-hidden">
              <div className="flex gap-3">
                <div className="relative h-5 w-auto overflow-hidden">
                  <a className="flex w-full max-w-[100%] items-center" href="#">
                    <div className="c-Wkdwb">
                      <div className="c-AsWAM">
                        <span className="block w-fit whitespace-nowrap font-title text-title-xs font-medium text-base800">
                          {playMusic?.title}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div tabIndex={0}>
                  {playMusic?.likes.includes(activeUser?._id) ? (
                    <button
                      onClick={() => DISLIKE_POST(playMusic?._id)}
                      type="button"
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                    >
                      <Heart />
                    </button>
                  ) : (
                    <button
                      onClick={() => LIKE_POST(playMusic?._id)}
                      type="button"
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                    >
                      <UnLike />
                    </button>
                  )}
                </div>
              </div>
              <div className="font-base text-base-xs font-medium text-base500">
                <a>
                  <span className="inline-block ">
                    {playMusic?.user.username || "Daulat Hussain"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full max-w-[1440px] flex-1 flex-col items-center">
          <div className="mb-2 flex h-[30px] w-[224px] items-center justify-between">
            {/* <button
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css data-[state=active]:text-fuchsia500 data-[state=inactive]:text-black"
              onClick={() => resetMusic()}
            >
              <Player1 />
            </button> */}
            <button
              onClick={() => onPreviousClick(allPost)}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css text-black focus:text-black hover:text-black active:text-black"
            >
              <Player2 />
            </button>
            <button
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ifGQLhp-css text-black focus:text-black hover:text-black active:text-black"
              onClick={() => play()}
            >
              {isPlaying ? <Pause /> : <Player3 />}
            </button>
            <button
              onClick={() => onNextClick(allPost)}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css text-black focus:text-black hover:text-black active:text-black"
            >
              <Player4 />
            </button>
            {/* <div className="relative block">
              <button
                className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css data-[state=active]:text-fuchsia500 data-[state=inactive]:text-black"
                data-state="inactive"
                title="Repeat"
              >
                <Player5 />
              </button>
            </div> */}
          </div>
          <audio
            ref={audioRef}
            onTimeUpdate={getCurrDuration}
            onLoadedData={(e) => {
              setDuration(e.currentTarget.duration.toFixed(2));
            }}
            src={playMusic?.audio || fileURL}
          ></audio>
          <div className="w-full flex-1">
            <div className="flex w-full items-center justify-center">
              <span className="mr-2 min-w-[28px] text-right font-base text-[10px] text-base-xs font-semibold text-neutral500">
                {secondsToHms(currentTime)}
              </span>
              <div className="new_slider-container">
                <div
                  className="new_progress-bar-cover"
                  style={{
                    width: `${progressBarWidth}px`,
                  }}
                ></div>
                <div
                  className="new_thumb"
                  ref={thumbRef}
                  style={{
                    left: `${position}%`,
                    marginLeft: `${marginLeft}px`,
                  }}
                ></div>
                <input
                  type="range"
                  value={position}
                  ref={rangeRef}
                  step="0.01"
                  className="new_range"
                  onChange={onChange}
                />
              </div>
              <span className="ml-2 min-w-[28px] text-left font-base text-[10px] text-base-xs font-semibold text-neutral500">
                {secondsToHms(duration)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full max-w-[360px] items-center justify-end gap-2 overflow-hidden pr-1">
          <button
            onClick={() => setExchange(true)}
            className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-igSQqDW-css"
          >
            <Player6 />
          </button>
          <button
            onClick={() => setPlayginNow(true)}
            className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-igSQqDW-css"
          >
            <Player7 />
          </button>

          <button
            onClick={() => setOpenProduct(true)}
            className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ikxyKnX-css data-[state=active]:text-fuchsia500"
          >
            <Player8 />
          </button>
          <button
            onClick={() => setCredit(true)}
            className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary min-w-none w-fit !px-3 !py-2"
          >
            Get Credit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
