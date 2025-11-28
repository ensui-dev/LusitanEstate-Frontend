# Language Flags

This folder contains SVG flag files for the language selector component.

## Current Flags

- `gb.svg` - English (Great Britain)
- `pt.svg` - Portuguese (Portugal)

## Adding a New Language Flag

### Step 1: Add the SVG file
Place your flag SVG file in this folder with the language code as the filename.

**Naming convention:** Use the ISO 639-1 two-letter language code (lowercase).

Examples:
- Spanish: `es.svg`
- French: `fr.svg`
- German: `de.svg`
- Italian: `it.svg`

### Step 2: Update FloatingLanguageSelector component

Edit `frontend/src/components/common/FloatingLanguageSelector.jsx`:

1. **Import the flag:**
   ```javascript
   import esFlag from '../../assets/flags/es.svg';
   ```

2. **Add to languages array:**
   ```javascript
   const languages = [
     { code: 'en', name: 'English', flag: gbFlag },
     { code: 'pt', name: 'Português', flag: ptFlag },
     { code: 'es', name: 'Español', flag: esFlag }  // Add this line
   ];
   ```

### Step 3: Add translation files

Create translation files for the new language:

1. **Create translation file:**
   - `frontend/src/i18n/locales/es.json` (copy from `en.json` or `pt.json` and translate)

2. **Update i18n config** (`frontend/src/i18n/config.js`):
   ```javascript
   import es from './locales/es.json';

   // Add to resources
   resources: {
     en: { translation: en },
     pt: { translation: pt },
     es: { translation: es }  // Add this line
   }

   // Add to supported languages
   supportedLngs: ['en', 'pt', 'es']  // Add 'es'
   ```

3. **Update LanguageContext** (`frontend/src/context/LanguageContext.jsx`):
   ```javascript
   const value = {
     currentLanguage,
     changeLanguage,
     syncLanguageOnLogin,
     supportedLanguages: ['en', 'pt', 'es']  // Add 'es'
   };
   ```

4. **Update validation in changeLanguage function:**
   ```javascript
   const changeLanguage = async (lang, updateDatabase = true) => {
     if (!['en', 'pt', 'es'].includes(lang)) {  // Add 'es'
       console.error('Unsupported language:', lang);
       return;
     }
     // ...
   };
   ```

### Step 4: Update backend (optional)

If you want to store the language preference in the database:

Edit `backend/src/models/User.js`:
```javascript
preferredLanguage: {
  type: String,
  enum: ['en', 'pt', 'es'],  // Add 'es'
  default: 'en'
}
```

## SVG File Requirements

- **Format:** SVG (Scalable Vector Graphics)
- **Recommended size:** Any size (will be scaled to 32x24px)
- **Aspect ratio:** Recommended 4:3 or 3:2 (typical flag proportions)
- **File size:** Keep under 50KB for performance

## Where to Get Flag SVGs

High-quality flag SVGs can be found at:
- [Flagpedia](https://flagpedia.net/)
- [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_flags)
- [Flag Icons](https://github.com/lipis/flag-icons)
- [Flaticon](https://www.flaticon.com/)

## Example: Adding Spanish Language

1. Download `es.svg` and place it in this folder
2. Edit `FloatingLanguageSelector.jsx`:
   ```javascript
   import esFlag from '../../assets/flags/es.svg';

   const languages = [
     { code: 'en', name: 'English', flag: gbFlag },
     { code: 'pt', name: 'Português', flag: ptFlag },
     { code: 'es', name: 'Español', flag: esFlag }
   ];
   ```
3. Create `frontend/src/i18n/locales/es.json` with Spanish translations
4. Update i18n config to include Spanish
5. Done! The Spanish flag will appear in the language selector

## Testing

After adding a new language:

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Click the language selector (top-right corner)
4. Verify the new flag appears in the dropdown
5. Select the new language and verify all text translates correctly

## Notes

- Flag files are automatically bundled by Vite during build
- SVG files are optimized for web use
- Flags are displayed at 32x24px (w-8 h-6 in Tailwind)
- Flags have rounded corners and shadow for visual consistency
