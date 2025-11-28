import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { authAPI } from '../api/auth';

export const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    initializeLanguage();
  }, []);

  // Update language when user logs in or changes
  useEffect(() => {
    if (isAuthenticated && user && user.preferredLanguage && !isInitialized) {
      // Priority 1: Database language preference for authenticated users
      if (user.preferredLanguage !== currentLanguage) {
        changeLanguage(user.preferredLanguage, false); // Don't update DB as it's already the user's preference
      }
      setIsInitialized(true);
    } else if (!isAuthenticated && !isInitialized) {
      // For non-authenticated users, check localStorage and region detection
      const storedLanguage = localStorage.getItem('preferredLanguage');
      if (storedLanguage && ['en', 'pt'].includes(storedLanguage)) {
        // Priority 2: localStorage
        changeLanguage(storedLanguage, false);
      } else {
        // Priority 3: Region detection (already handled by i18next config)
        const detectedLanguage = i18n.language;
        setCurrentLanguage(detectedLanguage);
      }
      setIsInitialized(true);
    }
  }, [isAuthenticated, user]);

  const initializeLanguage = () => {
    // Check localStorage first for non-authenticated users
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage && ['en', 'pt'].includes(storedLanguage)) {
      i18n.changeLanguage(storedLanguage);
      setCurrentLanguage(storedLanguage);
    } else {
      // Let i18next handle region detection
      setCurrentLanguage(i18n.language);
    }
  };

  const changeLanguage = async (lang, updateDatabase = true) => {

    if (!['en', 'pt'].includes(lang)) {
      console.error('Unsupported language:', lang);
      return;
    }

    try {
      // Update i18next
      await i18n.changeLanguage(lang);

      // Force update current language state to trigger re-renders
      setCurrentLanguage(lang);

      // Always update localStorage
      localStorage.setItem('preferredLanguage', lang);

      // Update database if user is authenticated and updateDatabase is true
      if (isAuthenticated && updateDatabase && user) {
        const result = await updateUser({ preferredLanguage: lang });
        if (!result.success) {
          console.error('Failed to update language preference in database');
        }
      } else if (!isAuthenticated && updateDatabase) {
        // For non-authenticated users logging in later, we'll sync localStorage to DB
        // This is handled in the login flow
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const syncLanguageOnLogin = async (userLanguage) => {
    // When user logs in, check if localStorage differs from database
    const storedLanguage = localStorage.getItem('preferredLanguage');

    if (storedLanguage && storedLanguage !== userLanguage) {
      // Prioritize database preference, but update if localStorage is different and more recent
      // For now, we prioritize database (user's saved preference)
      changeLanguage(userLanguage, false);
    } else if (!userLanguage || userLanguage === 'en') {
      // If user has no preference or default, use localStorage if available
      if (storedLanguage && storedLanguage !== userLanguage) {
        // Update database with localStorage preference
        changeLanguage(storedLanguage, true);
      }
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    syncLanguageOnLogin,
    supportedLanguages: ['en', 'pt']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
