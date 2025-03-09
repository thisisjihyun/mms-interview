import React from "react";
import { CommentsProps } from "../types";

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 ? (
        <ul>
          {comments?.map(({ createdAt, author, body }) => (
            <li key={createdAt}>
              <strong>{author.login}</strong> - {createdAt}
              <p>{body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </>
  );
};

export default Comments;
