import React from "react";
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

import CommentReply from "./CommentReply";
import UpdateComment from "./UpdateComment";

const AllComments = ({
  postComments,
  DISLIKE_COMMENT,
  activeUser,
  LIKE_COMMENT,
  setActiveReplyId,
  activeReplyId,
  CREATE_COMMENT_REPLY,
  LIKE_REPLY_COMMENT,
  DISLIKE_REPLY_COMMENT,
  DELETE_COMMENT,
  updateCommentID,
  setUpdateCommentID,
  UPDATE_COMMENT,
}) => {
  return (
    <>
      {postComments?.map((comment, index) => (
        <>
          <div>
            <div className="cursor-pointer rounded-lg md:pr-6">
              <div className="flex flex-row">
                <MusicAvatar image={"theblockchaincoders.jpg"} />
                <div className="w-full min-w-0">
                  <div className="flex flex-00auto items-start gap-2 pb-1.5 md:gap-4">
                    <div className="flex flex-col gap-0.5 md:flex-row md:items-center">
                      <a style={{ minWidth: "0px" }} />
                      <a>
                        <div className="flex items-center gap-1">
                          <div className="font-base text-base-m font-semibold text-base800 md:text-base-l">
                            {comment?.user.username}
                          </div>
                          <div>
                            {/* {comment?.user.verify && (
                              <div className="block md:!hidden">
                                <div className="c-PJLV c-PJLV-ijAFnOy-css md:[&_svg]:hover:rounded-full md:[&_svg]:hover:shadow-secondary">
                                  <Verified />
                                </div>
                              </div>
                            )} */}
                            {comment?.user.verify && (
                              <div className="!hidden md:!block">
                                <div className="c-PJLV c-PJLV-ijAFnOy-css cursor-default hover:cursor-default md:[&_svg]:hover:rounded-full md:[&_svg]:hover:shadow-secondary">
                                  <Verified />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                      <div className="flex items-center self-start font-base text-base-m font-normal text-base500 md:ml-1 md:text-base-l lg:h-6">
                        <div className="flex flex-row items-center">
                          <span className="px-1 text-[8px] font-normal">•</span>
                          <button className="cursor-default">
                            <span className="hover:text-base600">
                              {convertTime(comment.createdAt)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="overflow-hidden whitespace-pre-wrap break-words transition-[max-height] duration-200 ease-in-out max-h-[140px] md:max-h-[152px]">
                        <div>
                          <div className="whitespace-pre-wrap font-base text-base-m md:text-base-l">
                            <p>
                              <span>{comment.text}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="new_comment_margin -my-1 flex h-7 items-center gap-8">
            <button
              onClick={() => setActiveReplyId(comment._id)}
              className="cursor-pointer rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
            >
              <div className="flex items-center gap-2">
                <Comment />
                <span className="font-base font-medium text-base900">
                  {comment.replies.length || 0}
                </span>
              </div>
            </button>

            {comment.likes.length == 0 ? (
              <button
                onClick={() => LIKE_COMMENT(comment)}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {comment?.likes.length || 0}
                </span>
              </button>
            ) : comment.likes.length != 0 ? (
              <>
                {comment.likes.map((like) => {
                  if (like == activeUser._id) {
                    return (
                      <button
                        onClick={() => DISLIKE_COMMENT(comment)}
                        type="button"
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
                      >
                        <ArrowReshare />
                        <span className="font-base font-medium text-base900">
                          {comment?.likes.length || 0}
                        </span>
                      </button>
                    );
                  }
                })}
              </>
            ) : (
              <button
                onClick={() => LIKE_COMMENT(comment)}
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <ArrowReshare />
                <span className="font-base font-medium text-base900">
                  {item?.likes.length || 0}
                </span>
              </button>
            )}
            {activeUser._id == comment.user._id ? (
              <button
                onClick={() => setUpdateCommentID(comment._id)}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-base-m hover:bg-neutral100 active:scale-95"
              >
                <CircleArrowUp />
                <span className="font-base font-medium text-base900">Edit</span>
              </button>
            ) : (
              ""
            )}

            <button
              type="button"
              className="cursor-pointer rounded-md px-2 py-1 hover:bg-neutral100 active:scale-95"
            >
              <ArrowUp />
            </button>
          </div>
          {activeReplyId == comment._id ? (
            <CommentReply
              comment={comment}
              setActiveReplyId={setActiveReplyId}
              CREATE_COMMENT_REPLY={CREATE_COMMENT_REPLY}
              LIKE_REPLY_COMMENT={LIKE_REPLY_COMMENT}
              activeUser={activeUser}
              DISLIKE_REPLY_COMMENT={DISLIKE_REPLY_COMMENT}
              DELETE_COMMENT={DELETE_COMMENT}
            />
          ) : (
            ""
          )}
          {updateCommentID == comment._id &&
          comment.user._id == activeUser._id ? (
            <UpdateComment
              comment={comment}
              setUpdateCommentID={setUpdateCommentID}
              activeUser={activeUser}
              UPDATE_COMMENT={UPDATE_COMMENT}
            />
          ) : (
            ""
          )}
        </>
      ))}
    </>
  );
};

export default AllComments;
