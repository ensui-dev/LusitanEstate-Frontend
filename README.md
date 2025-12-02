# LusitanEstate - Portuguese Real Estate CMS Frontend

A modern, fully bilingual React application for browsing and managing real estate listings in Portugal. Features comprehensive internationalization (English/Portuguese), role-based dashboards, Portuguese market specifics (districts, energy certificates, IMT calculator), and seamless integration with the backend API.

## 🌍 Internationalization (i18n)

**Complete Bilingual Support:**
- **Languages:** English and Portuguese (Portugal)
- **Automatic Language Detection:** Based on browser region/locale
- **User Preference Storage:** Saved in database for authenticated users, localStorage for guests
- **Real-time Language Switching:** Floating language selector on all pages
- **200+ Translation Keys:** Every user-facing string localized
- **Localized Formats:**
  - Dates: DD/MM/YYYY (PT) vs MM/DD/YYYY (EN)
  - Currency: Portuguese Euro formatting (€)
  - Numbers: Portuguese thousands separator

**Translation Coverage:**
- All public pages (Home, Properties, Agencies, Agents)
- Authentication flows (Login, Register, Email Verification)
- User dashboards (Buyer, Seller, Agent roles)
- Complete Admin Panel (Dashboard, Users, Properties, Inquiries)
- Property creation and editing forms
- All error messages and notifications
- Loading states and placeholders

## 🚀 Features

### Core Features
- **Modern React 18** with Hooks and Context API
- **Fully Responsive Design** - Mobile-first approach with Tailwind CSS
- **Complete i18n System** - English and Portuguese with auto-detection
- **Role-Based Access Control** - Different views for Buyers, Sellers, Agents, and Admins
- **Portuguese Market Integration** - 20 districts, energy certificates, IMT calculator
- **Advanced Property Search** - Filter by district, type, price, bedrooms
- **JWT Authentication** - Secure login with email verification
- **Real-time Data** - React Query for caching and automatic updates
- **Form Validation** - React Hook Form with comprehensive validation
- **Toast Notifications** - User-friendly multilingual feedback
- **Image Upload System** - AWS S3 (via Backend) - Multiple images per property
- **Floating Language Selector** - Quick language switching on all pages

### Admin Panel Features
- **Comprehensive Dashboard** - Overview statistics, charts, and recent activity
- **User Management** - View, edit roles, search/filter users
- **Property Approval Workflow** - Approve/reject with reasons, bulk operations
- **Inquiry Management** - View, respond, close customer inquiries
- **Statistics & Analytics** - User distribution, property status, performance metrics
- **Full Localization** - All admin interfaces in both languages

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Backend API** running - See backend README

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ensui-dev/LusitanEstate-Frontend
cd LusitanEstate/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **react** (18.2.0) - UI library
- **react-router-dom** (6.20.0) - Client-side routing
- **react-i18next** - Internationalization framework
- **i18next** - Translation engine
- **i18next-browser-languagedetector** - Automatic language detection
- **@tanstack/react-query** (5.8.4) - Data fetching and caching
- **axios** (1.6.2) - HTTP client
- **tailwindcss** (3.3.5) - CSS framework
- **react-hook-form** (7.48.2) - Form handling
- **react-toastify** (9.1.3) - Toast notifications
- **react-icons** (4.12.0) - Icon library
- **vite** (5.0.0) - Build tool and dev server

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Backend API URL
# Development (local backend)
VITE_API_URL=http://localhost:5000/api

# Production (deployed backend)
# VITE_API_URL=https://your-backend-api.fly.dev/api
```

**IMPORTANT:**
- The variable MUST start with `VITE_` (Vite requirement)
- Update the URL to match your backend API location
- For production, use your deployed backend URL

### Step 4: Ensure Backend is Running

The frontend needs the backend API to function. Make sure your backend is running:

**If running backend locally:**
```bash
# In your backend directory
npm run dev
# Backend should be running at http://localhost:5000
```

### Step 5: Start Development Server

```bash
npm run dev
```

The application will open at: `http://localhost:3000`

You should see the homepage with:
- Hero section
- Property search
- Language selector (bottom-right)
- Features showcase

## 🎯 Running the Application

### Development Mode (with Hot Reload)

```bash
npm run dev
```

- Server runs on `http://localhost:3000`
- Automatically reloads when you save changes
- Shows helpful error messages

### Build for Production

```bash
npm run build
```

- Creates optimized production build in `dist/` folder
- Minifies code and optimizes assets
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

- Preview the production build locally
- Runs on `http://localhost:4173`

### Lint Code

```bash
npm run lint
```

## 📱 Application Features

### Public Pages (No Login Required)

#### 1. Home Page (`/`)
- Hero section with bilingual content
- Property search with filters
- Feature highlights
- Call-to-action buttons
- Quick links to properties, agencies, agents
- Automatic language detection on first visit

#### 2. Properties Page (`/properties`)
- Browse all approved properties
- **Filters:**
  - District (20 Portuguese districts)
  - Property Type (Apartment, House, Villa, etc.)
  - Price Range (Min/Max)
  - Number of Bedrooms
- Property cards with:
  - Primary image
  - Price in EUR (€)
  - Location (City, District)
  - Bedrooms, Bathrooms, Square Meters
  - Energy Certificate rating
  - Status badge (For Sale, For Rent, etc.)
- All text localized in current language

#### 3. Property Detail Page (`/properties/:id`)
- Full property information
- Image gallery
- IMT Calculator (Portuguese property transfer tax)
- Energy certificate details
- Contact owner/agent form
- Similar properties
- Fully bilingual interface

#### 4. Agencies Page (`/agencies`)
- List of all real estate agencies
- Filter by district and verified status
- Agency cards with contact info
- Localized agency descriptions

#### 5. Agents Page (`/agents`)
- List of all verified agents
- Agent profiles with ratings
- Specializations and languages
- Filter and search capabilities

#### 6. Login Page (`/login`)
- Email and password authentication
- "Remember me" option
- Email verification reminder
- Link to registration page
- Password reset functionality
- Fully localized forms and messages

#### 7. Register Page (`/register`)
- Create new account
- Choose role:
  - **Buyer** - Browse and save properties
  - **Seller** - List properties
  - **Agent** - Professional account
- Form validation with localized error messages
- Email verification flow
- Terms of service agreement

#### 8. Email Verification (`/verify-email/:token`)
- Automatic email verification
- Success/failure messages
- Redirect to login
- Resend verification option

### Protected Pages (Login Required)

#### 1. Dashboard (`/dashboard`)

**For Buyers:**
- Saved favorite properties
- Recent property views
- Saved searches
- Inquiries sent and responses
- Reviews written
- Account settings with language preference

**For Sellers:**
- My properties list with status
- Create new property listing
- View inquiries received
- Property statistics (views, favorites)
- Approval status tracking
- Edit/delete properties

**For Agents:**
- All seller features plus:
- Agency information
- Performance metrics
- Client inquiries management
- Professional profile

#### 2. Add Property (`/add-property`)
- Multi-step form (5 steps):
  1. Basic Information (Title, Description, Price, Type, Status, Condition)
  2. Location (Address, District, City, Postal Code)
  3. Details (Bedrooms, Bathrooms, Area, Year Built, Parking, Energy Rating)
  4. Features (Select from 15+ property features)
  5. Images (Upload multiple images)
- Form validation with localized error messages
- Auto-save draft functionality
- Portuguese-specific fields (Districts, Energy Certificates)
- All labels and placeholders localized

### Admin Pages (Admin Role Only)

#### Admin Dashboard (`/admin`)
- **Overview Statistics:**
  - Total users by role (Buyers, Sellers, Agents, Admins)
  - Total properties by status
  - Pending approvals count
  - Monthly new users and properties
  - Average agency and agent ratings

- **Charts & Analytics:**
  - User distribution by role (pie chart)
  - Properties by status (bar chart)
  - Top districts by property count
  - Average price by district

- **Quick Actions:**
  - Pending property approvals
  - Pending inquiries
  - Recent users
  - Recent properties

#### Admin Users (`/admin/users`)
- View all system users
- **Features:**
  - User count statistics by role
  - Search by name or email
  - Filter by role
  - Pagination
- **Actions:**
  - Edit user role
  - Delete users
  - View user details
- Fully localized table, filters, and modals

#### Admin Properties (`/admin/properties`)
- View all properties (approved, pending, rejected)
- **Features:**
  - Filter by approval status, property status, type
  - Bulk approve multiple properties
  - Property count with {{count}} interpolation
  - Pagination
- **Actions:**
  - Approve property
  - Reject property with reason
  - Delete property
  - View property details
- Rejection modal with reason input
- All status badges localized

#### Admin Inquiries (`/admin/inquiries`)
- Manage all customer inquiries
- **Features:**
  - Inquiry statistics (Pending, Responded, Closed)
  - Search by name or email
  - Filter by status and type
  - Pagination
- **Inquiry Types:**
  - Viewing Request
  - Information Request
  - Offer
  - General Inquiry
- **Actions:**
  - View inquiry details
  - Respond to inquiry
  - Close inquiry
  - Delete inquiry
- Response modal with template
- All inquiry data localized including dates

## 🌐 Language System Architecture

### Translation Files
Located in `src/i18n/locales/`:
- **en.json** - English translations (200+ keys)
- **pt.json** - Portuguese translations (200+ keys)

### Key Structure
```json
{
  "common": {
    "loading": "Loading...",
    "notAvailable": "N/A"
  },
  "nav": {
    "home": "Home",
    "properties": "Properties",
    "admin": "Admin"
  },
  "property": {
    "status": {
      "forSale": "For Sale",
      "forRent": "For Rent"
    },
    "condition": {
      "new": "New",
      "excellent": "Excellent"
    }
  },
  "admin": {
    "dashboard": { ... },
    "users": { ... },
    "properties": { ... },
    "inquiries": { ... }
  }
}
```

### Language Detection Priority
1. **Authenticated Users:** Database `preferredLanguage` field
2. **Guest Users:** localStorage `preferredLanguage`
3. **First Visit:** Browser locale detection (pt-PT, pt-BR → pt)
4. **Fallback:** English (en)

### Context API
- **LanguageContext** - Provides language state and change function
- **AuthContext** - Syncs language preference with user profile
- Automatic sync on login/logout

### Components with i18n
All components use the `useTranslation` hook:
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description', { count: 5 })}</p>
      {/* Date with locale */}
      {new Date().toLocaleDateString(
        i18n.language === 'pt' ? 'pt-PT' : 'en-US'
      )}
    </div>
  );
};
```

## 🇵🇹 Portuguese Market Features

### 20 Portuguese Districts

Properties are organized by district:

**Mainland:**
- Aveiro, Beja, Braga, Bragança, Castelo Branco
- Coimbra, Évora, Faro, Guarda, Leiria
- Lisboa, Portalegre, Porto, Santarém, Setúbal
- Viana do Castelo, Vila Real, Viseu

**Islands:**
- Açores, Madeira

Each district includes major cities for detailed filtering.

### Energy Certificates

All properties display energy efficiency ratings:

- **A+** - Most efficient (Green)
- **A** - Excellent (Green)
- **B, B-** - Good (Yellow-Green)
- **C, D** - Average (Yellow-Orange)
- **E, F** - Poor (Red)
- **Exempt** - Older buildings or special cases
- **Pending** - Certificate in process

Displayed with color-coded badges for easy identification.

### IMT Calculator

**IMT (Imposto Municipal sobre Transmissões)** - Portuguese Property Transfer Tax

The calculator automatically shows estimated tax on property detail pages:

- **Residential Properties:** Progressive rates 0-8%
- **Commercial Properties:** Flat 6.5%
- **Islands (Açores/Madeira):** 20% reduction
- Displays both amount and effective rate

Example:
```
Property: €300,000 (Residential, Lisboa)
IMT: €16,025 (5.34%)
```

### Property Types

All property types use both Portuguese and English terminology:
- Apartamento (Apartment)
- Moradia (House)
- Vivenda (Villa)
- Casa Geminada (Townhouse)
- Terreno (Land)
- Comercial (Commercial)

### Currency & Formatting

- **Currency:** Euro (€) in Portuguese format (€300.000)
- **Dates:**
  - Portuguese: DD/MM/YYYY (01/12/2024)
  - English: MM/DD/YYYY (12/01/2024)
- **Square Meters:** Primary measurement
- **ZIP Codes:** Portuguese format (XXXX-XXX)

## 🎨 User Interface

### Design System

**Colors:**
- Primary: Blue tones (#0ea5e9, #0284c7)
- Sand: Warm neutrals for real estate feel
- Success: Green
- Warning: Yellow
- Danger: Red
- Neutral: Grays

**Typography:**
- Font: System font stack (optimized for Portuguese characters: ç, ã, õ, etc.)
- Headings: Bold, clear hierarchy
- Body: 16px base size for readability

**Components:**
- **Buttons:** Primary, Secondary, Danger variants
- **Cards:** Elevated with hover effects
- **Badges:** Color-coded by status (localized)
- **Forms:** Clear labels, validation feedback
- **Loading:** Spinner with localized text
- **Language Selector:** Floating bottom-right with flag icons

### Responsive Design

**Mobile (< 768px):**
- Hamburger menu
- Single column layouts
- Touch-friendly buttons (44px minimum)
- Optimized image sizes
- Bottom sheet modals
- Language selector positioned for thumb access

**Tablet (768px - 1024px):**
- 2-column grids
- Collapsible navigation
- Balanced layouts
- Side-by-side forms

**Desktop (> 1024px):**
- 3-column grids
- Full navigation bar
- Sidebar filters
- Hover effects
- Larger language selector dropdown

## 📂 Project Structure

```
frontend/
├── src/
│   ├── api/                      # API Service Layer
│   │   ├── axios.js              # Axios configuration with auth interceptor
│   │   ├── auth.js               # Authentication APIs
│   │   ├── properties.js         # Property APIs
│   │   ├── agents.js             # Agent APIs
│   │   ├── agencies.js           # Agency APIs
│   │   ├── admin.js              # Admin APIs (all 4 panels)
│   │   ├── inquiries.js          # Inquiry APIs
│   │   ├── reviews.js            # Review APIs
│   │   └── favorites.js          # Favorites APIs
│   │
│   ├── components/               # React Components
│   │   ├── common/               # Shared Components
│   │   │   ├── Navbar.jsx        # Navigation bar (localized)
│   │   │   ├── Footer.jsx        # Footer with links (localized)
│   │   │   ├── Loading.jsx       # Loading spinner (localized)
│   │   │   ├── FloatingLanguageSelector.jsx  # Language switcher
│   │   │   └── ImageUpload.jsx   # Image upload component
│   │   ├── property/             # Property Components
│   │   │   ├── PropertyCard.jsx  # Property display card
│   │   │   └── PropertyList.jsx  # Property grid
│   │   ├── agent/                # Agent Components
│   │   ├── agency/               # Agency Components
│   │   └── admin/                # Admin Components
│   │
│   ├── context/                  # React Context
│   │   ├── AuthContext.jsx       # Authentication state + user
│   │   └── LanguageContext.jsx   # i18n state + change function
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useProperties.js      # Property data hooks
│   │   └── useAdmin.js           # Admin operations hooks
│   │
│   ├── i18n/                     # Internationalization
│   │   ├── config.js             # i18next configuration
│   │   └── locales/              # Translation files
│   │       ├── en.json           # English (200+ keys)
│   │       └── pt.json           # Portuguese (200+ keys)
│   │
│   ├── pages/                    # Page Components (all localized)
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── VerifyEmail.jsx       # Email verification
│   │   ├── Properties.jsx        # Property listings
│   │   ├── PropertyDetail.jsx    # Single property view
│   │   ├── AddProperty.jsx       # Multi-step property creation
│   │   ├── Dashboard.jsx         # User dashboard
│   │   ├── Agents.jsx            # Agent listings
│   │   ├── Agencies.jsx          # Agency listings
│   │   ├── admin/                # Admin Pages
│   │   │   ├── AdminDashboard.jsx    # Admin overview
│   │   │   ├── AdminUsers.jsx        # User management
│   │   │   ├── AdminProperties.jsx   # Property approval
│   │   │   └── AdminInquiries.jsx    # Inquiry management
│   │   └── NotFound.jsx          # 404 page
│   │
│   ├── routes/                   # Route Protection
│   │   ├── PrivateRoute.jsx      # Authenticated users only
│   │   └── AdminRoute.jsx        # Admin role only
│   │
│   ├── utils/                    # Utility Functions
│   │   ├── constants.js          # App constants
│   │   ├── districts.js          # Portuguese districts data
│   │   ├── imtCalculator.js      # IMT tax calculator
│   │   └── helpers.js            # Helper functions
│   │
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point (i18n init)
│   └── index.css                 # Global styles (Tailwind)
│
├── public/                       # Static Assets
│   └── flags/                    # Flag icons for language selector
├── index.html                    # HTML template
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── README.md                     # This file
```

## 🔐 Authentication Flow

1. **Registration:**
   - User fills registration form (localized)
   - Frontend sends POST to `/api/auth/register`
   - Backend creates user and sends verification email
   - User verifies email via link
   - Can login after verification

2. **Login:**
   - User enters email/password
   - Frontend sends POST to `/api/auth/login`
   - Backend validates and returns JWT token + user data
   - Token stored in localStorage
   - User language preference loaded
   - User redirected to dashboard

3. **Language Sync:**
   - On login: Database `preferredLanguage` synced to app
   - On language change: Updated in database and localStorage
   - On logout: localStorage language persists for next visit

4. **Authenticated Requests:**
   - Axios interceptor adds token to all requests
   - Header: `Authorization: Bearer <token>`
   - Backend validates token
   - Returns requested data

5. **Protected Routes:**
   - PrivateRoute checks if user is authenticated
   - Redirects to /login if not authenticated
   - AdminRoute also checks if user has admin role
   - Redirects to /dashboard if not admin

6. **Logout:**
   - Clear token from localStorage
   - Reset auth context
   - Keep language preference in localStorage
   - Redirect to home page

## 🚀 Deployment to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your frontend repository

3. **Configure build settings:**
   - **Branch to deploy:** `main`
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Node version:** 18

4. **Add environment variables:**
   - Go to Site settings → Environment variables
   - Add variable:
     - **Key:** `VITE_API_URL`
     - **Value:** `https://your-backend-api.fly.dev/api`

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at: `https://random-name.netlify.app`

6. **Custom domain (optional):**
   - Go to Domain settings
   - Add custom domain
   - Follow DNS configuration instructions

### Automatic Language Detection
After deployment, the app will:
- Detect user's browser language (pt, en)
- Auto-select appropriate language
- Remember choice in localStorage
- Sync with database for logged-in users

## 🧪 Testing the Application

### Test Language Switching
1. Open the application
2. Look for floating language selector (bottom-right)
3. Click to open dropdown
4. Select Portuguese (Português - Portugal) or English
5. Verify all text changes instantly
6. Refresh page - language persists
7. Login - language syncs to user profile

### Test User Registration
1. Go to `/register`
2. Fill in form (in current language)
3. Create account
4. Check email for verification link
5. Click verification link
6. Login with new account
7. Check dashboard shows in selected language

### Test Property Browsing
1. Go to `/properties`
2. Properties load with localized labels
3. Try filters in current language
4. Click property card
5. Property details show in current language
6. Switch language - all text updates
7. IMT calculator shows formatted currency

### Test Admin Panel (requires admin account)
1. Login as admin user
2. Go to `/admin`
3. Dashboard shows localized statistics
4. Navigate to Users, Properties, Inquiries
5. All tables, filters, buttons localized
6. Test modals (reject property, edit user role)
7. All form labels and errors localized
8. Switch language - admin panel updates

## 🐛 Troubleshooting

### Language not switching

**Problem:** Language selector doesn't update text

**Solutions:**
1. Check browser console for i18n errors
2. Verify translation files exist: `src/i18n/locales/en.json` and `pt.json`
3. Clear browser cache: Ctrl+Shift+R
4. Check localStorage: `localStorage.getItem('preferredLanguage')`
5. Restart dev server

### Missing translation keys

**Problem:** Some text shows as `key.name.here` instead of translated text

**Solutions:**
1. Check if key exists in both en.json and pt.json
2. Verify key path is correct (e.g., `admin.users.title`)
3. Check browser console for missing key warnings
4. Add missing key to translation files

### Backend connection issues

**Problem:** Frontend can't reach backend API

**Solutions:**
1. Check backend is running: `curl http://localhost:5000`
2. Verify `VITE_API_URL` in `.env` is correct
3. Check backend CORS allows your frontend origin
4. Look at browser Network tab for errors

## 🔧 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API base URL | `http://localhost:5000/api` |

**Note:** Variables MUST start with `VITE_` to be accessible in the app.

## 📊 Performance Optimization

The app includes several optimizations:

- **React Query Caching** - Reduces API calls
- **Lazy Loading** - Code splitting for faster initial load
- **i18n Lazy Loading** - Load only needed language
- **Image Optimization** - Responsive images via Cloudinary
- **Minification** - Compressed JavaScript and CSS
- **Tree Shaking** - Removes unused code
- **CDN Hosting** - Netlify serves from global CDN

## 🎯 Browser Support

- **Chrome** - Latest 2 versions ✅
- **Firefox** - Latest 2 versions ✅
- **Safari** - Latest 2 versions ✅
- **Edge** - Latest 2 versions ✅
- **Mobile Safari** - iOS 12+ ✅
- **Chrome Mobile** - Latest ✅

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Update translation files if adding new text
5. Commit with clear message:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

### Code Style

- Use functional components with hooks
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind for styling (avoid custom CSS)
- **Always use translation keys** - Never hardcode user-facing text
- Add translations to both `en.json` and `pt.json`

### Adding New Translations

1. Add key to `src/i18n/locales/en.json`:
   ```json
   {
     "myFeature": {
       "title": "My Feature Title"
     }
   }
   ```

2. Add matching key to `src/i18n/locales/pt.json`:
   ```json
   {
     "myFeature": {
       "title": "Título da Minha Funcionalidade"
     }
   }
   ```

3. Use in component:
   ```jsx
   const { t } = useTranslation();
   <h1>{t('myFeature.title')}</h1>
   ```

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, questions, or contributions:
- **GitHub Issues:** Create an issue in the repository

## 🙏 Acknowledgments

- **React Team** - Amazing framework
- **Vite** - Blazing fast build tool
- **Tailwind CSS** - Beautiful utility-first CSS
- **TanStack Query** - Powerful data synchronization
- **i18next** - Internationalization framework
- **Netlify** - Easy deployment and hosting
- **Cloudinary** - Image hosting and optimization

---

**Built for the Portuguese real estate market with ❤️**

**Construído para o mercado imobiliário português com ❤️**

Need the backend? Check the backend folder in this repository.
