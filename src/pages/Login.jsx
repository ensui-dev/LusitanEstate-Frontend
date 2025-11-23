import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resending, setResending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Reset verification state when user changes email
    if (e.target.name === 'email' && verificationNeeded) {
      setVerificationNeeded(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail || resending) return;

    setResending(true);
    try {
      const response = await authAPI.resendVerification(unverifiedEmail);
      if (response.success) {
        toast.success('Email de verificacao reenviado! Verifique a sua caixa de entrada.');
      } else {
        toast.error(response.message || 'Erro ao reenviar email');
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao reenviar email');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationNeeded(false);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Login efetuado com sucesso!');
        navigate('/dashboard');
      } else if (result.code === 'EMAIL_NOT_VERIFIED') {
        setVerificationNeeded(true);
        setUnverifiedEmail(result.email || formData.email);
        toast.warning('Por favor verifique o seu email antes de fazer login.');
      } else {
        toast.error(result.message || 'Erro ao fazer login');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Bem-vindo de volta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
            criar uma nova conta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card rounded-2xl p-8">
          {/* Email Verification Warning */}
          {verificationNeeded && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-amber-800">
                    Email nao verificado
                  </h3>
                  <p className="mt-1 text-sm text-amber-700">
                    Verifique o seu email ({unverifiedEmail}) para ativar a sua conta.
                  </p>
                  <button
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-900 underline disabled:opacity-50"
                  >
                    {resending ? 'A enviar...' : 'Reenviar email de verificacao'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Palavra-passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  Esqueceu a palavra-passe?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    A entrar...
                  </span>
                ) : 'Entrar'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Novo no LusitanEstate?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-300 transition-all duration-200"
              >
                Criar uma conta gratuita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
