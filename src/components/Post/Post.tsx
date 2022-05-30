import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import { editPostRequest } from "api";

import { useGetDataRequest } from "hooks";

import styles from "./Post.module.scss";
import Spinner from "common/Spinner/Spinner";

export type TPost = {
  id?: number;
  userId?: number;
  title?: string;
  body?: string;
};

type TFormValues = {
  titleValue: string | undefined;
  bodyValue: string | undefined;
};

const Post: React.FC = () => {
  const { id } = useParams();
  const queryParams = `/posts/${id}`;

  const [responsedPost] = useGetDataRequest<TPost>(queryParams);

  const initialValues: TFormValues = { titleValue: "", bodyValue: "" };

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [gettedPost, setGettedPost] = useState<TPost>();

  useEffect(() => {
    setGettedPost(responsedPost);
  }, [responsedPost]);

  const onToggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const onPutDataRequest = useCallback(
    (
      url: string,
      titleValue: string | undefined,
      bodyValue: string | undefined
    ) => {
      setLoading(true);

      try {
        editPostRequest(url, {
          id: gettedPost?.id,
          userId: gettedPost?.userId,
          title: titleValue,
          body: bodyValue,
        }).then(({ status }) => {
          setLoading(false);

          onToggleEditMode();
          alert("status response " + status + " if status === 200 its OK");
        });
      } catch (error) {
        onToggleEditMode();

        console.error(error);
      }
    },
    []
  );

  return (
    <div className={styles.postBox}>
      <h2>Post</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.post}>
          {isEditMode ? (
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  onPutDataRequest(
                    queryParams,
                    values.titleValue,
                    values.bodyValue
                  );
                }}
              >
                <Form>
                  <div>
                    <button className={styles.editButton} type="submit">
                      submit
                    </button>
                  </div>
                  <div>
                    <span className={styles.titleLine}>userId:</span>
                    <span>{gettedPost?.userId}</span>
                  </div>
                  <div>
                    <span className={styles.titleLine}>id:</span>
                    <span>{gettedPost?.id}</span>
                  </div>
                  <div>
                    <span className={styles.titleLine}>title:</span>
                    <Field
                      id="titleValue"
                      name="titleValue"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <span className={styles.titleLine}>body:</span>
                    <Field
                      id="bodyValue"
                      name="bodyValue"
                      placeholder="Enter body"
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          ) : (
            <div>
              <div>
                <button
                  className={styles.editButton}
                  onClick={onToggleEditMode}
                >
                  edit
                </button>
              </div>
              <div>
                <span className={styles.titleLine}>userId:</span>
                <span>{gettedPost?.userId}</span>
              </div>
              <div>
                <span className={styles.titleLine}>id:</span>
                <span>{gettedPost?.id}</span>
              </div>
              <div>
                <span className={styles.titleLine}>title:</span>
                <span>{gettedPost?.title}</span>
              </div>
              <div>
                <span className={styles.titleLine}>body:</span>
                <span>{gettedPost?.body}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Post;
