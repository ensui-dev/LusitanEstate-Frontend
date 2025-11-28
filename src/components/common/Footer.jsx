import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaHome, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary-950" />
      <div className="absolute inset-0 bg-portuguese-pattern opacity-5" />

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Wave Decoration */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 group mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <FaHome className="text-white text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-white leading-tight">
                    Lusitan<span className="text-primary-400">Estate</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
                    Portugal
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t('footer.tagline')}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-black rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                  <FaXTwitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-primary-500 mr-3"></span>
                {t('footer.company')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/properties" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.properties')}
                  </Link>
                </li>
                <li>
                  <Link to="/agencies" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.agencies')}
                  </Link>
                </li>
                <li>
                  <Link to="/agents" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.agents')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.about')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Professionals */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-terracotta-500 mr-3"></span>
                {t('footer.resources')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/register?role=agent" className="text-gray-400 hover:text-terracotta-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-terracotta-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('roles.agent')}
                  </Link>
                </li>
                <li>
                  <Link to="/register?role=seller" className="text-gray-400 hover:text-terracotta-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-terracotta-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.addProperty')}
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-terracotta-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-terracotta-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('nav.pricing')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-golden-500 mr-3"></span>
                {t('nav.contact')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-golden-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-golden-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {t('common.contactUs')}
                  </Link>
                </li>
                <li className="flex items-center text-gray-400">
                  <FaMapMarkerAlt className="text-golden-500 mr-3" />
                  <span>Lisboa, Portugal</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <FaEnvelope className="text-golden-500 mr-3" />
                  <a href="mailto:info@lusitanestate.pt" className="hover:text-golden-400 transition-colors">
                    info@lusitanestate.pt
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <FaPhone className="text-golden-500 mr-3" />
                  <span>+351 21 000 0000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                  {t('footer.terms')}
                </Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link to="/cookies" className="text-gray-500 hover:text-gray-300 transition-colors">
                  {t('footer.cookies')}
                </Link>
              </div>
              <p className="text-gray-500 text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
