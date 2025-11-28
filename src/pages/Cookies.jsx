import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCookieBite, FaArrowLeft, FaCog, FaChartBar, FaBullhorn, FaCheck } from 'react-icons/fa';

const Cookies = () => {
  const { t } = useTranslation();
  const lastUpdated = t('cookies.header.date');

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 hover:translate-x-[-4px] transition-all duration-200 mb-6 group"
        >
          <FaArrowLeft className="mr-2 group-hover:animate-pulse" />
          {t('cookies.backLink')}
        </Link>

        {/* Header Card */}
        <div className="card shadow-float rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary-100 text-primary-700 p-3 rounded-full">
              <FaCookieBite className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">{t('cookies.header.title')}</h1>
              <p className="text-gray-500">{t('cookies.header.lastUpdated')}: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-6">
              {t('cookies.header.intro')}
            </p>
          </div>

          {/* Cookie Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <FaCheck className="text-green-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('cookies.categories.essential.name')}</p>
              <p className="text-xs text-gray-500">{t('cookies.categories.essential.status')}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <FaCog className="text-blue-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('cookies.categories.functional.name')}</p>
              <p className="text-xs text-gray-500">{t('cookies.categories.functional.status')}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <FaChartBar className="text-purple-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('cookies.categories.analytics.name')}</p>
              <p className="text-xs text-gray-500">{t('cookies.categories.analytics.status')}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <FaBullhorn className="text-orange-600 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('cookies.categories.marketing.name')}</p>
              <p className="text-xs text-gray-500">{t('cookies.categories.marketing.status')}</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section1.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section1.intro')}
              </p>
              <p className="mb-4">
                {t('cookies.section1.types')}
              </p>
              <ul className="list-none space-y-3">
                <li className="bg-sand-50 rounded-xl p-4">{t('cookies.section1.session')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('cookies.section1.persistent')}</li>
              </ul>
              <p className="mt-4">
                {t('cookies.section1.classification')}
              </p>
              <ul className="list-none space-y-3 mt-3">
                <li className="bg-sand-50 rounded-xl p-4">{t('cookies.section1.firstParty')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('cookies.section1.thirdParty')}</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section2.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section2.intro')}
              </p>
              <p className="mb-4">
                {t('cookies.section2.legislation')}
              </p>
              <ul className="list-none space-y-3">
                <li className="bg-sand-50 rounded-xl p-4">
                  {t('cookies.section2.essential')}
                </li>
                <li className="bg-sand-50 rounded-xl p-4">
                  {t('cookies.section2.nonEssential')}
                </li>
              </ul>
              <p className="mt-4">
                {t('cookies.section2.consent')}
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded-r-xl">
                <p className="text-sm text-yellow-800">
                  {t('cookies.section2.note')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section3.title')}</h2>
            <div className="prose max-w-none text-gray-700">

              {/* Essential Cookies */}
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">{t('cookies.section3.essential.badge')}</span>
                {t('cookies.section3.essential.title')}
              </h3>
              <p className="mb-4">
                {t('cookies.section3.essential.description')}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-sand-50">
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.cookie')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.purpose')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.duration')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.type')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">auth_token</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.authToken')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.duration1')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                    <tr className="bg-sand-50">
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">session_id</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.sessionId')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.duration2')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">cookie_consent</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.cookieConsent')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.duration3')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                    <tr className="bg-sand-50">
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">csrf_token</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.csrfToken')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.essential.duration4')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Functional Cookies */}
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">{t('cookies.section3.functional.badge')}</span>
                {t('cookies.section3.functional.title')}
              </h3>
              <p className="mb-4">
                {t('cookies.section3.functional.description')}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-sand-50">
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.cookie')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.purpose')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.duration')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.type')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">user_preferences</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.userPreferences')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.duration1')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                    <tr className="bg-sand-50">
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">recent_searches</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.recentSearches')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.duration2')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">saved_properties</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.savedProperties')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.functional.duration3')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.own')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Analytics Cookies */}
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs mr-2">{t('cookies.section3.analytics.badge')}</span>
                {t('cookies.section3.analytics.title')}
              </h3>
              <p className="mb-4">
                {t('cookies.section3.analytics.description')}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-sand-50">
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.cookie')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.purpose')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.duration')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.type')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">_ga</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.ga')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.duration1')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.thirdParty')}</td>
                    </tr>
                    <tr className="bg-sand-50">
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">_ga_*</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.gaSession')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.duration2')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.thirdParty')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">_gid</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.gid')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.analytics.duration3')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.thirdParty')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Marketing Cookies */}
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-6 mb-3 flex items-center">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs mr-2">{t('cookies.section3.marketing.badge')}</span>
                {t('cookies.section3.marketing.title')}
              </h3>
              <p className="mb-4">
                {t('cookies.section3.marketing.description')}
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-sand-50">
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.cookie')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.purpose')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.duration')}</th>
                      <th className="border border-gray-200 px-3 py-3 text-left text-sm font-display font-semibold">{t('cookies.table.type')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">_fbp</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.marketing.fbp')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.marketing.duration1')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.thirdParty')}</td>
                    </tr>
                    <tr className="bg-sand-50">
                      <td className="border border-gray-200 px-3 py-3 font-mono text-xs">ads_prefs</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.marketing.adsPrefs')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.section3.marketing.duration2')}</td>
                      <td className="border border-gray-200 px-3 py-3">{t('cookies.table.thirdParty')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section4.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('cookies.section4.subtitle1')}</h3>
              <p className="mb-4">
                {t('cookies.section4.banner')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('cookies.section4.subtitle2')}</h3>
              <p className="mb-4">
                {t('cookies.section4.changePreferences')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('cookies.section4.subtitle3')}</h3>
              <p className="mb-4">
                {t('cookies.section4.browserSettings')}
              </p>
              <ul className="list-none space-y-2">
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://support.mozilla.org/pt-PT/kb/cookies-informacao-websites-guardam-no-computador" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Safari
                  </a>
                </li>
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded-r-xl">
                <p className="text-sm text-blue-800">
                  {t('cookies.section4.warning')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section5.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section5.intro')}
              </p>
              <ul className="list-none space-y-3">
                <li className="bg-sand-50 rounded-xl p-4">
                  <strong>Google Analytics:</strong>{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {t('cookies.section5.googlePrivacy')}
                  </a>
                </li>
                <li className="bg-sand-50 rounded-xl p-4">
                  <strong>Facebook (Meta):</strong>{' '}
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {t('cookies.section5.metaPrivacy')}
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                {t('cookies.section5.optOut')}
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Your Online Choices (UE)
                  </a>
                </li>
                <li className="bg-sand-50 rounded-xl p-3">
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section6.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section6.intro')}
              </p>
              <ul className="list-none space-y-3">
                <li className="bg-sand-50 rounded-xl p-4">
                  {t('cookies.section6.localStorage')}
                </li>
                <li className="bg-sand-50 rounded-xl p-4">
                  {t('cookies.section6.sessionStorage')}
                </li>
                <li className="bg-sand-50 rounded-xl p-4">
                  {t('cookies.section6.pixels')}
                </li>
              </ul>
              <p className="mt-4">
                {t('cookies.section6.consent')}
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section7.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section7.paragraph1')}
              </p>
              <p>
                {t('cookies.section7.paragraph2')}
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('cookies.section8.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('cookies.section8.intro')}
              </p>
              <div className="bg-sand-50 rounded-xl p-6">
                <ul className="list-none space-y-2">
                  <li><strong>{t('cookies.section8.email')}:</strong> privacidade@realestate-pt.com</li>
                  <li><strong>{t('cookies.section8.form')}:</strong> <Link to="/contact" className="text-primary-600 hover:underline">{t('cookies.section8.contactPage')}</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-8 card shadow-float rounded-2xl p-8">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">{t('cookies.relatedDocs.title')}</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('cookies.relatedDocs.terms')}
            </Link>
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('cookies.relatedDocs.privacy')}
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('cookies.relatedDocs.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
