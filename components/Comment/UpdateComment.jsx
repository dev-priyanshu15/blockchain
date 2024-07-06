import React, { useState } from "react";

const UpdateComment = ({
  comment,
  setUpdateCommentID,
  activeUser,
  UPDATE_COMMENT,
}) => {
  const [updateComment, setUpdateComment] = useState();
  return (
    <>
      {" "}
      <textarea
        onChange={(e) => setUpdateComment(e.target.value)}
        className="new_comment_reply"
        rows="3"
      ></textarea>
      <div className="c-lcMBLM  c-lcMBLM-fZJslF-withoutPadding-true">
        <div className="flex w-full gap-3 ">
          <button
            onClick={() => setUpdateCommentID("")}
            className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-hxpvys-variant-secondary flex-1"
          >
            Close
          </button>
          <button
            onClick={() => UPDATE_COMMENT(comment, updateComment)}
            className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary flex-1"
          >
            Edit Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateComment;
