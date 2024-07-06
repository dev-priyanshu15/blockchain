import React, { useState, useEffect, useRef } from "react";

import { MobilePlay1, Pause } from "../SVG/index";

const MobilePlay = ({ playMusic }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef();

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

  return (
    <div className="c-eHBbeS">
      <div className="c-MPfOK c-ivmeYE">
        <audio ref={audioRef} src={playMusic?.audio}></audio>
        <div className="c-etwoYY">
          <div className="c-hrywGi c-hrywGi-ikncNmC-css">
            <img
              width={40}
              height={40}
              src={playMusic?.image}
              style={{
                color: "transparent",
                borderRadius: "4px",
                aspectRatio: "1 / 1",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="c-Fxyin">
            <h3 className="c-dLAaxE">{playMusic?.title}</h3>
            <p className="c-fwxSwg">{playMusic?.user.username}</p>
          </div>
        </div>
        <div className="c-hMSvuL">
          <div tabIndex={0}>
            <button
              onClick={() => play()}
              className="c-ebvTKE c-ebvTKE-ioOiYU-variant-inverted c-ebvTKE-iiPVwDX-css"
            >
              {isPlaying ? <Pause /> : <MobilePlay1 />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlay;
