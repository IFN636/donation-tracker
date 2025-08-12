import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

const STORAGE_KEY = "auth:user";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            else localStorage.removeItem(STORAGE_KEY);
        } catch {}
    }, [user]);

    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const isAuthenticated = useCallback(() => user !== null, [user]);
    const isAdmin = useCallback(() => user?.role === "admin", [user]);
    const getAccessToken = useCallback(() => user?.token || null, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                isAdmin,
                getAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
