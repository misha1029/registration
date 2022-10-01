import { useContext } from "react";
import { AuthContext } from "../providers/auth-providers/AuthProviders";

export const useAuth = () => useContext(AuthContext)