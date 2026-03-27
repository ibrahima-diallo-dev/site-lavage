import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking session
        const checkSession = async () => {
            // Logic to check local storage or API
            setLoading(false);
        };
        checkSession();
    }, []);

    const login = async (email, password) => {
        // Mock login
        if (email === 'admin@carwash.com') {
            setUser({ id: 1, name: 'Admin', role: 'admin', email });
            return true;
        }
        setError('Invalid credentials');
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
