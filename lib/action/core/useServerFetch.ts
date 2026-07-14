// hooks/useServerFetch.ts
import { useEffect, useState } from "react";
import { serverFetch } from "./serverFetch";


export const useServerFetch = <T = unknown>(path: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(() => path !== null); 
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!path) {
      return; 
    }

    let isMounted = true;

    const fetchData = async () => {
   
      if (isMounted) setLoading(true); 
      
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
      isMounted = false;
    };
  }, [path]);

  return { data, loading, error };
};