import { useSession } from "../auth-client";

export function useCurrentUser() {
  const { data: session, isPending, error } = useSession();

  return {
    user: session?.user ?? null,
    isPending,
    error,
  };
}