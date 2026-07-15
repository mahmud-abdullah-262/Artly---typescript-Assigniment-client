// hooks/useServerFetch.ts
import { useEffect, useState } from "react";
import { serverMutate } from "./serverMutet";



export const useServerMutate = <T = unknown>(path: string | null, body: object, method: string ) => {
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
        const result = await serverMutate(path, body, method);
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
  }, [path, body, method]);

  return { data, loading, error };
};