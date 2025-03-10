import React from "react";
import { CommentsProps } from "../types";
import { getTimeAgo } from "../utils/getTimeAgo";

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 ? (
        <ul>
          {comments?.map(({ createdAt, author, body }) => (
            <li key={getTimeAgo(createdAt)}>
              <strong>{author.login}</strong> - {getTimeAgo(createdAt)}
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
