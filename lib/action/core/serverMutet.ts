import { authClient } from "../../auth-client";

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

export const authHeader = async (): Promise<Record<string, string>> => {
   const sessionData = await authClient.getSession();
  const token = sessionData?.data?.session?.token;
  return token ? { authorization: `Bearer ${token}` } : {};
}

export const serverMutate = async (path:string, data:object | undefined, method = 'POST') => {
  const isDeleteOrGet = ['GET'].includes(method.toUpperCase());
const res = await fetch(`${baseUrl}${path}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    body: isDeleteOrGet? undefined : JSON.stringify(data),
  });
  const result = await res.json();
  console.log(result , 'data after post')
  return result;
}