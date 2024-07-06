import React from "react";

const CommentBox = ({ setCommentMsg }) => {
  return (
    <div
      className="relative cursor-text overflow-hidden rounded-md bg-neutral100 p-2 outline-black focus-within:outline focus-within:outline-2 mt-1 h-[40vh] md:h-80"
      tabIndex={-1}
    >
      <textarea
        onChange={(e) => setCommentMsg(e.target.value)}
        className="new_full_width"
        rows="10"
      ></textarea>

      <div className="scrollbar-light h-full w-full overflow-y-auto">
        <div
          className="outline-none pb-8"
          style={{
            userSelect: "text",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <p>
            <br />
          </p>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 -mx-2 -my-1 flex select-none items-center gap-1 overflow-hidden rounded-full px-2 py-1 backdrop-blur bg-neutral100/50">
        <div className="text-neutral400">0/1000</div>
      </div>
    </div>
  );
};

export default CommentBox;
