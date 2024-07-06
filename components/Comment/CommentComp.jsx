import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Verified,
  Play,
  ArrowUp,
  CircleArrowUp,
  ArrowReshare,
  Comment,
  Close,
} from "../SVG/index";
import MusicAvatar from "../Home/MusicAvatar";
import { convertTime } from "../../utils/utils";
//COMMENT COMPONENT
import CommentBox from "./CommentBox";
import CommentButton from "./CommentButton";
import CommentView from "./CommentView";
import AllComments from "./AllComments";

const CommentComp = ({
  setOpenComment,
  playMusic,
  activeUser,
  setReCall,
  reCall,
}) => {
  const [commentMsg, setCommentMsg] = useState("");
  const [replyMsg, setReplyMsg] = useState("");
  const [postComments, setPostComments] = useState();
  const [viewAllComment, setViewAllComment] = useState(true);
  const [activeReplyId, setActiveReplyId] = useState("");
  const [updateCommentID, setUpdateCommentID] = useState("");

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
  const CREATE_COMMENT = async (playMusic, commentMsg) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/create`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
          postId: playMusic._id,
          text: commentMsg,
        },
      });

      if (res.status === 201) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///CREATE_COMMENT_REPLY
  const CREATE_COMMENT_REPLY = async (comment, replyMsg) => {
    try {
      const commentId = comment._id;
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/create/reply/${commentId}`,
        withCredentials: true,
        data: {
          userId: currentUser._id,
          text: replyMsg,
        },
      });

      if (res.status === 201) {
        console.log(res.data);
        setReCall(reCall + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //DISLIKE_REPLY_COMMENT
  const UPDATE_COMMENT = async (comment, updateComment) => {
    try {
      const currentUser = await CHECK_AUTH();

      const commentId = comment._id;
      const res = await axios({
        method: "PUT",
        url: `/api/comment/update/${commentId}`,
        withCredentials: true,
        data: {
          text: updateComment,
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

  ///GET_ALL_COMMENTS
  const GET_ALL_COMMENTS = async (playMusic) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "GET",
        url: `/api/comment/post/${playMusic._id}`,
        withCredentials: true,
      });

      if (res.status === 200) {
        setPostComments(res.data.comments);
        console.log(res.data.comments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GET_ALL_COMMENTS(playMusic);
  }, [playMusic]);

  //LIKE_COMMENT
  const LIKE_COMMENT = async (comment) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/like/${comment._id}`,
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

  //DISLIKE_COMMENT
  const DISLIKE_COMMENT = async (comment) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/dislike/${comment._id}`,
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

  //LIKE_REPLY_COMMENT
  const LIKE_REPLY_COMMENT = async (comment, reply) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/${comment._id}/replies/like/${reply._id}`,
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

  //DISLIKE_REPLY_COMMENT
  const DISLIKE_REPLY_COMMENT = async (comment, reply) => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios({
        method: "POST",
        url: `/api/comment/${comment._id}/replies/dislike/${reply._id}`,
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

  //DISLIKE_REPLY_COMMENT
  const DELETE_COMMENT = async (comment, reply) => {
    try {
      const currentUser = await CHECK_AUTH();

      const commentId = comment._id;
      const replyId = reply._id;
      const res = await axios({
        method: "DELETE",
        url: `/api/comment/delete/${commentId}/replies/${replyId}`,
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res.data);
        setReCall(reCall + 1);
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
                  Add comment
                </div>
              </div>
              <button
                onClick={() => setOpenComment(false)}
                className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
              >
                <Close />
              </button>
            </div>
          </div>
          <div className="c-epuwnk c-epuwnk-jFYYxX-withoutPaddingBottom-true relative flex flex-col px-0">
            <div className="relative flex-1 overflow-x-hidden">
              <div className="flex h-full flex-col gap-6 px-4 pb-4 transition-transform duration-200 ease-out lt:px-6 lt:pb-6 translate-x-0 new_margin_bottom_y">
                {viewAllComment ? (
                  <>
                    <CommentBox setCommentMsg={setCommentMsg} />
                    <CommentButton
                      setViewAllComment={setViewAllComment}
                      postComments={postComments}
                      CREATE_COMMENT={CREATE_COMMENT}
                      playMusic={playMusic}
                      commentMsg={commentMsg}
                    />
                    <CommentView
                      postComments={postComments}
                      LIKE_COMMENT={LIKE_COMMENT}
                      DISLIKE_COMMENT={DISLIKE_COMMENT}
                      activeUser={activeUser}
                      CREATE_COMMENT_REPLY={CREATE_COMMENT_REPLY}
                      setActiveReplyId={setActiveReplyId}
                      activeReplyId={activeReplyId}
                      LIKE_REPLY_COMMENT={LIKE_REPLY_COMMENT}
                      DISLIKE_REPLY_COMMENT={DISLIKE_REPLY_COMMENT}
                      DELETE_COMMENT={DELETE_COMMENT}
                      updateCommentID={updateCommentID}
                      setUpdateCommentID={setUpdateCommentID}
                    />
                  </>
                ) : (
                  <AllComments
                    postComments={postComments}
                    LIKE_COMMENT={LIKE_COMMENT}
                    DISLIKE_COMMENT={DISLIKE_COMMENT}
                    activeUser={activeUser}
                    setActiveReplyId={setActiveReplyId}
                    activeReplyId={activeReplyId}
                    CREATE_COMMENT_REPLY={CREATE_COMMENT_REPLY}
                    LIKE_REPLY_COMMENT={LIKE_REPLY_COMMENT}
                    DISLIKE_REPLY_COMMENT={DISLIKE_REPLY_COMMENT}
                    DELETE_COMMENT={DELETE_COMMENT}
                    updateCommentID={updateCommentID}
                    setUpdateCommentID={setUpdateCommentID}
                    UPDATE_COMMENT={UPDATE_COMMENT}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComp;
