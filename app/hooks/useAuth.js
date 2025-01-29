import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);

    return { auth, setAuth };
}