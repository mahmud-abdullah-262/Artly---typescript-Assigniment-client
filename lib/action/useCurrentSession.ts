// সেশন ও ইউজার ডাটা নেয়ার জন্য এখান থেকে ডিস্ট্রাকচার করলেই হবে। user, session যখন যেটা দরকার।

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