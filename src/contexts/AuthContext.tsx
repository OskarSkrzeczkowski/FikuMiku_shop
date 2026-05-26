import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {

        const savedUser = localStorage.getItem('fiku_miku_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData: User, token: string) => {
        localStorage.setItem('fiku_miku_token', token);
        localStorage.setItem('fiku_miku_user', JSON.stringify(userData));
        setUser(userData); 
    };

    const logout = () => {
        localStorage.removeItem('fiku_miku_token');
        localStorage.removeItem('fiku_miku_user');
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};