// hooks/useServerFetch.ts
import { useEffect, useState } from "react";
import { serverFetch } from "./serverFetch";


export const useServerFetch = <T = unknown>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await serverFetch(path);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // component unmount হলে state update আটকানোর জন্য
    };
  }, [path]);

  return { data, loading, error };
};