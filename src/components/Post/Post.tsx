import { useParams } from "react-router-dom";

import { TPost } from "types";
import { useGetDataRequest } from "hooks";

import styles from "./Post.module.scss";
import Spinner from "common/Spinner/Spinner";

const Post: React.FC = () => {
  const { id } = useParams();

  const queryParams = `/posts/${id}`;

  const [post, loading] = useGetDataRequest<TPost>(queryParams);

  return (
    <div className={styles.postBox}>
      <h2>Post</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.post}>
          <div>
            <span className={styles.titleLine}>userId:</span>
            <span>{post?.userId}</span>
          </div>
          <div>
            <span className={styles.titleLine}>id:</span>
            <span>{post?.id}</span>
          </div>
          <div>
            <span className={styles.titleLine}>title:</span>
            <span>{post?.title}</span>
          </div>
          <div>
            <span className={styles.titleLine}>body:</span>
            <span>{post?.body}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
