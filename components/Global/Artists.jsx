import React, { useEffect, useState } from "react";

import { Playlist1, Playlist2, Playlist3, Playlist4 } from "../SVG/index";

const Artists = ({ setOpenProduct, allArtist }) => {
  const reversedPostArray = [...allArtist].reverse();

  console.log(reversedPostArray);

  const [artists, setArtists] = useState(allArtist);
  const [artistsCopy, setArtistsCopy] = useState(allArtist);
  //FILTER
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  const onHandleSearch = (value) => {
    const filteredAudio = allArtist.filter(({ username }) =>
      username.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredAudio.length === 0) {
      setArtists(artistsCopy);
    } else {
      setArtists(filteredAudio);
    }
  };

  const onClearSearch = () => {
    if (allArtist.length && artistsCopy.length) {
      setArtists(artistsCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);
  return (
    <div className="c-SeZHp" style={{ pointerEvents: "auto" }}>
      <div
        className="c-hnqbLm c-hnqbLm-igtSaCo-css"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="c-fIaqhA c-fIaqhA-iPJLV-css">
          <div className="c-gAWPXf">
            <div className="c-cqxIEG">
              <h3>Global Music Artist</h3>
              <p>Find your favorite Web3 artist's music and create</p>
            </div>
          </div>
          <button
            onClick={() => setOpenProduct(false)}
            className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ihMrBgX-css"
          >
            <Playlist1 />
          </button>
        </div>
        <div className="c-VhclY c-VhclY-ifjSwAY-css">
          <div className="c-gYAfAA c-gYAfAA-ijyUrkL-css">
            <Playlist2 />
            <input
              type="text"
              placeholder="Search artist"
              className="c-gmlcKr c-gmlcKr-ihFhAhW-css"
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <a>
            <div className="c-hCAAXp">
              <div className="c-gfwBnK c-gfwBnK-iDABac-newPlaylist-true">
                <Playlist3 />
              </div>
              <div className="c-heNnCO">
                <span className="c-fCHooi">Create a new playlist</span>
              </div>
            </div>
          </a>

          {/* MUSIC */}
          <div className="c-bhnvWe">
            <div
              tabIndex={0}
              style={{
                height: "calc(100% - 68px)",
                outline: "none",
                overflowY: "auto",
                position: "relative",
              }}
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
                  {artists?.map((item, index) => (
                    <div style={{ overflowAnchor: "none" }}>
                      <div className="c-hCAAXp">
                        <div className="c-gfwBnK">
                          <div className="relative h-full w-full overflow-hidden rounded-md bg-black ">
                            <img
                              src={
                                item?.profilePicture ||
                                "theblockchaincoders.jpg"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="c-heNnCO">
                          <span className="c-fCHooi">
                            {item?.fullName || `@${item?.username}`}
                          </span>
                          <span className="c-awanL">
                            Sounds {item?.posts.length} • Followers{" "}
                            {item?.followers.length}
                          </span>
                        </div>
                        {item?.verify && (
                          <button className="c-bjyDZz c-bjyDZz-cIiumB-isAdded-true c-bjyDZz-icOFSW-cv">
                            <Playlist4 />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
        <div className="c-eSMcMP c-eSMcMP-ikGHifX-css">
          <div className="c-gzjvPF new_flex_gap">
            <button
              onClick={() => setOpenProduct(false)}
              className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-hxpvys-variant-secondary c-bPnuSX-iCZiFy-css"
            >
              Cancel
            </button>
            <a
              href="/create"
              className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary c-bPnuSX-igFqdAL-css"
            >
              Upload Music
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
