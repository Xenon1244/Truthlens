import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const updateUserProfile = (biasData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...biasData,
        biasProfileCompleted: true,
        profileCompletedAt: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    }
    return { success: false, error: 'No user found' };
  };

  const hasCompletedBiasProfile = () => {
    return user?.biasProfileCompleted || false;
  };

  const login = async (email, password) => {
    try {
      console.log('🔄 Mock login for:', email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=667eea&color=fff`,
        preferences: {
          categories: ['general', 'technology'],
          sources: [],
          region: 'North America',
          country: 'United States'
        },
        memberSince: new Date().toISOString(),
        biasProfileCompleted: false,
        biasScore: 0,
        biasLabel: 'Not Set',
        biasDescription: 'Complete bias profile to get personalized news'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (email, password) => {
    try {
      console.log('🔄 Mock registration for:', email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }
      
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }
      
      if (!email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (existingUsers.find(u => u.email === email)) {
        return { success: false, error: 'User with this email already exists' };
      }
      
      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=667eea&color=fff`,
        preferences: {
          categories: ['general', 'technology', 'politics'],
          sources: [],
          region: 'North America',
          country: 'United States'
        },
        memberSince: new Date().toISOString(),
        isPremium: false,
        subscription: 'free',
        biasProfileCompleted: false,
        biasScore: 0,
        biasLabel: 'Not Set',
        biasDescription: 'Complete bias profile to get personalized news'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      existingUsers.push(mockUser);
      localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updatePreferences = async (preferences) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Update failed' };
    }
  };

  const updateUserLocation = async (country, region) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          country: country,
          region: region
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Location update failed' };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        ...profileData,
        avatar: profileData.name 
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=667eea&color=fff`
          : user.avatar
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  };

  const upgradeToPremium = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        isPremium: true,
        subscription: 'premium',
        premiumSince: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Upgrade failed' };
    }
  };

  const getRecommendedCategories = () => {
    if (!user?.biasLabel) return ['general', 'technology'];
    
    const bias = user.biasLabel.toLowerCase();
    const baseCategories = ['general', 'technology'];
    
    if (bias.includes('progressive') || bias.includes('left')) {
      return [...baseCategories, 'environment', 'social-justice', 'healthcare'];
    } else if (bias.includes('conservative') || bias.includes('right')) {
      return [...baseCategories, 'economy', 'business', 'national-security'];
    } else {
      return [...baseCategories, 'politics', 'international'];
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updatePreferences,
    updateProfile,
    upgradeToPremium,
    isAuthenticated: !!user,
    updateUserProfile,
    hasCompletedBiasProfile,
    updateUserLocation,
    getRecommendedCategories
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};