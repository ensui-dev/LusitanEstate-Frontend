import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes, FaStar, FaRocket, FaBuilding, FaArrowRight, FaChevronDown } from 'react-icons/fa';

const Pricing = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      subtitle: t('pricing.plans.basic.subtitle'),
      price: t('pricing.plans.basic.price'),
      period: t('pricing.plans.basic.period'),
      description: t('pricing.plans.basic.description'),
      features: [
        { text: t('pricing.plans.basic.features.listings'), included: true },
        { text: t('pricing.plans.basic.features.photos'), included: true },
        { text: t('pricing.plans.basic.features.basicListing'), included: true },
        { text: t('pricing.plans.basic.features.directContact'), included: true },
        { text: t('pricing.plans.basic.features.emailSupport'), included: true },
        { text: t('pricing.plans.basic.features.searchHighlight'), included: false },
        { text: t('pricing.plans.basic.features.advancedStats'), included: false },
        { text: t('pricing.plans.basic.features.verificationBadge'), included: false },
      ],
      cta: t('pricing.plans.basic.cta'),
      ctaLink: '/register?role=seller',
      popular: false,
      icon: FaStar,
    },
    {
      name: t('pricing.plans.professional.name'),
      subtitle: t('pricing.plans.professional.subtitle'),
      price: '29',
      period: t('pricing.plans.professional.period'),
      description: t('pricing.plans.professional.description'),
      features: [
        { text: t('pricing.plans.professional.features.unlimitedListings'), included: true },
        { text: t('pricing.plans.professional.features.photos'), included: true },
        { text: t('pricing.plans.professional.features.priorityListing'), included: true },
        { text: t('pricing.plans.professional.features.verifiedProfile'), included: true },
        { text: t('pricing.plans.professional.features.detailedStats'), included: true },
        { text: t('pricing.plans.professional.features.searchHighlight'), included: true },
        { text: t('pricing.plans.professional.features.prioritySupport'), included: true },
        { text: t('pricing.plans.professional.features.basicCRM'), included: true },
      ],
      cta: t('pricing.plans.professional.cta'),
      ctaLink: '/register?role=agent',
      popular: true,
      icon: FaRocket,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      subtitle: t('pricing.plans.enterprise.subtitle'),
      price: t('pricing.plans.enterprise.price'),
      period: '',
      description: t('pricing.plans.enterprise.description'),
      features: [
        { text: t('pricing.plans.enterprise.features.everything'), included: true },
        { text: t('pricing.plans.enterprise.features.teamManagement'), included: true },
        { text: t('pricing.plans.enterprise.features.customBranding'), included: true },
        { text: t('pricing.plans.enterprise.features.integrationAPI'), included: true },
        { text: t('pricing.plans.enterprise.features.advancedReports'), included: true },
        { text: t('pricing.plans.enterprise.features.dedicatedManager'), included: true },
        { text: t('pricing.plans.enterprise.features.teamTraining'), included: true },
        { text: t('pricing.plans.enterprise.features.guaranteedSLA'), included: true },
      ],
      cta: t('pricing.plans.enterprise.cta'),
      ctaLink: '/contact',
      popular: false,
      icon: FaBuilding,
    },
  ];

  const faqs = [
    {
      question: t('pricing.faq.question1'),
      answer: t('pricing.faq.answer1')
    },
    {
      question: t('pricing.faq.question2'),
      answer: t('pricing.faq.answer2')
    },
    {
      question: t('pricing.faq.question3'),
      answer: t('pricing.faq.answer3')
    },
    {
      question: t('pricing.faq.question4'),
      answer: t('pricing.faq.answer4')
    },
    {
      question: t('pricing.faq.question5'),
      answer: t('pricing.faq.answer5')
    },
    {
      question: t('pricing.faq.question6'),
      answer: t('pricing.faq.answer6')
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50 pt-28">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        {/* Portuguese Pattern Overlay */}
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10"></div>

        {/* Decorative Blur Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-terracotta-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('pricing.hero.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t('pricing.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              {t('pricing.sections.plansTitle')}
            </h2>
            <p className="section-subtitle">
              {t('pricing.sections.plansSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? 'ring-2 ring-terracotta-500 md:scale-105 relative z-10'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-center py-2 text-sm font-semibold">
                    {t('pricing.plans.professional.popular')}
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-xl shadow-lg ${
                      plan.popular
                        ? 'bg-gradient-to-br from-terracotta-500 to-terracotta-600 shadow-terracotta-500/20'
                        : 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-500/20'
                    }`}>
                      <plan.icon className="text-white text-xl" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-terracotta-600' : 'text-gray-900'}`}>
                      {plan.price === t('pricing.plans.basic.price') || plan.price === t('pricing.plans.enterprise.price')
                        ? plan.price
                        : `€${plan.price}`}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500">{plan.period}</span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                            plan.popular ? 'bg-terracotta-100' : 'bg-green-100'
                          }`}>
                            <FaCheck className={`text-xs ${
                              plan.popular ? 'text-terracotta-600' : 'text-green-600'
                            }`} />
                          </div>
                        ) : (
                          <div className="p-1 rounded-full mr-3 flex-shrink-0 bg-gray-100">
                            <FaTimes className="text-xs text-gray-400" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.ctaLink}
                    className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white hover:from-terracotta-600 hover:to-terracotta-700 shadow-lg shadow-terracotta-500/25 hover:shadow-xl hover:shadow-terracotta-500/30'
                        : 'btn-secondary hover:bg-primary-50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {t('pricing.comparison.title')}
            </h2>
            <p className="section-subtitle">
              {t('pricing.comparison.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                  <th className="py-5 px-6 text-left text-white font-medium">{t('pricing.comparison.feature')}</th>
                  <th className="py-5 px-6 text-center text-white font-semibold">{t('pricing.plans.basic.name')}</th>
                  <th className="py-5 px-6 text-center font-semibold bg-terracotta-500 text-white">{t('pricing.plans.professional.name')}</th>
                  <th className="py-5 px-6 text-center text-white font-semibold">{t('pricing.plans.enterprise.name')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: t('pricing.comparison.rows.listings'), basic: '2', pro: t('pricing.comparison.unlimited'), enterprise: t('pricing.comparison.unlimited') },
                  { feature: t('pricing.comparison.rows.photos'), basic: '5', pro: '20', enterprise: t('pricing.comparison.unlimited') },
                  { feature: t('pricing.comparison.rows.videos'), basic: '-', pro: t('pricing.comparison.rows.videoPerListing'), enterprise: t('pricing.comparison.unlimited') },
                  { feature: t('pricing.comparison.rows.virtualTours'), basic: '-', pro: t('pricing.comparison.yes'), enterprise: t('pricing.comparison.yes') },
                  { feature: t('pricing.comparison.rows.searchHighlight'), basic: '-', pro: t('pricing.comparison.yes'), enterprise: t('pricing.comparison.premium') },
                  { feature: t('pricing.comparison.rows.statistics'), basic: t('pricing.comparison.basic'), pro: t('pricing.comparison.detailed'), enterprise: t('pricing.comparison.rows.advancedAPI') },
                  { feature: t('pricing.comparison.rows.verificationBadge'), basic: '-', pro: t('pricing.comparison.rows.amiAgent'), enterprise: t('pricing.comparison.rows.agency') },
                  { feature: t('pricing.comparison.rows.support'), basic: 'Email', pro: t('pricing.comparison.rows.priority'), enterprise: t('pricing.comparison.rows.dedicated247') },
                  { feature: t('pricing.comparison.rows.integratedCRM'), basic: '-', pro: t('pricing.comparison.basic'), enterprise: t('pricing.comparison.rows.complete') },
                  { feature: t('pricing.comparison.rows.teamManagement'), basic: '-', pro: '-', enterprise: t('pricing.comparison.yes') },
                  { feature: t('pricing.comparison.rows.integrationAPI'), basic: '-', pro: '-', enterprise: t('pricing.comparison.yes') },
                  { feature: t('pricing.comparison.rows.whiteLabel'), basic: '-', pro: '-', enterprise: t('pricing.comparison.yes') },
                ].map((row, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-sand-50/50' : 'bg-white'} hover:bg-primary-50/50 transition-colors`}>
                    <td className="py-4 px-6 text-gray-700 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.basic === '-' ? <FaTimes className="text-gray-300 mx-auto" /> : row.basic}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 bg-terracotta-50/50">
                      {row.pro === '-' ? <FaTimes className="text-gray-300 mx-auto" /> :
                       row.pro === t('pricing.comparison.yes') ? <FaCheck className="text-terracotta-500 mx-auto" /> : row.pro}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      {row.enterprise === '-' ? <FaTimes className="text-gray-300 mx-auto" /> :
                       row.enterprise === t('pricing.comparison.yes') ? <FaCheck className="text-green-500 mx-auto" /> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {t('pricing.faq.title')}
            </h2>
            <p className="section-subtitle">
              {t('pricing.faq.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-sand-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 overflow-hidden">
        {/* Portuguese Pattern Overlay */}
        <div className="absolute inset-0 bg-portuguese-pattern opacity-10"></div>

        {/* Decorative Blur Circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-terracotta-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-golden-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('pricing.cta.stillHaveQuestions')}
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            {t('pricing.cta.teamAvailable')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-sand-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
            >
              {t('pricing.cta.talkToTeam')}
            </Link>
            <Link
              to="/register"
              className="bg-terracotta-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-terracotta-600 transition-all duration-300 shadow-lg shadow-terracotta-500/25 hover:shadow-xl inline-flex items-center justify-center"
            >
              {t('pricing.cta.startNow')} <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              t('pricing.trustBadges.securePayment'),
              t('pricing.trustBadges.easyCancellation'),
              t('pricing.trustBadges.noCommitment'),
              t('pricing.trustBadges.portugueseSupport')
            ].map((badge, index) => (
              <div key={index} className="flex items-center bg-sand-50 px-4 py-2 rounded-full">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <FaCheck className="text-green-600 text-xs" />
                </div>
                <span className="text-gray-700 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
