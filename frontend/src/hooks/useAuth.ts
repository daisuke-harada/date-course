// import axios from "axios";
import { useCallback } from "react"
export const useAuth = () => {
  const login = useCallback(() => {
    // axios.get
  }, []);
  return { login }
}