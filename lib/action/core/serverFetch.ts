import { authClient } from "../../auth-client";




const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'


export const authHeader = async (): Promise<Record<string, string>> => {
   const session = await authClient.getSession(); // hook না, direct call
  const token = session?.data?.session?.token;
  return token ? { authorization: `Bearer ${token}` } : {};
}

export const protectedFetch = async (path:string) => {
  
  const res = await fetch(`${baseUrl}${path}`,{
    headers: await authHeader()
  }

  );
  const data = await res.json();
  return data;
}

export  const serverFetch = async (path:string) => {
   const res = await fetch(`${baseUrl}${path}`);

  // যদি রেসপন্স ২00-299 এর মধ্যে না হয়
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server API Error:", errorData);
      return []; // সেফটি হিসেবে খালি অ্যারে রিটার্ন করুন
    }



  const data = await res.json();
  return data;
} 

