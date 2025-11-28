import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../api/admin';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaUser,
  FaHome,
  FaCalendar,
  FaReply,
  FaTrash,
  FaCheck,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes,
  FaInbox,
  FaPaperPlane
} from 'react-icons/fa';

const AdminInquiries = () => {
  const { t } = useTranslation();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    inquiryType: '',
    search: '',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [filters]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getInquiries(filters);
      setInquiries(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error(t('admin.inquiries.errors.loadInquiries'));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleRespond = async () => {
    if (!responseText.trim()) {
      toast.error(t('admin.inquiries.errors.writeResponse'));
      return;
    }

    try {
      await adminAPI.respondToInquiry(selectedInquiry._id, responseText);
      toast.success(t('admin.inquiries.success.responseSent'));
      setShowResponseModal(false);
      setSelectedInquiry(null);
      setResponseText('');
      fetchInquiries();
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      toast.error(t('admin.inquiries.errors.sendResponse'));
    }
  };

  const handleClose = async (inquiryId) => {
    if (!confirm(t('admin.inquiries.confirmClose'))) return;

    try {
      await adminAPI.closeInquiry(inquiryId);
      toast.success(t('admin.inquiries.success.inquiryClosed'));
      fetchInquiries();
    } catch (error) {
      console.error('Error closing inquiry:', error);
      toast.error(t('admin.inquiries.errors.closeInquiry'));
    }
  };

  const handleDelete = async (inquiryId) => {
    if (!confirm(t('admin.inquiries.confirmDelete'))) return;

    try {
      await adminAPI.deleteInquiry(inquiryId);
      toast.success(t('admin.inquiries.success.inquiryDeleted'));
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error(t('admin.inquiries.errors.deleteInquiry'));
    }
  };

  const openResponseModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText(inquiry.response || '');
    setShowResponseModal(true);
  };

  const openDetailModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailModal(true);
  };

  if (loading && inquiries.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FaInbox className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('admin.inquiries.title')}
              </h1>
              <p className="text-gray-600">
                {t('admin.inquiries.subtitle', { count: pagination.total || 0 })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card rounded-2xl border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.inquiries.stats.pending')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="card rounded-2xl border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.inquiries.stats.responded')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'responded').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <FaCheck className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="card rounded-2xl border-l-4 border-gray-500 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.inquiries.stats.closed')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === 'closed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                <FaTimes className="text-xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card rounded-2xl mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <FaFilter className="text-white text-sm" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('admin.inquiries.filters.title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder={t('admin.inquiries.filters.searchPlaceholder')}
                  className="input-field pl-11"
                />
              </div>
            </form>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">{t('admin.inquiries.filters.allStatuses')}</option>
              <option value="pending">{t('admin.inquiries.status.pending')}</option>
              <option value="responded">{t('admin.inquiries.status.responded')}</option>
              <option value="closed">{t('admin.inquiries.status.closed')}</option>
            </select>

            {/* Type Filter */}
            <select
              value={filters.inquiryType}
              onChange={(e) => setFilters({ ...filters, inquiryType: e.target.value, page: 1 })}
              className="input-field"
            >
              <option value="">{t('admin.inquiries.filters.allTypes')}</option>
              <option value="viewing">{t('admin.inquiries.types.viewing')}</option>
              <option value="information">{t('admin.inquiries.types.information')}</option>
              <option value="offer">{t('admin.inquiries.types.offer')}</option>
              <option value="general">{t('admin.inquiries.types.general')}</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-sand-100 to-sand-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.contact')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.property')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.type')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.status')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.date')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('admin.inquiries.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-sand-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-11 w-11">
                          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <FaUser className="text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{inquiry.name}</div>
                          <div className="text-sm text-gray-500">{inquiry.email}</div>
                          {inquiry.phone && (
                            <div className="text-xs text-gray-400">{inquiry.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.property ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {inquiry.property.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {inquiry.property.address?.city}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getTypeBadge(inquiry.inquiryType)
                      }`}>
                        {t(`admin.inquiries.types.${inquiry.inquiryType || 'general'}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusBadge(inquiry.status)
                      }`}>
                        {t(`admin.inquiries.status.${inquiry.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 flex items-center">
                        <FaCalendar className="mr-2 text-gray-400" />
                        {new Date(inquiry.createdAt).toLocaleDateString('pt-PT')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openDetailModal(inquiry)}
                          className="w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center transition-colors"
                          title={t('admin.inquiries.actions.viewDetails')}
                        >
                          <FaEye />
                        </button>
                        {inquiry.status !== 'closed' && (
                          <button
                            onClick={() => openResponseModal(inquiry)}
                            className="w-9 h-9 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition-colors"
                            title={t('admin.inquiries.actions.respond')}
                          >
                            <FaReply />
                          </button>
                        )}
                        {inquiry.status === 'responded' && (
                          <button
                            onClick={() => handleClose(inquiry._id)}
                            className="w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors"
                            title={t('admin.inquiries.actions.close')}
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                          title={t('admin.inquiries.actions.delete')}
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

          {inquiries.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-sand-200 to-sand-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-3xl text-sand-500" />
              </div>
              <p className="text-gray-500 text-lg">{t('admin.inquiries.empty.title')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('admin.inquiries.empty.subtitle')}</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-sand-50 px-6 py-4 flex items-center justify-between border-t border-sand-100">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  disabled={filters.page === 1}
                  className="btn-secondary"
                >
                  {t('admin.inquiries.pagination.previous')}
                </button>
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  disabled={filters.page === pagination.pages}
                  className="btn-secondary"
                >
                  {t('admin.inquiries.pagination.next')}
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {t('admin.inquiries.pagination.pageInfo', { page: pagination.page, pages: pagination.pages })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={filters.page === 1}
                    className="btn-secondary"
                  >
                    {t('admin.inquiries.pagination.previous')}
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={filters.page === pagination.pages}
                    className="btn-secondary"
                  >
                    {t('admin.inquiries.pagination.next')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border max-w-lg w-full shadow-2xl rounded-2xl bg-white">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedInquiry(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEye className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t('admin.inquiries.detailModal.title')}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-sand-50 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('admin.inquiries.detailModal.contact')}</h4>
                  <p className="text-sm"><span className="font-medium">{t('admin.inquiries.detailModal.name')}:</span> {selectedInquiry.name}</p>
                  <p className="text-sm"><span className="font-medium">{t('admin.inquiries.detailModal.email')}:</span> {selectedInquiry.email}</p>
                  {selectedInquiry.phone && (
                    <p className="text-sm"><span className="font-medium">{t('admin.inquiries.detailModal.phone')}:</span> {selectedInquiry.phone}</p>
                  )}
                </div>

                {selectedInquiry.property && (
                  <div className="bg-sand-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('admin.inquiries.detailModal.property')}</h4>
                    <p className="text-sm font-medium">{selectedInquiry.property.title}</p>
                    {selectedInquiry.property.address && (
                      <p className="text-xs text-gray-500">
                        {selectedInquiry.property.address.city}, {selectedInquiry.property.address.district}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('admin.inquiries.detailModal.message')}</h4>
                  <p className="text-sm text-gray-600 bg-sand-50 p-4 rounded-xl">
                    {selectedInquiry.message}
                  </p>
                </div>

                {selectedInquiry.response && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('admin.inquiries.detailModal.response')}</h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-4 rounded-xl border border-green-100">
                      {selectedInquiry.response}
                    </p>
                    {selectedInquiry.respondedAt && (
                      <p className="text-xs text-gray-400 mt-2">
                        {t('admin.inquiries.detailModal.respondedAt')}: {new Date(selectedInquiry.respondedAt).toLocaleString('pt-PT')}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-4 pt-2">
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getTypeBadge(selectedInquiry.inquiryType)}`}>
                    {t(`admin.inquiries.types.${selectedInquiry.inquiryType || 'general'}`)}
                  </span>
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(selectedInquiry.status)}`}>
                    {t(`admin.inquiries.status.${selectedInquiry.status}`)}
                  </span>
                </div>
              </div>

              <div className="flex mt-6">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedInquiry(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  {t('admin.inquiries.detailModal.close')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Response Modal */}
        {showResponseModal && selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border max-w-lg w-full shadow-2xl rounded-2xl bg-white">
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedInquiry(null);
                  setResponseText('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t('admin.inquiries.responseModal.title')}
                </h3>
              </div>

              <div className="mb-4 bg-sand-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{t('admin.inquiries.responseModal.from')}:</span> {selectedInquiry.name} ({selectedInquiry.email})
                </p>
                {selectedInquiry.property && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">{t('admin.inquiries.responseModal.property')}:</span> {selectedInquiry.property.title}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-3 italic border-l-2 border-primary-300 pl-3">
                  "{selectedInquiry.message}"
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('admin.inquiries.responseModal.yourResponse')}
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder={t('admin.inquiries.responseModal.responsePlaceholder')}
                  className="input-field w-full h-32 resize-none"
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedInquiry(null);
                    setResponseText('');
                  }}
                  className="btn-secondary flex-1"
                >
                  {t('admin.inquiries.responseModal.cancel')}
                </button>
                <button onClick={handleRespond} className="btn-primary flex-1 flex items-center justify-center space-x-2">
                  <FaPaperPlane />
                  <span>{t('admin.inquiries.responseModal.sendResponse')}</span>
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
    pending: 'badge-warning',
    responded: 'badge-success',
    closed: 'bg-gray-100 text-gray-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

const getTypeBadge = (type) => {
  const badges = {
    viewing: 'badge-info',
    information: 'bg-purple-100 text-purple-800',
    offer: 'badge-success',
    general: 'bg-gray-100 text-gray-800'
  };
  return badges[type] || 'bg-gray-100 text-gray-800';
};

export default AdminInquiries;
