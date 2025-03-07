import React from "react";

interface CommentsProps {
  comments: Array<{
    createdAt: string;
    author: {
      login: string;
    };
    body: string;
  }>;
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 ? (
        <ul>
          {comments?.map((comment: any) => (
            <li key={comment.createdAt}>
              <strong>{comment.author.login}</strong> - {comment.createdAt}
              <p>{comment.body}</p>
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
