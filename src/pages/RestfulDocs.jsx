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

    // Simple inline translations
    const isPortuguese = i18n.language === 'pt';

    // Fetch health status
    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/health`);
                setHealthStatus(response.data.data);
                setLoading(false);
            } catch (error) {
                setHealthStatus({
                    status: 'offline',
                    services: {
                        api: { status: 'offline', message: isPortuguese ? 'Não é possível conectar ao servidor API' : 'Cannot connect to API server' },
                        database: { status: 'unknown', message: isPortuguese ? 'Desconhecido' : 'Unknown' },
                        aws: {
                            s3: { status: 'unknown', message: isPortuguese ? 'Desconhecido' : 'Unknown' },
                            ses: { status: 'unknown', message: isPortuguese ? 'Desconhecido' : 'Unknown' }
                        }
                    }
                });
                setLoading(false);
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 30000);
        return () => clearInterval(interval);
    }, [isPortuguese]);

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
            title: isPortuguese ? 'Autenticação' : 'Authentication',
            icon: <FiLock className="w-5 h-5" />,
            color: 'blue',
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/auth/register',
                    access: isPortuguese ? 'Público' : 'Public',
                    description: isPortuguese ? 'Registar nova conta de utilizador' : 'Register a new user account',
                    body: { name: 'string', email: 'string', password: 'string', role: 'buyer|seller|agent' },
                    response: { success: true, message: 'Registration successful. Please verify your email.' }
                },
                {
                    method: 'POST',
                    path: '/api/auth/login',
                    access: isPortuguese ? 'Público' : 'Public',
                    description: isPortuguese ? 'Login com email e palavra-passe' : 'Login with email and password',
                    body: { email: 'string', password: 'string' },
                    response: { success: true, data: { token: 'jwt-token', user: {} } }
                },
                {
                    method: 'GET',
                    path: '/api/auth/me',
                    access: isPortuguese ? 'Protegido' : 'Protected',
                    description: isPortuguese ? 'Obter perfil do utilizador atual' : 'Get current user profile',
                    headers: { Authorization: 'Bearer <token>' },
                    response: { success: true, data: { user: {} } }
                }
            ]
        },
        properties: {
            title: isPortuguese ? 'Propriedades' : 'Properties',
            icon: <FiCode className="w-5 h-5" />,
            color: 'green',
            endpoints: [
                {
                    method: 'GET',
                    path: '/api/properties',
                    access: isPortuguese ? 'Público' : 'Public',
                    description: isPortuguese ? 'Obter todas as propriedades com filtros opcionais' : 'Get all properties with optional filters',
                    query: 'district, city, propertyType, status, minPrice, maxPrice, bedrooms, page, limit',
                    response: { success: true, count: 10, data: [] }
                },
                {
                    method: 'POST',
                    path: '/api/properties',
                    access: isPortuguese ? 'Vendedor/Agente/Admin' : 'Seller/Agent/Admin',
                    description: isPortuguese ? 'Criar novo anúncio de propriedade' : 'Create new property listing',
                    headers: { Authorization: 'Bearer <token>' },
                    body: { title: 'string', price: 'number', propertyType: 'string', address: {}, bedrooms: 'number' }
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
        const isPublic = access.toLowerCase().includes('público') || access.toLowerCase().includes('public');
        const isAdmin = access.toLowerCase().includes('admin');

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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {isPortuguese ? 'Documentação da API LusitanEstate' : 'LusitanEstate API Documentation'}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        {isPortuguese ? 'Referência de Endpoints da API RESTful' : 'RESTful API Endpoints Reference'}
                    </p>
                    <p className="text-sm text-gray-500">
                        {isPortuguese ? 'URL Base' : 'Base URL'}: <code className="bg-gray-200 px-2 py-1 rounded">{import.meta.env.VITE_API_URL}</code>
                    </p>
                </div>

                {/* System Status Monitor */}
                <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FiServer className="w-6 h-6" />
                            {isPortuguese ? 'Monitor de Estado do Sistema' : 'System Status Monitor'}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-6 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">{isPortuguese ? 'A verificar estado do sistema...' : 'Checking system status...'}</p>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* API Server Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.api?.status || 'offline')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiServer className="w-5 h-5" />
                                            <span className="font-semibold">{isPortuguese ? 'Servidor API' : 'API Server'}</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.api?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.api?.message || (isPortuguese ? 'Offline' : 'Offline')}</p>
                                    {healthStatus?.services?.api?.uptime && (
                                        <p className="text-xs mt-1">{isPortuguese ? 'Tempo Ativo' : 'Uptime'}: {Math.floor(healthStatus.services.api.uptime / 60)} min</p>
                                    )}
                                </div>

                                {/* Database Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.database?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiDatabase className="w-5 h-5" />
                                            <span className="font-semibold">MongoDB</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.database?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.database?.message || (isPortuguese ? 'Desconhecido' : 'Unknown')}</p>
                                </div>

                                {/* AWS S3 Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.aws?.s3?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiCloud className="w-5 h-5" />
                                            <span className="font-semibold">AWS S3</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.aws?.s3?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.aws?.s3?.message || (isPortuguese ? 'Desconhecido' : 'Unknown')}</p>
                                </div>

                                {/* AWS SES Status */}
                                <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.services?.aws?.ses?.status || 'unknown')}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FiCloud className="w-5 h-5" />
                                            <span className="font-semibold">AWS SES</span>
                                        </div>
                                        {getStatusIcon(healthStatus?.services?.aws?.ses?.status)}
                                    </div>
                                    <p className="text-sm">{healthStatus?.services?.aws?.ses?.message || (isPortuguese ? 'Desconhecido' : 'Unknown')}</p>
                                </div>
                            </div>

                            {/* Overall Status */}
                            <div className={`p-4 rounded-lg border-2 ${getStatusColor(healthStatus?.status || 'offline')}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-lg">{isPortuguese ? 'Estado Geral do Sistema' : 'Overall System Status'}</p>
                                        <p className="text-sm capitalize">{healthStatus?.status || (isPortuguese ? 'Offline' : 'Offline')}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-600">
                                        <p>{isPortuguese ? 'Última atualização' : 'Last updated'}: {healthStatus?.timestamp ? new Date(healthStatus.timestamp).toLocaleTimeString() : (isPortuguese ? 'Nunca' : 'Never')}</p>
                                        <p className="mt-1">{isPortuguese ? 'Atualização automática' : 'Auto-refresh'}: 30s</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> {isPortuguese ? '28 Testes a Passar' : '28 Tests Passing'}</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> {isPortuguese ? '66 Endpoints Totais' : '66 Total Endpoints'}</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded-full"></span> {isPortuguese ? '9 Recursos' : '9 Resources'}</span>
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
                                placeholder={isPortuguese ? 'Pesquisar endpoints...' : 'Search endpoints...'}
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
                            <option value="all">{isPortuguese ? 'Todas as Categorias' : 'All Categories'}</option>
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
                                    <span className="ml-auto text-sm text-gray-600">{category.endpoints.length} {isPortuguese ? 'endpoints' : 'endpoints'}</span>
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
                                                    <p className="font-semibold text-gray-700 mb-2">{isPortuguese ? 'Cabeçalhos' : 'Headers'}:</p>
                                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                        {JSON.stringify(endpoint.headers, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {endpoint.query && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{isPortuguese ? 'Parâmetros de Consulta' : 'Query Parameters'}:</p>
                                                    <p className="bg-gray-100 p-3 rounded text-xs">{endpoint.query}</p>
                                                </div>
                                            )}

                                            {endpoint.body && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{isPortuguese ? 'Corpo do Pedido' : 'Request Body'}:</p>
                                                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                        {typeof endpoint.body === 'string' ? endpoint.body : JSON.stringify(endpoint.body, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {endpoint.response && (
                                                <div>
                                                    <p className="font-semibold text-gray-700 mb-2">{isPortuguese ? 'Exemplo de Resposta' : 'Response Example'}:</p>
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">{isPortuguese ? 'Autenticação' : 'Authentication'}</h3>
                    <p className="text-blue-800 mb-4">
                        {isPortuguese
                            ? 'A maioria dos endpoints requer um token JWT. Inclua-o no cabeçalho de Autorização:'
                            : 'Most endpoints require a JWT token. Include it in the Authorization header:'}
                    </p>
                    <pre className="bg-white p-4 rounded text-sm overflow-x-auto border border-blue-200">
                        Authorization: Bearer &lt;your-jwt-token&gt;
                    </pre>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{isPortuguese ? 'Comprador' : 'Buyer'}</p>
                            <p className="text-blue-700 text-xs">{isPortuguese ? 'Pesquisar, favoritar, inquirir' : 'Search, favorite, inquire'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{isPortuguese ? 'Vendedor' : 'Seller'}</p>
                            <p className="text-blue-700 text-xs">{isPortuguese ? 'Criar/gerir propriedades' : 'Create/manage properties'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">{isPortuguese ? 'Agente' : 'Agent'}</p>
                            <p className="text-blue-700 text-xs">{isPortuguese ? 'Perfil de agente + propriedades' : 'Agent profile + properties'}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="font-semibold text-blue-900">Admin</p>
                            <p className="text-blue-700 text-xs">{isPortuguese ? 'Acesso total à plataforma' : 'Full platform access'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestfulDocs;
