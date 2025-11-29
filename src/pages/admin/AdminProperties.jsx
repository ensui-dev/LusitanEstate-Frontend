import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaTrash,
  FaFilter,
  FaCheckDouble,
  FaHome,
  FaBuilding
} from 'react-icons/fa';

const AdminProperties = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    approvalStatus: '',
    district: '',
    propertyType: '',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectPropertyId, setRejectPropertyId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAdminProperties(filters);
      setProperties(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error(t('admin.properties.errors.loadProperties'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId) => {
    if (!confirm(t('admin.properties.confirmApprove'))) return;

    try {
      await adminAPI.approveProperty(propertyId);
      toast.success(t('admin.properties.success.approved'));
      fetchProperties();
    } catch (error) {
      console.error('Error approving property:', error);
      toast.error(t('admin.properties.errors.approve'));
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error(t('admin.properties.errors.provideReason'));
      return;
    }

    try {
      await adminAPI.rejectProperty(rejectPropertyId, rejectionReason);
      toast.success(t('admin.properties.success.rejected'));
      setShowRejectModal(false);
      setRejectPropertyId(null);
      setRejectionReason('');
      fetchProperties();
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast.error(t('admin.properties.errors.reject'));
    }
  };

  const handleBulkApprove = async () => {
    if (selectedProperties.length === 0) {
      toast.error(t('admin.properties.errors.selectAtLeastOne'));
      return;
    }

    if (!confirm(t('admin.properties.confirmBulkApprove', { count: selectedProperties.length }))) return;

    try {
      await adminAPI.bulkApproveProperties(selectedProperties);
      toast.success(t('admin.properties.success.bulkApproved', { count: selectedProperties.length }));
      setSelectedProperties([]);
      fetchProperties();
    } catch (error) {
      console.error('Error bulk approving:', error);
      toast.error(t('admin.properties.errors.bulkApprove'));
    }
  };

  const handleDelete = async (propertyId) => {
    if (!confirm(t('admin.properties.confirmDelete'))) return;

    try {
      await adminAPI.deleteProperty(propertyId);
      toast.success(t('admin.properties.success.deleted'));
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error(t('admin.properties.errors.delete'));
    }
  };

  const togglePropertySelection = (propertyId) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(properties.map(p => p._id));
    }
  };

  const openRejectModal = (propertyId) => {
    setRejectPropertyId(propertyId);
    setShowRejectModal(true);
  };

  if (loading && properties.length === 0) {
    return (
      <div className="pt-28">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <FaHome className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('admin.properties.title')}
              </h1>
              <p className="text-gray-600">
                {t('admin.properties.subtitle', { count: pagination.total || 0 })}
              </p>
            </div>
          </div>
          {selectedProperties.length > 0 && (
            <button
              onClick={handleBulkApprove}
              className="btn-primary flex items-center space-x-2"
            >
              <FaCheckDouble />
              <span>{t('admin.properties.bulkApprove', { count: selectedProperties.length })}</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="card rounded-2xl mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <FaFilter className="text-white text-sm" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.properties.filters.title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.approvalStatus}
              onChange={(e) => setFilters({ ...filters, approvalStatus: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">{t('admin.properties.filters.allApprovalStatuses')}</option>
              <option value="pending">{t('admin.properties.approvalStatus.pending')}</option>
              <option value="approved">{t('admin.properties.approvalStatus.approved')}</option>
              <option value="rejected">{t('admin.properties.approvalStatus.rejected')}</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">{t('admin.properties.filters.allStatuses')}</option>
              <option value="for-sale">{t('admin.properties.status.forSale')}</option>
              <option value="for-rent">{t('admin.properties.status.forRent')}</option>
              <option value="sold">{t('admin.properties.status.sold')}</option>
              <option value="rented">{t('admin.properties.status.rented')}</option>
              <option value="draft">{t('admin.properties.status.draft')}</option>
            </select>

            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">{t('admin.properties.filters.allTypes')}</option>
              <option value="apartment">{t('propertyTypes.apartment')}</option>
              <option value="house">{t('propertyTypes.house')}</option>
              <option value="villa">{t('propertyTypes.villa')}</option>
              <option value="commercial">{t('propertyTypes.commercial')}</option>
              <option value="land">{t('propertyTypes.land')}</option>
            </select>

            <button
              onClick={() => setFilters({ status: '', approvalStatus: '', district: '', propertyType: '', page: 1 })}
              className="btn-secondary"
            >
              {t('admin.properties.filters.clearFilters')}
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-sand-100 to-sand-50">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProperties.length === properties.length && properties.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.property')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.owner')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.price')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.status')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.approval')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.properties.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-sand-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property._id)}
                        onChange={() => togglePropertySelection(property._id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0].url}
                            alt={property.title}
                            className="h-14 w-14 rounded-xl object-cover mr-4 shadow-sm"
                          />
                        ) : (
                          <div className="h-14 w-14 bg-gradient-to-br from-sand-200 to-sand-300 rounded-xl mr-4 flex items-center justify-center">
                            <FaBuilding className="text-sand-500" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">
                            {property.address?.city}, {property.address?.district}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{property.owner?.name}</div>
                      <div className="text-sm text-gray-500">{property.owner?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg inline-block">
                        {new Intl.NumberFormat('pt-PT', {
                          style: 'currency',
                          currency: 'EUR',
                          maximumFractionDigits: 0
                        }).format(property.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusBadge(property.status)
                      }`}>
                        {t(`admin.properties.status.${property.status.replace('-', '')}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getApprovalBadge(property.approvalStatus)
                      }`}>
                        {t(`admin.properties.approvalStatus.${property.approvalStatus}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {property.approvalStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(property._id)}
                              className="w-9 h-9 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                              title={t('admin.properties.actions.approve')}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => openRejectModal(property._id)}
                              className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                              title={t('admin.properties.actions.reject')}
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        <a
                          href={`/properties/${property._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                          title={t('admin.properties.actions.view')}
                        >
                          <FaEye />
                        </a>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                          title={t('admin.properties.actions.delete')}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-sand-50 px-6 py-4 flex items-center justify-between border-t border-sand-100">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  disabled={filters.page === 1}
                  className="btn-secondary"
                >
                  {t('admin.properties.pagination.previous')}
                </button>
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  disabled={filters.page === pagination.pages}
                  className="btn-secondary"
                >
                  {t('admin.properties.pagination.next')}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {t('admin.properties.pagination.pageInfo', { page: pagination.page, pages: pagination.pages })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={filters.page === 1}
                    className="btn-secondary"
                  >
                    {t('admin.properties.pagination.previous')}
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={filters.page === pagination.pages}
                    className="btn-secondary"
                  >
                    {t('admin.properties.pagination.next')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border max-w-md w-full shadow-2xl rounded-2xl bg-white">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectPropertyId(null);
                  setRejectionReason('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t('admin.properties.modal.title')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t('admin.properties.modal.subtitle')}
                </p>
              </div>

              <div className="mb-6">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder={t('admin.properties.modal.reasonPlaceholder')}
                  className="input-field w-full h-32 resize-none"
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectPropertyId(null);
                    setRejectionReason('');
                  }}
                  className="btn-secondary flex-1"
                >
                  {t('admin.properties.modal.cancel')}
                </button>
                <button onClick={handleReject} className="btn-danger flex-1">
                  {t('admin.properties.modal.reject')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Functions
const getStatusBadge = (status) => {
  const badges = {
    'for-sale': 'badge-success',
    'for-rent': 'badge-info',
    'sold': 'bg-gray-100 text-gray-800',
    'rented': 'bg-gray-100 text-gray-800',
    'pending': 'badge-warning',
    'draft': 'bg-orange-100 text-orange-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

const getApprovalBadge = (status) => {
  const badges = {
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default AdminProperties;
