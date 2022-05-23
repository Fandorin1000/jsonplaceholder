import { apiInstance } from "api";
import { useCallback, useState } from "react";

export const useDeleteDataRequest = <T>(): [
  (url: string) => void,
  T | undefined,
  boolean
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  const handleDeleteData = useCallback((url: string) => {
    setLoading(true);

    try {
      apiInstance.get<T>(url).then(({ data }) => {
        setData(data);
        setLoading(false);
        console.log(url);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [handleDeleteData, data, loading];
};
