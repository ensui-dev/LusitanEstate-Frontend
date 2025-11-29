import { useState, useEffect } from 'react';
import { FiCode, FiLock, FiUnlock, FiShield, FiSearch, FiServer, FiDatabase, FiCloud, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const RestfulDocs = () => {
    const { t, i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [healthStatus, setHealthStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch health status
    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
                setHealthStatus(response.data.data);
                setLoading(false);
            } catch (error) {
                setHealthStatus({
                    status: 'offline',
                    services: {
                        api: { status: 'offline', message: t('apiDocs.systemStatus.cannotConnect') },
                        database: { status: 'unknown', message: t('apiDocs.systemStatus.unknown') },
                        aws: {
                            s3: { status: 'unknown', message: t('apiDocs.systemStatus.unknown') },
                            ses: { status: 'unknown', message: t('apiDocs.systemStatus.unknown') }
                        }
                    }
                });
                setLoading(false);
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 30000);
        return () => clearInterval(interval);
    }, [t]);

    const getStatusIcon = (status) => {
        if (status === 'online' || status === 'connected' || status === 'configured' || status === 'healthy') {
            return <FiCheckCircle className="w-5 h-5 text-green-500" />;
        } else if (status === 'connecting' || status === 'degraded') {
            return <FiAlertCircle className="w-5 h-5 text-yellow-500" />;
        } else {
            return <FiXCircle className="w-5 h-5 text-red-500" />;
        }
    };

    const getStatusColor = (status) => {
        if (status === 'online' || status === 'connected' || status === 'configured' || status === 'healthy') {
            return 'bg-green-100 text-green-800 border-green-200';
        } else if (status === 'connecting' || status === 'degraded') {
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        } else {
            return 'bg-red-100 text-red-800 border-red-200';
        }
    };

    const apiEndpoints = {
        auth: {
            title: t('apiDocs.categories.auth'),
            icon: <FiLock className="w-5 h-5" />,
            color: 'blue',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/auth/register',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.register.description'),
                    body: { name: 'string', email: 'string', password: 'string', role: 'buyer|seller|agent' },
                    response: { success: true, message: 'Registration successful. Please verify your email.' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/login',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.login.description'),
                    body: { email: 'string', password: 'string' },
                    response: { success: true, data: { token: 'jwt-token', user: {} } }
                },
                {
                    method: 'GET',
                    path: '/api/auth/me',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.authEndpoints.me.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    response: { success: true, data: { user: {} } }
                },
                {
                    method: 'PUT',
                    path: '/api/auth/updateprofile',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.authEndpoints.updateProfile.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { name: 'string', phone: 'string', avatar: 'string' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/verify-email',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.verifyEmail.description'),
                    body: { token: 'string' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/resend-verification',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.resendVerification.description'),
                    body: { email: 'string' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/forgot-password',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.forgotPassword.description'),
                    body: { email: 'string' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/reset-password',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.authEndpoints.resetPassword.description'),
                    body: { token: 'string', password: 'string' }
                }
            ]
        },
        properties: {
            title: t('apiDocs.categories.properties'),
            icon: <FiCode className="w-5 h-5" />,
            color: 'green',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/properties',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.propertyEndpoints.getAll.description'),
                    query: 'district, city, propertyType, status, minPrice, maxPrice, bedrooms, page, limit',
                    response: { success: true, count: 10, data: [] }
                },
                {
                    method: 'POST',
                    path: '/api/properties',
                    access: t('apiDocs.access.sellerAgentAdmin'),
                    description: t('apiDocs.propertyEndpoints.create.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { title: 'string', price: 'number', propertyType: 'string', address: {}, bedrooms: 'number' }
                },
                {
                    method: 'GET',
                    path: '/api/properties/user/my-properties',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.propertyEndpoints.getMyProperties.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/properties/:id',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.propertyEndpoints.getById.description')
                },
                {
                    method: 'PUT',
                    path: '/api/properties/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.propertyEndpoints.update.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/properties/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.propertyEndpoints.delete.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        agents: {
            title: t('apiDocs.categories.agents'),
            icon: <FiShield className="w-5 h-5" />,
            color: 'purple',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/agents',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.agentEndpoints.getAll.description')
                },
                {
                    method: 'POST',
                    path: '/api/agents',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agentEndpoints.create.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { bio: 'string', specialties: ['string'], languages: ['string'] }
                },
                {
                    method: 'GET',
                    path: '/api/agents/me',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agentEndpoints.getMyProfile.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/agents/:id',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.agentEndpoints.getById.description')
                },
                {
                    method: 'PUT',
                    path: '/api/agents/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agentEndpoints.update.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/agents/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agentEndpoints.delete.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        agencies: {
            title: t('apiDocs.categories.agencies'),
            icon: <FiServer className="w-5 h-5" />,
            color: 'indigo',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/agencies',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.agencyEndpoints.getAll.description')
                },
                {
                    method: 'GET',
                    path: '/api/agencies/:id',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.agencyEndpoints.getById.description')
                },
                {
                    method: 'POST',
                    path: '/api/agencies',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.agencyEndpoints.create.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/agencies/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agencyEndpoints.update.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/agencies/:id',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.agencyEndpoints.delete.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/agencies/:id/verify',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.agencyEndpoints.verify.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/agencies/:id/unverify',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.agencyEndpoints.unverify.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/agencies/:id/stats',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agencyEndpoints.getStats.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'POST',
                    path: '/api/agencies/:id/agents',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agencyEndpoints.addAgent.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/agencies/:id/agents/:agentId',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.agencyEndpoints.removeAgent.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        admin: {
            title: t('apiDocs.categories.admin'),
            icon: <FiShield className="w-5 h-5" />,
            color: 'red',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/admin/dashboard',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.dashboard.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/admin/users',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.getAllUsers.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/users/:id/role',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.updateUserRole.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { role: 'buyer|seller|agent|admin' }
                },
                {
                    method: 'DELETE',
                    path: '/api/admin/users/:id',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.deleteUser.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/admin/properties',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.getAllProperties.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/properties/:id/approve',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.approveProperty.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/properties/:id/reject',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.rejectProperty.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { reason: 'string' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/properties/bulk-approve',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.bulkApprove.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { propertyIds: ['string'] }
                },
                {
                    method: 'GET',
                    path: '/api/admin/inquiries',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.getAllInquiries.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/inquiries/:id/respond',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.respondToInquiry.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { response: 'string' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/inquiries/:id/close',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.closeInquiry.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/admin/settings',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.getSettings.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/admin/settings',
                    access: t('apiDocs.access.admin'),
                    description: t('apiDocs.adminEndpoints.updateSettings.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        inquiries: {
            title: t('apiDocs.categories.inquiries'),
            icon: <FiCode className="w-5 h-5" />,
            color: 'yellow',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/inquiries',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.create.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { property: 'id', inquiryType: 'string', message: 'string' }
                },
                {
                    method: 'GET',
                    path: '/api/inquiries/my-inquiries',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.getMy.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/inquiries/property/:propertyId',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.getByProperty.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'GET',
                    path: '/api/inquiries/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.getById.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'PUT',
                    path: '/api/inquiries/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.update.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/inquiries/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.inquiryEndpoints.delete.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        reviews: {
            title: t('apiDocs.categories.reviews'),
            icon: <FiCode className="w-5 h-5" />,
            color: 'pink',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/reviews/property/:propertyId',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.reviewEndpoints.getByProperty.description')
                },
                {
                    method: 'GET',
                    path: '/api/reviews/agent/:agentId',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.reviewEndpoints.getByAgent.description')
                },
                {
                    method: 'POST',
                    path: '/api/reviews',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.reviewEndpoints.create.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { property: 'id', rating: 'number', comment: 'string' }
                },
                {
                    method: 'PUT',
                    path: '/api/reviews/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.reviewEndpoints.update.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/reviews/:id',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.reviewEndpoints.delete.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        favorites: {
            title: t('apiDocs.categories.favorites'),
            icon: <FiCode className="w-5 h-5" />,
            color: 'orange',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/favorites',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.favoriteEndpoints.getAll.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'POST',
                    path: '/api/favorites/:propertyId',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.favoriteEndpoints.add.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'DELETE',
                    path: '/api/favorites/:propertyId',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.favoriteEndpoints.remove.description'),
                    headers: { Authorization: 'Bearer <token>' }
                },
                {
                    method: 'POST',
                    path: '/api/favorites/saved-search',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.favoriteEndpoints.addSearch.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { name: 'string', filters: {} }
                },
                {
                    method: 'DELETE',
                    path: '/api/favorites/saved-search/:searchId',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.favoriteEndpoints.removeSearch.description'),
                    headers: { Authorization: 'Bearer <token>' }
                }
            ]
        },
        upload: {
            title: t('apiDocs.categories.upload'),
            icon: <FiCloud className="w-5 h-5" />,
            color: 'teal',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/upload/property-images',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.uploadEndpoints.propertyImages.description'),
                    headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
                    body: { images: 'File[] (max 10)' }
                },
                {
                    method: 'POST',
                    path: '/api/upload/profile-image',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.uploadEndpoints.profileImage.description'),
                    headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
                    body: { image: 'File' }
                },
                {
                    method: 'DELETE',
                    path: '/api/upload/delete-image',
                    access: t('apiDocs.access.protected'),
                    description: t('apiDocs.uploadEndpoints.deleteImage.description'),
                    headers: { Authorization: 'Bearer <token>' },
                    body: { imageUrl: 'string' }
                }
            ]
        },
        health: {
            title: t('apiDocs.categories.health'),
            icon: <FiCheckCircle className="w-5 h-5" />,
            color: 'emerald',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/health',
                    access: t('apiDocs.access.public'),
                    description: t('apiDocs.healthEndpoints.getStatus.description'),
                    response: {
                        success: true,
                        data: {
                            status: 'healthy',
                            timestamp: '2025-11-29T...',
                            services: {
                                api: { status: 'online', uptime: 3600, message: 'API server is running' },
                                database: { status: 'connected', message: 'MongoDB connected successfully' },
                                aws: {
                                    s3: { status: 'configured', message: 'S3 bucket: bucket-name' },
                                    ses: { status: 'configured', message: 'SES region: eu-west-1' }
                                }
                            }
                        }
                    }
                }
            ]
        }
    };

    const getMethodColor = (method) => {
        const colors = {
            GET: 'bg-blue-100 text-blue-800',
            POST: 'bg-green-100 text-green-800',
            PUT: 'bg-yellow-100 text-yellow-800',
            DELETE: 'bg-red-100 text-red-800'
        };
        return colors[method] || 'bg-gray-100 text-gray-800';
    };

    const getAccessBadge = (access) => {
        const lowerAccess = access.toLowerCase();
        const isPublic = lowerAccess.includes('public') || lowerAccess.includes('público');
        const isAdmin = lowerAccess.includes('admin');

        if (isPublic) return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1"><FiUnlock className="w-3 h-3" /> {access}</span>;
        if (isAdmin) return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center gap-1"><FiShield className="w-3 h-3" /> {access}</span>;
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1"><FiLock className="w-3 h-3" /> {access}</span>;
    };

    const filteredEndpoints = Object.entries(apiEndpoints).filter(([key, category]) => {
        if (selectedCategory !== 'all' && key !== selectedCategory) return false;
        if (!searchTerm) return true;

        return category.endpoints.some(endpoint =>
            endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
            endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 pt-28 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('apiDocs.title')}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        {t('apiDocs.subtitle')}
                    </p>
                    <p className="text-sm text-gray-500">
                        {t('apiDocs.baseUrl')}: <code className="bg-gray-200 px-2 py-1 rounded">{import.meta.env.VITE_API_URL}</code>
                    </p>
                </div>

                {/* System Status Monitor */}
                <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FiServer className="w-6 h-6" />
                            {t('apiDocs.systemStatus.title')}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-6 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">{t('apiDocs.systemStatus.checking')}</p>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* API Server Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.api?.status || 'offline')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiServer className="w-5 h-5" />
                                            <span className="font-semibold">{t('apiDocs.systemStatus.apiServer')}</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.api?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.api?.message || t('apiDocs.systemStatus.offline')}</p>
                                    {healthStatus?.services?.api?.uptime && (
                                        <p className="text-xs mt-1">{t('apiDocs.systemStatus.uptime')}: {Math.floor(healthStatus.services.api.uptime / 60)} min</p>
                                    )}
                                </div>

                                {/* Database Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.database?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiDatabase className="w-5 h-5" />
                                            <span className="font-semibold">{t('apiDocs.systemStatus.mongodb')}</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.database?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.database?.message || t('apiDocs.systemStatus.unknown')}</p>
                                </div>

                                {/* AWS S3 Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.aws?.s3?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiCloud className="w-5 h-5" />
                                            <span className="font-semibold">{t('apiDocs.systemStatus.awsS3')}</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.aws?.s3?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.aws?.s3?.message || t('apiDocs.systemStatus.unknown')}</p>
                                </div>

                                {/* AWS SES Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.aws?.ses?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiCloud className="w-5 h-5" />
                                            <span className="font-semibold">{t('apiDocs.systemStatus.awsSes')}</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.aws?.ses?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.aws?.ses?.message || t('apiDocs.systemStatus.unknown')}</p>
                                </div>
                            </div>

                            {/* Overall Status */}
                            <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.status || 'offline')}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-lg">{t('apiDocs.systemStatus.overall')}</p>
                                        <p className="text-sm capitalize">{healthStatus?.status || t('apiDocs.systemStatus.offline')}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-600">
                                        <p>{t('apiDocs.systemStatus.lastUpdated')}: {healthStatus?.timestamp ? new Date(healthStatus.timestamp).toLocaleTimeString(i18n.language === 'pt' ? 'pt-PT' : 'en-US') : t('common.notAvailable')}</p>
                                        <p className="mt-1">{t('apiDocs.systemStatus.autoRefresh')}: 30s</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> {t('apiDocs.systemStatus.testsPassing')}</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> {t('apiDocs.systemStatus.totalEndpoints')}</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded-full"></span> {t('apiDocs.systemStatus.resources')}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search and Filter */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('apiDocs.search.placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">{t('apiDocs.search.allCategories')}</option>
                            {Object.entries(apiEndpoints).map(([key, category]) => (
                                <option key={key} value={key}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Endpoints */}
                <div className="space-y-8">
                    {filteredEndpoints.map(([key, category]) => (
                        <div key={key} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className={`bg-${category.color}-50 border-l-4 border-${category.color}-500 px-6 py-4`}>
                                <div className="flex items-center gap-3">
                                    <div className={`text-${category.color}-600`}>{category.icon}</div>
                                    <h2 className={`text-2xl font-bold text-${category.color}-900`}>{category.title}</h2>
                                    <span className="ml-auto text-sm text-gray-600">{category.endpoints.length} {t('apiDocs.endpoints.count')}</span>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {category.endpoints.map((endpoint, idx) => (
                                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded ${getMethodColor(endpoint.method)}`}>
                                                    {endpoint.method}
                                                </span>
                                                <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                                            </div>
                                            {getAccessBadge(endpoint.access)}
                                        </div>

                                        <p className="text-gray-700 mb-4">{endpoint.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            {endpoint.headers && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{t('apiDocs.endpoints.headers')}:</p>
                                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                        {JSON.stringify(endpoint.headers, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {endpoint.query && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{t('apiDocs.endpoints.queryParameters')}:</p>
                                                    <p className="bg-gray-100 p-3 rounded text-xs">{endpoint.query}</p>
                                                </div>
                                            )}

                                            {endpoint.body && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{t('apiDocs.endpoints.requestBody')}:</p>
                                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                        {typeof endpoint.body === 'string' ? endpoint.body : JSON.stringify(endpoint.body, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {endpoint.response && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{t('apiDocs.endpoints.responseExample')}:</p>
                                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                        {JSON.stringify(endpoint.response, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">{t('apiDocs.auth.title')}</h3>
                    <p className="text-blue-800 mb-4">
                        {t('apiDocs.auth.description')}
                    </p>
                    <pre className="bg-white p-4 rounded text-sm overflow-x-auto border border-blue-200">
                        Authorization: Bearer &lt;your-jwt-token&gt;
                    </pre>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{t('apiDocs.auth.roles.buyer.title')}</p>
                            <p className="text-blue-700 text-xs">{t('apiDocs.auth.roles.buyer.description')}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{t('apiDocs.auth.roles.seller.title')}</p>
                            <p className="text-blue-700 text-xs">{t('apiDocs.auth.roles.seller.description')}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{t('apiDocs.auth.roles.agent.title')}</p>
                            <p className="text-blue-700 text-xs">{t('apiDocs.auth.roles.agent.description')}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{t('apiDocs.auth.roles.admin.title')}</p>
                            <p className="text-blue-700 text-xs">{t('apiDocs.auth.roles.admin.description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestfulDocs;
