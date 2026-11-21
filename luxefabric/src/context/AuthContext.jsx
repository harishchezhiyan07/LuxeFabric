import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('luxefabric_user');
      if (saved) return JSON.parse(saved);
      // Backwards compatibility with user's earlier plain 'username' key
      const legacyUsername = localStorage.getItem('username');
      if (legacyUsername) {
        return {
          name: legacyUsername,
          email: `${legacyUsername.toLowerCase().replace(/\s+/g, '')}@example.com`,
          phone: '+1 (555) 019-2834',
          address: '742 Evergreen Terrace, Suite 4B'
        };
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);

  // Sync user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('luxefabric_user', JSON.stringify(user));
      localStorage.setItem('username', user.name);
    } else {
      localStorage.removeItem('luxefabric_user');
      localStorage.removeItem('username');
    }
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (nameOrEmail, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!nameOrEmail || !password) {
          reject(new Error('Please enter all required fields'));
          return;
        }

        let displayName = nameOrEmail;
        if (nameOrEmail.includes('@')) {
          displayName = nameOrEmail.split('@')[0];
          displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }

        const authenticatedUser = {
          name: displayName,
          email: nameOrEmail.includes('@') ? nameOrEmail : `${displayName.toLowerCase()}@client.luxefabric.com`,
          phone: '+1 (555) 234-8971',
          address: '450 Lexington Ave, New York, NY 10017',
          joinedDate: new Date().toISOString()
        };

        setUser(authenticatedUser);
        setIsAuthModalOpen(false);
        resolve(authenticatedUser);
      }, 700);
    });
  };

  const signup = (formData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!formData.name || !formData.email || !formData.password) {
          reject(new Error('Please complete name, email and password'));
          return;
        }

        const newUser = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '+1 (555) 890-1234',
          address: formData.address || '742 Park Avenue, NY',
          joinedDate: new Date().toISOString()
        };

        setUser(newUser);
        setIsAuthModalOpen(false);
        resolve(newUser);
      }, 700);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        loading,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth } from '../hooks/useAuth';
