import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaArrowLeft, FaUserShield, FaDatabase, FaLock, FaGlobe } from 'react-icons/fa';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 hover:translate-x-[-4px] transition-all duration-200 mb-6 group"
        >
          <FaArrowLeft className="mr-2 group-hover:animate-pulse" />
          {t('privacy.backLink')}
        </Link>

        {/* Header Card */}
        <div className="card shadow-float rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary-100 text-primary-700 p-3 rounded-full">
              <FaShieldAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">{t('privacy.title')}</h1>
              <p className="text-gray-500">{t('privacy.lastUpdated')}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-lg text-gray-600 mb-6">
              {t('privacy.intro')}
            </p>
          </div>

          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-sand-50 p-4 rounded-xl text-center">
              <FaUserShield className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('privacy.overview.rights.title')}</p>
              <p className="text-xs text-gray-500">{t('privacy.overview.rights.subtitle')}</p>
            </div>
            <div className="bg-sand-50 p-4 rounded-xl text-center">
              <FaDatabase className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('privacy.overview.minimal.title')}</p>
              <p className="text-xs text-gray-500">{t('privacy.overview.minimal.subtitle')}</p>
            </div>
            <div className="bg-sand-50 p-4 rounded-xl text-center">
              <FaLock className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('privacy.overview.security.title')}</p>
              <p className="text-xs text-gray-500">{t('privacy.overview.security.subtitle')}</p>
            </div>
            <div className="bg-sand-50 p-4 rounded-xl text-center">
              <FaGlobe className="text-primary-600 text-2xl mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t('privacy.overview.transparency.title')}</p>
              <p className="text-xs text-gray-500">{t('privacy.overview.transparency.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 - Controller */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.section1.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                {t('privacy.section1.intro')}
              </p>
              <div className="bg-sand-50 p-6 rounded-xl">
                <ul className="list-none space-y-2">
                  <li><strong>{t('privacy.section1.entity')}:</strong> RealEstate PT</li>
                  <li><strong>{t('privacy.section1.address')}:</strong> Lisboa, Portugal</li>
                  <li><strong>{t('privacy.section1.email')}:</strong> privacidade@realestate-pt.com</li>
                  <li><strong>{t('privacy.section1.website')}:</strong> lusitanestate.netlify.app</li>
                </ul>
              </div>
              <p className="mt-4">
                {t('privacy.section1.contact')} <Link to="/contact" className="text-primary-600 hover:underline">{t('privacy.section1.contactPage')}</Link>.
              </p>
            </div>
          </section>

          {/* Section 2 - Data Collected */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.collection.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.collection.description')}</p>
              {[
                { title: 'privacy.sections.collection.personal.title', items: [
                  'privacy.sections.collection.personal.items.item1',
                  'privacy.sections.collection.personal.items.item2',
                  'privacy.sections.collection.personal.items.item3',
                  'privacy.sections.collection.personal.items.item4',
                  'privacy.sections.collection.personal.items.item5',
                  'privacy.sections.collection.personal.items.item6'
                ]},
                { title: 'privacy.sections.collection.automatic.title', items: [
                  'privacy.sections.collection.automatic.items.item1',
                  'privacy.sections.collection.automatic.items.item2',
                  'privacy.sections.collection.automatic.items.item3',
                  'privacy.sections.collection.automatic.items.item4',
                  'privacy.sections.collection.automatic.items.item5',
                  'privacy.sections.collection.automatic.items.item6'
                ]}
              ].map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-lg font-display font-semibold text-gray-800 mt-4 mb-2">{t(section.title)}</h3>
                  <ul className="list-none space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="bg-sand-50 rounded-xl p-3">{t(item)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 - Usage */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.usage.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.usage.description')}</p>
              <ul className="list-none space-y-3">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <li key={i} className="bg-sand-50 rounded-xl p-4">{t(`privacy.sections.usage.purposes.item${i}`)}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 - Sharing */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.sharing.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.sharing.description')}</p>
              <ul className="list-none space-y-3">
                {[1,2,3,4,5,6].map(i => (
                  <li key={i} className="bg-sand-50 rounded-xl p-4">{t(`privacy.sections.sharing.parties.item${i}`)}</li>
                ))}
              </ul>
              <p className="mt-4">{t('privacy.sections.sharing.note')}</p>
            </div>
          </section>

          {/* Section 5 - Cookies */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.cookies.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{t('privacy.sections.cookies.content')}</p>
            </div>
          </section>

          {/* Section 6 - Security */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.security.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{t('privacy.sections.security.content')}</p>
            </div>
          </section>

          {/* Section 7 - Your Rights */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.rights.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.rights.description')}</p>
              <ul className="list-none space-y-3">
                {['access', 'rectification', 'erasure', 'restriction', 'portability', 'objection'].map(right => (
                  <li key={right} className="bg-sand-50 rounded-xl p-4">
                    <strong>{t(`privacy.sections.rights.items.${right}.title`)}</strong>: {t(`privacy.sections.rights.items.${right}.description`)}
                  </li>
                ))}
              </ul>
              <p className="mt-4">{t('privacy.sections.rights.exercise')}</p>
            </div>
          </section>

          {/* Section 8 - Retention */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.retention.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.retention.description')}</p>
            </div>
          </section>

          {/* Section 9 - International Transfers */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.transfers.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{t('privacy.sections.transfers.description')}</p>
            </div>
          </section>

          {/* Section 10 - Minors */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.minors.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{t('privacy.sections.minors.content')}</p>
            </div>
          </section>

          {/* Section 11 - Changes */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.changes.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{t('privacy.sections.changes.description')}</p>
            </div>
          </section>

          {/* Section 12 - Contact */}
          <section className="card shadow-float rounded-2xl p-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">{t('privacy.sections.contact.title')}</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{t('privacy.sections.contact.description')}</p>
              <div className="bg-sand-50 rounded-xl p-6">
                <ul className="list-none space-y-2">
                  <li><strong>{t('privacy.sections.contact.emailPrivacy')}:</strong> privacidade@realestate-pt.com</li>
                  <li><strong>{t('privacy.sections.contact.emailGeneral')}:</strong> geral@realestate-pt.com</li>
                  <li><strong>{t('privacy.sections.contact.form')}:</strong> <Link to="/contact" className="text-primary-600 hover:underline">{t('privacy.sections.contact.contactPage')}</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-8 card shadow-float rounded-2xl p-8">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">{t('privacy.relatedDocs.title')}</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('privacy.relatedDocs.terms')}
            </Link>
            <Link to="/cookies" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('privacy.relatedDocs.cookies')}
            </Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200">
              {t('privacy.relatedDocs.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
