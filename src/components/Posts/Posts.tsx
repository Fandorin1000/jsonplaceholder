import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDeleteDataRequest, useGetDataRequest } from "hooks";

import { TPost } from "types";

import styles from "./Posts.module.scss";
import Spinner from "common/Spinner/Spinner";

const Posts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<TPost[]>();
  const [fetchedPosts, isPostsLoading] = useGetDataRequest<TPost[]>("/posts");
  const [handleDeleteData, deletedPost, isPostDeleting] =
    useDeleteDataRequest<TPost>();

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    if (deletedPost) {
      setPosts((prevPosts) =>
        prevPosts?.filter((post) => post.id !== deletedPost.id)
      );
    }
  }, [deletedPost]);

  if (isPostsLoading || isPostDeleting) {
    return <Spinner />;
  }

  return (
    <div className={styles.posts}>
      <h2>Posts</h2>
      <div className={styles.postsBox}>
        {posts?.map((p) => (
          <div className={styles.post} key={p.id}>
            <span
              className={styles.deleteBtn}
              onClick={() => handleDeleteData(`/posts/${p.id}`)}
            >
              X
            </span>
            <div>
              <button
                className={styles.titleLine}
                onClick={() => navigate(`/posts/${p.id}`)}
              >
                To post
              </button>
            </div>
            <div>
              <span className={styles.titleLine}>userId:</span>
              <span>{p.userId}</span>
            </div>

            <div>
              <span className={styles.titleLine}>id:</span>
              <span>{p.id}</span>
            </div>
            <div>
              <span className={styles.titleLine}>title:</span>
              <span>{p.title}</span>
            </div>
            <div>
              <span className={styles.titleLine}>body:</span>
              <span>{p.body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Posts;
