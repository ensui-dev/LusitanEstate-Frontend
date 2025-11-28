import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { useTranslation } from 'react-i18next';

const VerifyEmail = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage(t('verifyEmail.invalidToken'));
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        if (response.success) {
          setStatus('success');
          setMessage(t('verifyEmail.success'));
        } else {
          setStatus('error');
          setMessage(response.message || t('verifyEmail.error'));
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.message || t('verifyEmail.invalidToken'));
      }
    };

    verifyEmail();
  }, [searchParams, t]);

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
                {t('verifyEmail.verifying')}
              </h2>
              <p className="text-gray-600">
                {t('common.loading')}
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
                {message}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('verifyEmail.welcomeMessage')}
              </p>
              <Link
                to="/login"
                className="w-full inline-flex justify-center btn-primary"
              >
                {t('verifyEmail.goToLogin')}
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
                {t('verifyEmail.error')}
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-gray-600 mb-6">
                {t('verifyEmail.tryAgain')}
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full inline-flex justify-center btn-primary"
                >
                  {t('verifyEmail.goToLogin')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
