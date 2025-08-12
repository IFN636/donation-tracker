import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const isAdmin = () => {
        return user?.role === "admin";
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isAuthenticated, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
