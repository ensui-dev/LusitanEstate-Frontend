import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { propertiesAPI } from '../api/properties';
import { toast } from 'react-toastify';
import { PROPERTY_TYPES, PROPERTY_STATUS, ENERGY_RATINGS, PROPERTY_FEATURES } from '../utils/constants';
import { PORTUGUESE_DISTRICTS } from '../utils/districts';
import { FaHome, FaMapMarkerAlt, FaInfoCircle, FaImage, FaCheckCircle } from 'react-icons/fa';
import ImageUpload from '../components/common/ImageUpload';

const AddProperty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    price: '',
    propertyType: '',
    status: 'for-sale',

    // Address
    address: {
      street: '',
      city: '',
      district: '',
      zipCode: '',
      country: 'Portugal'
    },

    // Details
    bedrooms: '',
    bathrooms: '',
    squareMeters: '',
    yearBuilt: '',
    parkingSpaces: '0',
    hasGarage: false,
    condition: 'good',
    condominiumFee: '0',

    // Energy Certificate
    energyCertificate: {
      rating: 'Pendente'
    },

    // Features
    features: [],

    // Images
    images: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name.startsWith('energyCertificate.')) {
      const certField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        energyCertificate: {
          ...prev.energyCertificate,
          [certField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImagesChange = (newImages) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.title || !formData.description || !formData.price || !formData.propertyType) {
          toast.error(t('addProperty.validation.fillRequired'));
          return false;
        }
        break;
      case 2:
        if (!formData.address.street || !formData.address.city || !formData.address.district || !formData.address.zipCode) {
          toast.error(t('addProperty.validation.fillRequired'));
          return false;
        }
        if (!/^\d{4}-\d{3}$/.test(formData.address.zipCode)) {
          toast.error(t('addProperty.validation.invalidZipCode'));
          return false;
        }
        break;
      case 3:
        if (!formData.squareMeters) {
          toast.error(t('addProperty.validation.fillRequired'));
          return false;
        }
        break;
      case 5:
        if (!formData.images || formData.images.length === 0) {
          toast.error(t('addProperty.validation.minImages'));
          return false;
        }
        // Verify all images have valid URLs
        const validImages = formData.images.filter(img => img.url && img.url.trim() !== '');
        if (validImages.length === 0) {
          toast.error(t('addProperty.validation.minImages'));
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleKeyDown = (e) => {
    // Prevent Enter key from submitting form on ALL steps
    // Form should only be submitted by clicking the "Criar Imóvel" button
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      // Only auto-advance on steps 1-4
      if (currentStep < 5) {
        nextStep();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow submission on the final step (step 5)
    if (currentStep !== 5) {
      nextStep(); // If not on final step, just go to next step
      return;
    }

    // Validate step 5 (images)
    if (!validateStep(currentStep)) return;

    try {
      setLoading(true);

      // Clean up data
      const cleanedData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        squareMeters: Number(formData.squareMeters),
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
        parkingSpaces: Number(formData.parkingSpaces),
        condominiumFee: Number(formData.condominiumFee),
        images: formData.images.filter(img => img.url)
      };

      const response = await propertiesAPI.createProperty(cleanedData);

      if (response.success) {
        toast.success(t('addProperty.success'));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error(error.message || t('addProperty.error'));
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: t('addProperty.steps.basic'), icon: FaInfoCircle },
    { number: 2, title: t('addProperty.steps.location'), icon: FaMapMarkerAlt },
    { number: 3, title: t('addProperty.steps.details'), icon: FaHome },
    { number: 4, title: t('addProperty.steps.features'), icon: FaCheckCircle },
    { number: 5, title: t('addProperty.steps.images'), icon: FaImage }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('addProperty.title')}
          </h1>
          <p className="text-gray-600">
            {t('addProperty.steps.basic')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 text-center hidden md:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-200">
                    <div
                      className={`h-full ${
                        currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="bg-white rounded-lg shadow-sm p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('addProperty.steps.basic')}</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addProperty.basicInfo.title')} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder={t('addProperty.basicInfo.titlePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addProperty.basicInfo.description')} *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="input w-full"
                  placeholder={t('addProperty.basicInfo.descriptionPlaceholder')}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.basicInfo.price')} (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder={t('addProperty.basicInfo.pricePlaceholder')}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.basicInfo.propertyType')} *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    <option value="">{t('addProperty.basicInfo.selectType')}</option>
                    {PROPERTY_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.basicInfo.status')}
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="for-sale">{t('property.status.forSale')}</option>
                    <option value="for-rent">{t('property.status.forRent')}</option>
                    <option value="draft">{t('property.status.draft')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.condition')}
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="new">{t('property.condition.new')}</option>
                    <option value="excellent">{t('property.condition.excellent')}</option>
                    <option value="good">{t('property.condition.good')}</option>
                    <option value="fair">{t('property.condition.fair')}</option>
                    <option value="needs-renovation">{t('property.condition.needsRenovation')}</option>
                    <option value="under-construction">{t('property.condition.underConstruction')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('addProperty.steps.location')}</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addProperty.location.street')} *
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder={t('addProperty.location.streetPlaceholder')}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.location.city')} *
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder={t('addProperty.location.cityPlaceholder')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.location.district')} *
                  </label>
                  <select
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    <option value="">{t('addProperty.location.selectDistrict')}</option>
                    {PORTUGUESE_DISTRICTS.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.location.zipCode')} *
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder={t('addProperty.location.zipCodePlaceholder')}
                    pattern="\d{4}-\d{3}"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{t('addProperty.validation.invalidZipCode')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.location.country')}
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="input w-full"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('addProperty.steps.details')}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.bedrooms')}
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="input w-full"
                    min="0"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.bathrooms')}
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="input w-full"
                    min="0"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.squareMeters')} *
                  </label>
                  <input
                    type="number"
                    name="squareMeters"
                    value={formData.squareMeters}
                    onChange={handleChange}
                    className="input w-full"
                    min="0"
                    placeholder="85"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.yearBuilt')}
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    className="input w-full"
                    min="1800"
                    max={new Date().getFullYear() + 1}
                    placeholder={t('addProperty.details.yearBuiltPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.parkingSpaces')}
                  </label>
                  <input
                    type="number"
                    name="parkingSpaces"
                    value={formData.parkingSpaces}
                    onChange={handleChange}
                    className="input w-full"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.energyRating')}
                  </label>
                  <select
                    name="energyCertificate.rating"
                    value={formData.energyCertificate.rating}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    {ENERGY_RATINGS.map(rating => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addProperty.details.condominiumFee')}
                  </label>
                  <input
                    type="number"
                    name="condominiumFee"
                    value={formData.condominiumFee}
                    onChange={handleChange}
                    className="input w-full"
                    min="0"
                    placeholder="50"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasGarage"
                    checked={formData.hasGarage}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    {t('addProperty.details.hasGarage')}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Features */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('addProperty.steps.features')}</h2>
              <p className="text-gray-600">{t('addProperty.features.description')}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PROPERTY_FEATURES.map(feature => (
                  <label
                    key={feature.value}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature.value)}
                      onChange={() => handleFeatureToggle(feature.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Images */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('addProperty.images.title')} *</h2>
                <p className="text-gray-600 mb-6">
                  {t('addProperty.images.description')}
                </p>
              </div>

              <ImageUpload
                images={formData.images}
                onChange={handleImagesChange}
                maxImages={10}
              />

              {formData.images.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ {t('addProperty.images.minImages')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                {t('addProperty.buttons.previous')}
              </button>
            )}

            <div className="ml-auto flex gap-4">
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  {t('addProperty.buttons.next')}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || formData.images.length === 0}
                  className={`btn-primary ${formData.images.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={formData.images.length === 0 ? t('addProperty.images.minImages') : ''}
                >
                  {loading ? t('addProperty.buttons.submitting') : t('addProperty.buttons.submit')}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
