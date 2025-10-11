
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Contact: React.FC = () => {
    const { t } = useTranslations();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSubmitResult(null); // Clear result on new input
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        const formAction = 'https://formspree.io/f/xgegrvya'; 

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setSubmitResult({ status: 'success', message: t('contactSuccessAlert', { name: formData.name }) });
                setFormData({ name: '', email: '', message: '' });
            } else {
                const data = await response.json();
                const errorMessage = data.errors?.map((err: { message: string }) => err.message).join(', ') || t('contactGenericError');
                setSubmitResult({ status: 'error', message: errorMessage });
            }
        } catch (error) {
            setSubmitResult({ status: 'error', message: t('contactNetworkError') });
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-white rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contactOfficeAddress')}</h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>{t('companyName')} ({t('rlNumberShort')})</strong><br />
              {t('contactAddress')}
            </p>

            <div className="space-y-4">
              <p className="flex items-center text-lg text-gray-700">
                <span className="bg-sky-100 p-2 rounded-full ltr:mr-3 rtl:ml-3 text-sky-700">📞</span>
                <strong>{t('contactPhone')}:</strong> <span dir="ltr">{t('contactPhoneNumber')}</span>
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <span className="bg-sky-100 p-2 rounded-full ltr:mr-3 rtl:ml-3 text-sky-700">📱</span>
                <strong>{t('contactHotline')}:</strong> <span dir="ltr">{t('contactHotlineNumber')}</span>
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <span className="bg-sky-100 p-2 rounded-full ltr:mr-3 rtl:ml-3 text-sky-700">📧</span>
                <strong>{t('contactEmail')}:</strong> progressmm2009@gmail.com
              </p>
            </div>
          </div>

          <div className="p-8 bg-sky-50 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contactTalkToUs')}</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('formPlaceholderName')}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('formPlaceholderEmail')}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                required
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contactMessagePlaceholder')}
                rows={4} 
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                required
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? t('contactSendingButton') : t('contactSendButton')}
              </button>
               {submitResult && (
                <p className={`mt-4 text-center font-medium ${submitResult.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {submitResult.message}
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-16">
            <h3 className="text-3xl font-bold text-sky-900 mb-6 text-center">{t('contactMapTitle')}</h3>
            <div className="overflow-hidden rounded-xl shadow-2xl border-4 border-white">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.327618953112!2d90.4121698759365!3d23.73563918459618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b88933333333%3A0x3348197dca707839!2sProgress%20M.M.%20International%20Ltd.!5e0!3m2!1sen!2sbd!4v1720216738913!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('contactMapTitle')}
                ></iframe>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
