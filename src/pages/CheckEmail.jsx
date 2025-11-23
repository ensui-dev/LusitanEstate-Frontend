import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { toast } from 'react-toastify';

const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleResendVerification = async () => {
    if (!email || resendCooldown > 0) return;

    setResending(true);
    try {
      const response = await authAPI.resendVerification(email);
      if (response.success) {
        toast.success('Email de verificacao reenviado!');
        // Start 60 second cooldown
        setResendCooldown(60);
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(response.message || 'Erro ao reenviar email');
      }
    } catch (error) {
      toast.error(error.message || 'Erro ao reenviar email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card rounded-2xl p-8 text-center">
          {/* Email Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 mb-6">
            <svg className="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifique o seu email
          </h2>

          <p className="text-gray-600 mb-4">
            Enviamos um link de verificacao para:
          </p>

          {email && (
            <p className="text-primary-600 font-medium text-lg mb-6">
              {email}
            </p>
          )}

          <div className="bg-sand-100 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-medium text-gray-900 mb-2">Proximos passos:</h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Abra o seu email</li>
              <li>Clique no link "Verificar Email"</li>
              <li>Faca login na sua conta</li>
            </ol>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            O link expira em 24 horas. Se nao recebeu o email, verifique a pasta de spam.
          </p>

          {/* Resend Button */}
          {email && (
            <button
              onClick={handleResendVerification}
              disabled={resending || resendCooldown > 0}
              className="w-full mb-4 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  A enviar...
                </span>
              ) : resendCooldown > 0 ? (
                `Reenviar em ${resendCooldown}s`
              ) : (
                'Reenviar email de verificacao'
              )}
            </button>
          )}

          <Link
            to="/login"
            className="w-full inline-flex justify-center btn-primary"
          >
            Ir para Login
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Email errado?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
              Registar novamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
