
import { useCurrentSession } from "./useCurrentSession"








export const getUserToken = async () => {
  const user = useCurrentSession
  return user?.token
}