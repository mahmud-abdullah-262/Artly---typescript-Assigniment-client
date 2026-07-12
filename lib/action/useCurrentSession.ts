// auth/useCurrentSession.ts
import { useSession } from "../auth-client";

export function useCurrentSession() {
  const { data, isPending, error } = useSession();

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
    isPending,
    error,
  };
}