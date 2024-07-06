import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

import { CreatePost1 } from "../SVG/index";

const CreatePost = ({ setExchange }) => {
  const [fileURL, setFileURL] = useState();
  const [imageURL, setImageURL] = useState();

  const [caption, setCaption] = useState("");

  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: `1b462045e4fc595393ae`,
            pinata_secret_api_key: `e588869f3d15bbaa11c48c62017548a07dcb1b18aa6b15736165e21666b452af`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        console.log(ImgHash);

        setFileURL(ImgHash);
        console.log("Image Uploade Successfully");
      } catch (error) {
        console.log("Unable to upload image to Pinata", error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

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

  ///CREATE_POST
  const CREATE_POST = async (caption, fileURL) => {
    try {
      const currentUser = await CHECK_AUTH();
      // console.log(currentUser);
      const res = await axios({
        method: "POST",
        url: `/api/post/create`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
          title: "",
          image: "",
          caption: caption,
          fileURL: fileURL,
        },
      });

      if (res.status === 201) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        className="c-kZStZF c-kZStZF-hGyizA-mobileFullScreen-true c-kZStZF-ibKvzhg-css min-h-[-webkit-fill-available]"
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="c-gLOVln c-gLOVln-fJozqV-size-medium c-gLOVln-dMNmtH-mobileFullScreen-true c-gLOVln-eZHfJo-cv pb-0 h-full md:h-fit"
          tabIndex={-1}
          style={{ pointerEvents: "auto" }}
        >
          <div className="z-above1 bg-white">
            <div className="flex justify-between">
              <div className="flex flex-col justify-center">
                <div className="font-title font-medium text-title-m md:text-title-l">
                  Exchange
                </div>
              </div>
              <button
                onClick={() => setExchange(false)}
                className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
              >
                <CreatePost1 />
              </button>
            </div>
          </div>

          <iframe
            src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
            height="660px"
            width="100%"
            style={{
              border: "0",
              margin: "0 auto",
              marginBottom: ".5rem",
              display: "block",
              borderRadius: "10px",
              maxWidth: "960px",
              minWidth: "300px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
