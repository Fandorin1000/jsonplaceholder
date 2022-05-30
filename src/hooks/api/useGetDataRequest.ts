import { apiInstance } from "api";
import { useEffect, useState } from "react";

export const useGetDataRequest = <T>(url: string): [T | undefined, boolean] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await apiInstance.get<T>(url);
        setData(response);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  return [data, loading];
};
