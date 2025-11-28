import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBalanceScale, FaArrowLeft } from 'react-icons/fa';

const Terms = () => {
  const { t } = useTranslation();
  const lastUpdated = t('terms.header.date');

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 hover:translate-x-[-4px] transition-all duration-200 mb-6 group"
        >
          <FaArrowLeft className="mr-2 group-hover:animate-pulse" />
          {t('terms.backLink')}
        </Link>

        {/* Header Card */}
        <div className="card shadow-float rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary-100 text-primary-700 p-3 rounded-full">
              <FaBalanceScale className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">{t('terms.header.title')}</h1>
              <p className="text-gray-500">{t('terms.header.lastUpdated')}: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-8">
              {t('terms.header.intro')}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section1.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <ul className="list-none space-y-3">
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section1.platform')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section1.user')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section1.services')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section1.content')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section1.account')}</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section2.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('terms.section2.paragraph1')}
              </p>
              <p className="mb-4">
                {t('terms.section2.paragraph2')}
              </p>
              <p>
                {t('terms.section2.paragraph3')}
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section3.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section3.subtitle1')}</h3>
              <p className="mb-4">
                {t('terms.section3.paragraph1')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section3.subtitle2')}</h3>
              <ul className="list-none space-y-3 mb-4">
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section3.buyer')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section3.seller')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section3.agent')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section3.agency')}</li>
              </ul>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section3.subtitle3')}</h3>
              <p>
                {t('terms.section3.paragraph2')}
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section4.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section4.subtitle1')}</h3>
              <p className="mb-4">{t('terms.section4.intro1')}</p>
              <ul className="list-none space-y-3 mb-4">
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.requirement1')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.requirement2')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.requirement3')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.requirement4')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.requirement5')}</li>
              </ul>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section4.subtitle2')}</h3>
              <p className="mb-4">{t('terms.section4.intro2')}</p>
              <ul className="list-none space-y-3 mb-4">
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.prohibited1')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.prohibited2')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.prohibited3')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.prohibited4')}</li>
                <li className="bg-sand-50 rounded-xl p-4">{t('terms.section4.prohibited5')}</li>
              </ul>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section4.subtitle3')}</h3>
              <p>
                {t('terms.section4.paragraph1')}
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section5.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('terms.section5.paragraph1')}
              </p>
              <p className="mb-4">
                {t('terms.section5.paragraph2')}
              </p>
              <p>
                {t('terms.section5.paragraph3')}
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section6.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section6.subtitle1')}</h3>
              <p className="mb-4">
                {t('terms.section6.paragraph1')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section6.subtitle2')}</h3>
              <p className="mb-4">
                {t('terms.section6.paragraph2')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section6.subtitle3')}</h3>
              <p>
                {t('terms.section6.paragraph3')}
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section7.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                {t('terms.section7.paragraph1')}
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section8.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section8.subtitle1')}</h3>
              <p className="mb-4">
                {t('terms.section8.paragraph1')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section8.subtitle2')}</h3>
              <p className="mb-4">
                {t('terms.section8.paragraph2')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section8.subtitle3')}</h3>
              <p>
                {t('terms.section8.paragraph3')}
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section9.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('terms.section9.paragraph1')}
              </p>
              <p>
                {t('terms.section9.paragraph2')}
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section10.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section10.subtitle1')}</h3>
              <p className="mb-4">
                {t('terms.section10.paragraph1')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section10.subtitle2')}</h3>
              <p className="mb-4">
                {t('terms.section10.paragraph2')}
              </p>

              <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t('terms.section10.subtitle3')}</h3>
              <p>
                {t('terms.section10.paragraph3')}
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('terms.section11.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('terms.section11.intro')}
              </p>
              <div className="bg-sand-50 rounded-xl p-6">
                <ul className="list-none space-y-2">
                  <li><strong>{t('terms.section11.email')}:</strong> legal@realestate-pt.com</li>
                  <li><strong>{t('terms.section11.address')}:</strong> Lisboa, Portugal</li>
                  <li><strong>{t('terms.section11.contactForm')}:</strong> <Link to="/contact" className="text-primary-600 hover:underline">{t('terms.section11.contactPage')}</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-8 card shadow-float rounded-2xl p-8">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">{t('terms.relatedDocs.title')}</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('terms.relatedDocs.privacy')}
            </Link>
            <Link to="/cookies" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('terms.relatedDocs.cookies')}
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('terms.relatedDocs.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
