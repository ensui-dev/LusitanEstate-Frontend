import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authAPI } from '../api/auth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Link de verificacao invalido. Nenhum token fornecido.');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        if (response.success) {
          setStatus('success');
          setMessage('O seu email foi verificado com sucesso!');
        } else {
          setStatus('error');
          setMessage(response.message || 'Erro ao verificar email.');
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Link de verificacao invalido ou expirado.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card rounded-2xl p-8 text-center">
          {status === 'verifying' && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-6">
                <svg className="animate-spin h-8 w-8 text-primary-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                A verificar email...
              </h2>
              <p className="text-gray-600">
                Por favor aguarde enquanto verificamos o seu email.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verificado!
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-gray-600 mb-6">
                A sua conta esta agora ativa. Pode fazer login e comecar a explorar imoveis em Portugal.
              </p>
              <Link
                to="/login"
                className="w-full inline-flex justify-center btn-primary"
              >
                Fazer Login
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Erro na Verificacao
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-gray-600 mb-6">
                O link pode ter expirado (valido por 24 horas) ou ja ter sido utilizado.
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full inline-flex justify-center btn-primary"
                >
                  Tentar fazer login
                </Link>
                <p className="text-sm text-gray-500">
                  Se ainda nao verificou o seu email, pode solicitar um novo link na pagina de login.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
