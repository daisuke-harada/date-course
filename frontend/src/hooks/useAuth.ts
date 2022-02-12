// import { client } from "../lib/api/client"
import { useCallback } from "react"
export const useAuth = () => {
  const login = useCallback(() => {
    // axios.get
  }, []);
  return { login }
}