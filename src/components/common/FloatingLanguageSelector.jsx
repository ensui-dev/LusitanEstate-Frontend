import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Import flag SVG files
import gbFlag from '../../assets/flags/gb.svg';
import ptFlag from '../../assets/flags/pt.svg';

const FloatingLanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Language configuration - add new languages here
  // To add a new language:
  // 1. Add the flag SVG file to src/assets/flags/ (e.g., es.svg for Spanish)
  // 2. Import it above (e.g., import esFlag from '../../assets/flags/es.svg';)
  // 3. Add the language object to this array
  const languages = [
    { code: 'en', name: 'English', flag: gbFlag },
    { code: 'pt', name: 'Português', flag: ptFlag }
    // Example: { code: 'es', name: 'Español', flag: esFlag }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={dropdownRef}>
      <div className="bg-white/95 shadow-float backdrop-blur-lg rounded-2xl border border-white/50 p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
          aria-label="Select language"
        >
          <img
            src={currentLang.flag}
            alt={currentLang.name}
            className="w-8 h-6 rounded shadow-sm object-cover"
          />
          <span className="text-sm font-medium text-gray-700">{currentLang.code.toUpperCase()}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-56 bg-white rounded-xl shadow-float-lg border border-gray-100 py-2 animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  currentLanguage === lang.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-8 h-6 rounded shadow-sm object-cover"
                />
                <span className="font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <svg className="w-5 h-5 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingLanguageSelector;
