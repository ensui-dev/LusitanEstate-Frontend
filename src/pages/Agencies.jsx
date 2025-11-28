import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { agenciesAPI } from '../api/agencies';
import AgencyCard from '../components/agency/AgencyCard';
import Loading from '../components/common/Loading';
import { FaSearch, FaFilter, FaBuilding, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { PORTUGUESE_DISTRICTS } from '../utils/districts';

const Agencies = () => {
  const { t } = useTranslation();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    district: '',
    isVerified: '',
    sortBy: 'name'
  });

  useEffect(() => {
    fetchAgencies();
  }, [filters]);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const response = await agenciesAPI.getAgencies(filters);
      if (response.success) {
        setAgencies(response.data);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
      toast.error(t('agencies.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAgencies();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      district: '',
      isVerified: '',
      sortBy: 'name'
    });
  };

  const hasActiveFilters = searchTerm || filters.district || filters.isVerified;

  const filteredAgencies = agencies.filter(agency => {
    if (!searchTerm) return true;
    const name = agency.name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search);
  });

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('agencies.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('agencies.subtitle')}
          </p>
        </div>

        {/* Search and Filters Card */}
        <div className="card rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FaFilter className="text-primary-600" />
              <span className="font-semibold">{t('agencies.searchAndFilter')}</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                <FaTimes />
                {t('agencies.clear')}
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t('agencies.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('agencies.filters.district')}
              </label>
              <select
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">{t('agencies.filters.allDistricts')}</option>
                {PORTUGUESE_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('agencies.filters.verified')}
              </label>
              <select
                name="isVerified"
                value={filters.isVerified}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">{t('agencies.filters.all')}</option>
                <option value="true">{t('agencies.filters.onlyVerified')}</option>
                <option value="false">{t('agencies.filters.notVerified')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('agencies.filters.sortBy')}
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="name">{t('agencies.filters.name')}</option>
                <option value="agents">{t('agencies.filters.numAgents')}</option>
                <option value="createdAt">{t('agencies.filters.newest')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-primary-600">{filteredAgencies.length}</span>{' '}
            {filteredAgencies.length === 1 ? t('agencies.results.singular') : t('agencies.results.plural')}
          </p>
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <div key={agency._id} className="transition-all duration-300 hover:shadow-float hover:-translate-y-1">
                <AgencyCard agency={agency} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card rounded-2xl text-center py-16">
            <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">{t('agencies.empty.title')}</p>
            <p className="text-gray-500">{t('agencies.empty.subtitle')}</p>
            <button
              onClick={clearFilters}
              className="btn-primary mt-6"
            >
              {t('agencies.clear')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agencies;
