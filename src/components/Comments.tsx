import React from "react";
import { getTimeAgo } from "../utils/getTimeAgo";
import DetailsHooks from "../hooks/DetailsHooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { CommentsContainer } from "../styles/Details.styles";

const Comments: React.FC = () => {
  const { commentsData, data, containerRef, loadMore, loading } =
    DetailsHooks();

  useInfiniteScroll(containerRef, loadMore, loading, [data]);

  return (
    <>
      <h3>Comments</h3>
      <CommentsContainer ref={containerRef}>
        {commentsData?.length > 0 ? (
          <ul>
            {commentsData?.map(({ createdAt, author, body }, index) => (
              <li key={index}>
                <strong>{author?.login}</strong> - {getTimeAgo(createdAt)}
                <p>{body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </CommentsContainer>
    </>
  );
};

export default Comments;
