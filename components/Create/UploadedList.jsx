import React, { useEffect, useState } from "react";
import axios from "axios";
//INTERNAL IMPORT
import { PlaylistCard } from "../../components/index";
import { Pause, Create2 } from "../SVG/index";

const UploadedList = () => {
  const [allUserPosts, setAllUserPosts] = useState([]);
  const [allUserPostsCopy, setAllUserPostsCopy] = useState([]);
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
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };
  ///CREATE_POST
  const GET_ALL_POSTS = async (caption, fileURL) => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const res = await axios({
        method: "GET",
        url: `/api/post/user/${currentUser._id}`,
        withCredentials: true,
      });

      if (res?.status === 200) {
        setAllUserPosts(res?.data.posts);
        setAllUserPostsCopy(res?.data.posts);
        console.log(res?.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GET_ALL_POSTS();
  }, []);

  //FILTER
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  const onHandleSearch = (value) => {
    const filteredAudio = allUserPosts.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredAudio.length === 0) {
      setAllUserPosts(allUserPostsCopy);
    } else {
      setAllUserPosts(filteredAudio);
    }
  };

  const onClearSearch = () => {
    if (allUserPosts.length && allUserPostsCopy.length) {
      setAllUserPosts(allUserPostsCopy);
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
    <div className="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 className="c-ddfucX">Select</h3>
      <div className="c-gYAfAA c-gYAfAA-ifQYuuS-css">
        <Create2 />
        <input
          type="text"
          placeholder="Search songs by title"
          className="c-gmlcKr c-gmlcKr-ihFhAhW-css"
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <div className="c-gwhzgO max-h-[calc(100vh-341px)] overflow-auto">
        {allUserPosts?.map((post, index) => (
          <PlaylistCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default UploadedList;
