import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../context/context";

//INTERNAL IMPORT
import {
  Footer,
  Sidebar,
  Player,
  Header,
  RightSidebar,
  Artists,
  PlayNow,
  Credit,
  ProfileMenu,
  Send,
  TokenICO,
  Exchange,
  Home,
  Viral,
  Explore,
  Notifications,
  NotificationPupup,
  UserProfile,
  CreateAccount,
  CommentComp,
  Contract,
  Loader,
  MobilePlay,
} from "../components/index";

const index = () => {
  const {
    musicNFT_Address,
    loader,
    setLoader,
    transferEther,
    transferToOwnerAcc,
    rewardToken,
    REWARD_TOKEN,
    rewardLock,
  } = useContext(MusicNFTContext);

  const [activeUser, setActiveUser] = useState();
  const [allDappUsers, setAllDappUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);
  const [allArtist, setAllArtist] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [allPostCopy, setAllPostCopy] = useState([]);
  const [popularPost, setPopularPost] = useState([]);

  const [popularPostCopy, setPopularPostCopy] = useState([]);

  const [openComponent, setopenComponent] = useState("Home");

  const [exchange, setExchange] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [tokenICO, setTokenICO] = useState(false);
  const [playginNow, setPlayginNow] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [credit, setCredit] = useState(false);
  const [email, setEmail] = useState(false);
  const [authComponent, setAuthComponent] = useState(false);

  const [playMusic, setPlayMusic] = useState();
  const [openComment, setOpenComment] = useState(false);

  const [reCall, setReCall] = useState(0);
  const [contractId, setContractId] = useState();

  useEffect(() => {
    const storedCookieValue = Cookies.get("token");
    if (storedCookieValue) {
      setAuthComponent(true);
    } else {
      setAuthComponent(false);
    }
  }, []);

  ////CHECK_AUTH
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
        setActiveUser(res.data);

        //FOLLOWING USER
        const followerPromises = res.data.followers.map(async (userId) => {
          const user = await fetch(`/api/user/${userId}`);
          return user.json();
        });
        const followingUsers = await Promise.all(followerPromises);
        setFollowingUsers(followingUsers);

        //BLOCKED USER
        const BlockedUserPromises = res.data.blockList.map(async (userId) => {
          const user = await fetch(`/api/user/${userId}`);
          return user.json();
        });
        const blockedUsers = await Promise.all(BlockedUserPromises);

        setBlockedUser(blockedUsers);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  ///GET ALL USERS
  const GET_ALL_USERS = async () => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const userId = currentUser._id;
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

  ///CREATE_POST
  const GET_ALL_POSTS = async (caption, fileURL) => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const res = await axios({
        method: "GET",
        url: `/api/post/all/${currentUser._id}`,
        withCredentials: true,
      });

      if (res?.status === 200) {
        setPlayMusic(res?.data.posts[0]);
        setAllPost(res?.data.posts);
        setAllPostCopy(res?.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///CREATE_POST
  const GET_FILTERED = async (caption, fileURL) => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const res = await axios({
        method: "GET",
        url: `/api/post/all/${currentUser._id}`,
        withCredentials: true,
      });

      if (res?.status === 200) {
        const Array = res?.data.posts.sort(
          (a, b) => b.likes.length - a.likes.length
        );

        setPopularPost(Array);
        setPopularPostCopy(Array);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GET_ALL_USERS();
    GET_ALL_POSTS();
    GET_FILTERED();
  }, [reCall]);

  //FILTER ALL POST
  const onHandleSearch = (value) => {
    const filteredAudio = allPost.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredAudio.length === 0) {
      setAllPost(allPostCopy);
    } else {
      setAllPost(filteredAudio);
    }
  };

  const onClearSearch = () => {
    if (allPost.length && allPostCopy.length) {
      setAllPost(allPostCopy);
    }
  };

  //POPULAR POST
  const onHandleSearchPopular = (value) => {
    const filteredAudioPouplar = popularPost.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredAudioPouplar.length === 0) {
      setPopularPost(popularPostCopy);
    } else {
      setPopularPost(filteredAudioPouplar);
    }
  };

  const onClearSearchPopular = () => {
    if (popularPost.length && popularPostCopy.length) {
      setPopularPost(popularPostCopy);
    }
  };

  return (
    <>
      {!authComponent ? (
        <div className="new_loader">
          <CreateAccount />
        </div>
      ) : (
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
            <Header
              activeUser={activeUser}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              setAuthComponent={setAuthComponent}
              onHandleSearch={
                openComponent == "Explore"
                  ? onHandleSearchPopular
                  : onHandleSearch
              }
              onClearSearch={
                openComponent == "Explore"
                  ? onClearSearchPopular
                  : onClearSearch
              }
            />

            {openComponent == "Profile" ? (
              <>
                <UserProfile
                  activeUser={activeUser}
                  setopenComponent={setopenComponent}
                  setPlayMusic={setPlayMusic}
                  activeUser={activeUser}
                  setOpenComment={setOpenComment}
                  followerArray={allDappUsers}
                  followingUsers={followingUsers}
                  setReCall={setReCall}
                  reCall={reCall}
                  openComponent={openComponent}
                  setContractId={setContractId}
                />
              </>
            ) : (
              <main className="c-PJLV">
                <div className="relative flex min-h-page justify-center overflow-x-hidden md:min-h-md-page lt:overflow-x-clip">
                  <div className="flex w-full gap-7 px-4 pb-6 md:px-6 dt:max-w-content">
                    {/* //HOME */}
                    {openComponent == "Home" ? (
                      <>
                        <Home
                          allPost={allPost}
                          popularPost={popularPost}
                          allArtist={allArtist}
                          setExchange={setExchange}
                          setPlayMusic={setPlayMusic}
                          activeUser={activeUser}
                          setOpenComment={setOpenComment}
                          setReCall={setReCall}
                          reCall={reCall}
                          setContractId={setContractId}
                          openComponent={openComponent}
                        />
                        <RightSidebar
                          followerArray={allDappUsers}
                          followingUsers={followingUsers}
                          setReCall={setReCall}
                          reCall={reCall}
                        />
                      </>
                    ) : openComponent == "Viral Sounds" ? (
                      <>
                        <Viral setPlayMusic={setPlayMusic} allPost={allPost} />
                        <RightSidebar
                          followerArray={allDappUsers}
                          followingUsers={followingUsers}
                          setReCall={setReCall}
                          reCall={reCall}
                        />
                      </>
                    ) : openComponent == "Notifications" ? (
                      <>
                        <Notifications
                          setEmail={setEmail}
                          rewardToken={rewardToken}
                          REWARD_TOKEN={REWARD_TOKEN}
                          activeUser={activeUser}
                          rewardLock={rewardLock}
                        />
                        <RightSidebar
                          followerArray={allDappUsers}
                          followingUsers={followingUsers}
                          setReCall={setReCall}
                          reCall={reCall}
                        />
                      </>
                    ) : openComponent == "Explore" ? (
                      <Explore
                        popularPost={popularPost}
                        allArtist={allArtist}
                        setPlayMusic={setPlayMusic}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </main>
            )}
          </div>

          {openComment && (
            <CommentComp
              setOpenComment={setOpenComment}
              playMusic={playMusic}
              activeUser={activeUser}
              setReCall={setReCall}
              reCall={reCall}
            />
          )}

          {exchange && <Exchange setExchange={setExchange} />}
          <Player
            setExchange={setExchange}
            setPlayginNow={setPlayginNow}
            setOpenProduct={setOpenProduct}
            setCredit={setCredit}
            playMusic={playMusic}
            activeUser={activeUser}
            setReCall={setReCall}
            reCall={reCall}
            allPost={allPost}
            setPlayMusic={setPlayMusic}
          />
          <div className="mobilePlayer">
            <MobilePlay playMusic={playMusic} />
          </div>

          {openProduct && (
            <Artists setOpenProduct={setOpenProduct} allArtist={allArtist} />
          )}

          {playginNow && (
            <PlayNow setPlayginNow={setPlayginNow} playMusic={playMusic} />
          )}
          {credit && (
            <Credit
              activeUser={activeUser}
              setCredit={setCredit}
              setLoader={setLoader}
              transferToOwnerAcc={transferToOwnerAcc}
            />
          )}

          {openMenu && (
            <ProfileMenu
              activeUser={activeUser}
              setOpenSend={setOpenSend}
              setTokenICO={setTokenICO}
              setopenComponent={setopenComponent}
            />
          )}
          {openSend && (
            <Send
              setOpenSend={setOpenSend}
              setOpenMenu={setOpenMenu}
              setLoader={setLoader}
              transferEther={transferEther}
            />
          )}
          {tokenICO && (
            <TokenICO
              setLoader={setLoader}
              setTokenICO={setTokenICO}
              setOpenMenu={setOpenMenu}
            />
          )}
          {email && <NotificationPupup setEmail={setEmail} />}
          {contractId && (
            <Contract
              setContractId={setContractId}
              contractId={contractId}
              musicNFT_Address={musicNFT_Address}
            />
          )}

          {loader && <Loader />}
        </div>
      )}
    </>
  );
};

export default index;
