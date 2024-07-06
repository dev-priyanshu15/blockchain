import React from "react";

const CommentButton = ({
  setViewAllComment,
  postComments,
  CREATE_COMMENT,
  playMusic,
  commentMsg,
}) => {
  return (
    <div className="c-lcMBLM  c-lcMBLM-fZJslF-withoutPadding-true">
      <div className="flex w-full gap-3 pb-3">
        <button
          onClick={() => setViewAllComment(false)}
          className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-hxpvys-variant-secondary flex-1"
        >
          View All Comments {postComments?.length}
        </button>
        <button
          onClick={() => CREATE_COMMENT(playMusic, commentMsg)}
          className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary flex-1"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentButton;
