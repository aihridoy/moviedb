import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => {
    const { auth, setAuth, loading } = useContext(AuthContext);

    return { auth, setAuth, loading };
}