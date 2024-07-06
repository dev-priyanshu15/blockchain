import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
//INTERNAL IMPORT
import { Sidebar, Credit, Loader } from "../components/index";
import CoverImage from "../components/Create/CoverImage";
import MusicUpload from "../components/Create/MusicUpload";
import UploadedList from "../components/Create/UploadedList";

//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../context/context";

const create = () => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const [loader, setLoader] = useState(false);

  const [activeUser, setActiveUser] = useState();

  const [fileURL, setFileURL] = useState();
  const [imageURL, setImageURL] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const { createMusicNFT } = useContext(MusicNFTContext);

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
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  ///CREATE_POST
  const CREATE_POST = async (description, fileURL, title, imageURL) => {
    try {
      setLoader(true);
      const currentUser = await CHECK_AUTH();
      const musicNFT = await createMusicNFT(
        title,
        fileURL,
        imageURL,
        description
      );
      if (musicNFT.transaction.hash) {
        console.log(musicNFT);
        // console.log(currentUser);
        const res = await axios({
          method: "POST",
          url: `/api/post/create`,
          withCredentials: true,
          data: {
            userId: currentUser._id,
            title: title,
            image: imageURL,
            caption: description,
            fileURL: fileURL,
            tokenId: musicNFT.currentTokenId,
            txHash: musicNFT.transaction.hash,
            address: musicNFT.transaction.from,
          },
        });

        if (res.status === 201) {
          const credit = await axios({
            method: "PUT",
            url: `/api/user/credit/${currentUser._id}`,
            withCredentials: true,
            data: {
              credit: Number(activeUser?.credit) - 1,
            },
          });
          notifySuccess("Music NFT created successfully");
          window.location.reload();
          console.log(res.data);
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
      notifyError("something went wrong, try again later");
    }
  };

  useEffect(() => {
    CHECK_AUTH();
  }, []);

  return (
    <div class="font-base ">
      {/* ?? */}
      <Sidebar />
      <div
        id="layout"
        className="c-PJLV c-PJLV-llkfmI-withLeftNav-true c-PJLV-iiuDyin-css"
      >
        <main className="c-PJLV">
          <div></div>
          <div class="mx-auto my-0 h-[calc(100vh-93px)] w-full max-w-content overflow-hidden bg-white px-6 pb-6 pt-0">
            <div class="mx-auto h-full max-w-content">
              <div
                class="mb-10 font-title text-title-xl font-medium text-neutral800"
                style={{
                  marginTop: "2rem",
                }}
              >
                Create New Music
              </div>

              <div className="c-enbXEL c-enbXEL-jnUynx-featured-false">
                {/* //1 */}

                <UploadedList />
                {/* //2 */}

                {activeUser?.credit != 0 && (
                  <MusicUpload
                    fileURL={fileURL}
                    setFileURL={setFileURL}
                    notifySuccess={notifySuccess}
                    notifyError={notifyError}
                    setLoader={setLoader}
                  />
                )}

                {/* //3 */}
                {activeUser?.credit != 0 && (
                  <CoverImage
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                    setDescription={setDescription}
                    setTitle={setTitle}
                    notifySuccess={notifySuccess}
                    notifyError={notifyError}
                    setLoader={setLoader}
                  />
                )}

                {activeUser?.credit == 0 && (
                  <Credit activeUser={activeUser} setLoader={setLoader} />
                )}

                {loader && <Loader />}

                {/* //4 */}
                <div class="relative lt:hidden">
                  <div class="c-cMWDKR"></div>
                </div>
              </div>
              <div class="c-gZNBKH"></div>
            </div>
            {Number(activeUser?.credit) != 0 && (
              <div class="fixed bottom-0 left-0 z-stickyFooter flex h-14 w-full items-center justify-between bg-white px-3 py-2 shadow-high">
                <div class="flex items-center">
                  <a
                    href="/"
                    class="c-bPnuSX c-bPnuSX-eqXekF-size-M c-bPnuSX-hxpvys-variant-secondary c-bPnuSX-ilklqJG-css"
                  >
                    Cancel
                  </a>
                </div>
                <button
                  onClick={() =>
                    CREATE_POST(description, fileURL, title, imageURL)
                  }
                  class="c-bPnuSX c-bPnuSX-eqXekF-size-M c-bPnuSX-kiaVWo-variant-primary"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default create;
