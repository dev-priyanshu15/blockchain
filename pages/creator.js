import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL IMPORT
import {
  Footer,
  Sidebar,
  Player,
  Header,
  Music,
  Post,
  Feed,
  RightSidebar,
  Create,
  CreatePost,
  Playlist,
  PlayNow,
  Collect,
  ProfileMenu,
  Send,
  Bridge,
  Home,
  Viral,
  Explore,
  Notifications,
  NotificationPupup,
  Upcoming,
  RecentUpload,
  Sounds,
  Artists,
  ProfileEdit,
  Earning,
  ProfilePost,
  UserProfile,
  CreateAccount,
  CommentComp,
  Overlay,
} from "../components/index";

const creator = () => {
  const router = useRouter();

  const [artist, setArtist] = useState();
  const [allDappUsers, setAllDappUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);
  const [allArtist, setAllArtist] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [allPostCopy, setAllPostCopy] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  const [popularPostCopy, setPopularPostCopy] = useState([]);

  const [openComponent, setopenComponent] = useState("Home");
  const [openCreateBox, setOpenCreateBox] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [sendBridge, setSendBridge] = useState(false);
  const [playginNow, setPlayginNow] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [email, setEmail] = useState(false);
  const [authComponent, setAuthComponent] = useState(false);

  const [playMusic, setPlayMusic] = useState();
  const [openComment, setOpenComment] = useState(false);
  const [activeUserPost, setActiveUserPost] = useState([]);

  const [reCall, setReCall] = useState(0);

  ///CREATE_POST
  const GET_ALL_POSTS = async (userId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/post/user/${userId}`,
        withCredentials: true,
      });

      if (res?.status === 200) {
        setActiveUserPost(res?.data.posts);
        setPlayMusic(res?.data.posts[0]);
      }

      const resUser = await axios({
        method: "GET",
        url: `/api/user/${userId}`,
        withCredentials: true,
      });

      if (resUser?.status === 200) {
        setArtist(resUser?.data);
        console.log(resUser?.data);
        //FOLLOWING USER
        const followerPromises = resUser.data?.followers.map(async (userId) => {
          const user = await fetch(`/api/user/${userId}`);
          return user.json();
        });
        const followingUsers = await Promise.all(followerPromises);
        setFollowingUsers(followingUsers);

        console.log(followingUsers);

        //BLOCKED USER
        const BlockedUserPromises = resUser.data.blockList.map(
          async (userId) => {
            const user = await fetch(`/api/user/${userId}`);
            return user.json();
          }
        );
        const blockedUsers = await Promise.all(BlockedUserPromises);

        setBlockedUser(blockedUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GET_ALL_USERS = async (userId) => {
    try {
      let currentUser;

      const activeUser = await axios({
        method: "GET",
        url: "/api/auth/refetch",
        withCredentials: true,
      });

      currentUser = activeUser.data;

      const res = await axios({
        method: "GET",
        url: `/api/user/alldaapusers/${userId}`,
        withCredentials: true,
      });

      if (res.status === 200) {
        let filteredUsers = [];

        setAllArtist(res.data.allUsers);
        // console.log(res.data.allUsers);

        res.data.allUsers.forEach((user) => {
          if (user._id != currentUser._id) {
            filteredUsers.push(user);
          }
        });

        const notFollowers = filteredUsers.filter(
          (obj1) => !currentUser.followers.includes(obj1._id)
        );

        setAllDappUsers(notFollowers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    GET_ALL_POSTS(router.query.userId);
    GET_ALL_USERS(router.query.userId);
  }, [router.isReady, reCall]);

  return (
    <div class="font-base ">
      <Sidebar
        setOpenBox={setOpenBox}
        openBox={openBox}
        openComponent={openComponent}
        setopenComponent={setopenComponent}
        allArtist={allArtist}
      />

      <Footer setopenComponent={setopenComponent} />
      <div
        id="layout"
        className="c-PJLV c-PJLV-llkfmI-withLeftNav-true c-PJLV-iiuDyin-css"
      >
        <UserProfile
          activeUser={artist}
          setopenComponent={setopenComponent}
          setPlayMusic={setPlayMusic}
          setOpenComment={setOpenComment}
          followerArray={allDappUsers}
          followingUsers={followingUsers}
          activeUserPost={activeUserPost}
          path={router?.pathname}
          setReCall={setReCall}
          reCall={reCall}
        />
      </div>

      <Player
        setOpenCreateBox={setOpenCreateBox}
        setPlayginNow={setPlayginNow}
        setOpenProduct={setOpenProduct}
        setAirdrop={setAirdrop}
        playMusic={playMusic}
      />

      {playginNow && (
        <PlayNow setPlayginNow={setPlayginNow} playMusic={playMusic} />
      )}
    </div>
  );
};

export default creator;
