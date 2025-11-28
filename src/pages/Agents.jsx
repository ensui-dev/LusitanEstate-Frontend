import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { agentsAPI } from '../api/agents';
import AgentCard from '../components/agent/AgentCard';
import Loading from '../components/common/Loading';
import { FaSearch, FaFilter, FaUserTie, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Agents = () => {
  const { t } = useTranslation();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    isVerified: '',
    sortBy: 'rating'
  });

  useEffect(() => {
    fetchAgents();
  }, [filters]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await agentsAPI.getAgents(filters);
      if (response.success) {
        setAgents(response.data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error(t('agents.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAgents();
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
      specialty: '',
      isVerified: '',
      sortBy: 'rating'
    });
  };

  const hasActiveFilters = searchTerm || filters.specialty || filters.isVerified;

  const filteredAgents = agents.filter(agent => {
    if (!searchTerm) return true;
    const name = agent.user?.name?.toLowerCase() || '';
    const email = agent.user?.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || email.includes(search);
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
            {t('agents.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('agents.subtitle')}
          </p>
        </div>

        {/* Search and Filters Card */}
        <div className="card rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FaFilter className="text-primary-600" />
              <span className="font-semibold">{t('agents.searchAndFilter')}</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                <FaTimes />
                {t('agents.clear')}
              </button>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t('agents.searchPlaceholder')}
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
                {t('agents.filters.specialty')}
              </label>
              <select
                name="specialty"
                value={filters.specialty}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">{t('agents.filters.all')}</option>
                <option value="Residencial">{t('agents.filters.specialties.residential')}</option>
                <option value="Comercial">{t('agents.filters.specialties.commercial')}</option>
                <option value="Luxury">{t('agents.filters.specialties.luxury')}</option>
                <option value="Investment">{t('agents.filters.specialties.investment')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('agents.filters.verified')}
              </label>
              <select
                name="isVerified"
                value={filters.isVerified}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="">{t('agents.filters.allStatus')}</option>
                <option value="true">{t('agents.filters.onlyVerified')}</option>
                <option value="false">{t('agents.filters.notVerified')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('agents.filters.sortBy')}
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="input-field w-full"
              >
                <option value="rating">{t('agents.filters.rating')}</option>
                <option value="totalSales">{t('agents.filters.sales')}</option>
                <option value="name">{t('agents.filters.name')}</option>
                <option value="createdAt">{t('agents.filters.newest')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-primary-600">{filteredAgents.length}</span>{' '}
            {filteredAgents.length === 1 ? t('agents.results.singular') : t('agents.results.plural')}
          </p>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div key={agent._id} className="transition-all duration-300 hover:shadow-float hover:-translate-y-1">
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card rounded-2xl text-center py-16">
            <FaUserTie className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">{t('agents.empty.title')}</p>
            <p className="text-gray-500">{t('agents.empty.subtitle')}</p>
            <button
              onClick={clearFilters}
              className="btn-primary mt-6"
            >
              {t('agents.clear')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
