
import React, { useState, useEffect, useRef } from 'react';
import { Job } from '../types';
import { useTranslations } from '../hooks/useTranslations';

const LOCAL_STORAGE_KEY = 'jobApplicationFormData';

interface FormData {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
    message: string;
    resumeFileName: string;
}

interface JobApplicationFormProps {
    jobs: Job[];
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobs }) => {
    const { t, locale } = useTranslations();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        message: '',
        resumeFileName: '',
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                setFormData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error("Failed to parse form data from localStorage", error);
        }
    }, []);

    // Save data to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
        } catch (error) {
            console.error("Failed to save form data to localStorage", error);
        }
    }, [formData]);
    
    // Warn user before leaving page with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const hasUnsavedChanges = Object.values(formData).some(value => value !== '') || resumeFile !== null;

            if (hasUnsavedChanges) {
                // This will trigger the browser's native confirmation dialog.
                e.preventDefault();
                e.returnValue = ''; // Required for compatibility with modern browsers.
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formData, resumeFile]);


    const validate = (): boolean => {
        const { name, email, phone, jobTitle } = formData;
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!name.trim()) newErrors.name = t('errorFullNameRequired');

        if (!email.trim()) {
            newErrors.email = t('errorEmailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('errorEmailInvalid');
        }

        if (!phone.trim()) {
            newErrors.phone = t('errorPhoneRequired');
        } else if (!/^\+?[0-9\s-()]{10,15}$/.test(phone)) {
            newErrors.phone = t('errorPhoneInvalid');
        }

        if (!jobTitle) newErrors.jobTitle = t('errorJobTitleRequired');

        if (!resumeFile && !formData.resumeFileName) {
            newErrors.resumeFileName = t('errorResumeRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                alert(t('errorFileSize'));
                return;
            }
            setResumeFile(file);
            setFormData(prev => ({ ...prev, resumeFileName: file.name }));
            if (errors.resumeFileName) {
                setErrors(prev => ({ ...prev, resumeFileName: undefined }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (validate()) {
            const isConfirmed = window.confirm(t('formConfirmSubmit'));
            if (isConfirmed) {
                alert(t('formSuccessAlert', { name: formData.name, job: formData.jobTitle }));
                console.log('Application Submitted:', formData);
                console.log('Resume File:', resumeFile?.name);
                
                const clearedForm: FormData = { name: '', email: '', phone: '', jobTitle: '', message: '', resumeFileName: '' };
                setFormData(clearedForm);
                setResumeFile(null);
                setErrors({});
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
    };

    return (
        <section id="application" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-sky-900 mb-10 text-center">{t('formTitle')}</h2>
                <div className="p-8 bg-sky-50 rounded-xl shadow-2xl border-t-4 border-yellow-500">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelName')} <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('formPlaceholderName')}
                                className={`w-full p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                required
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelEmail')} <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('formPlaceholderEmail')}
                                    className={`w-full p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelPhone')} <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('formPlaceholderPhone')}
                                    className={`w-full p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                />
                                {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="jobTitle" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelJob')} <span className="text-red-500">*</span></label>
                            <select
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
                                required
                                aria-required="true"
                                aria-invalid={!!errors.jobTitle}
                                aria-describedby={errors.jobTitle ? "job-error" : undefined}
                            >
                                <option value="" disabled>{t('formSelectJob')}</option>
                                {jobs.map((job: Job, index) => {
                                    const jobLabel = job.company 
                                        ? `${job.role[locale]} (${job.company[locale]}) - ${job.destination[locale]}`
                                        : `${job.role[locale]} - ${job.destination[locale]}`;
                                    return (
                                        <option key={index} value={jobLabel}>
                                            {jobLabel}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.jobTitle && <p id="job-error" className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="resume" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelResume')} <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                aria-label={t('formAriaUploadResume')}
                            />
                            <div className="flex items-center space-x-4">
                               <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`px-6 py-3 bg-white border rounded-lg text-gray-800 font-semibold hover:bg-gray-100 transition duration-300 ${errors.resumeFileName ? 'border-red-500' : 'border-gray-400'}`}
                                    aria-describedby={errors.resumeFileName ? "resume-error" : undefined}
                                >
                                    {t('formSelectFile')}
                                </button>
                                <span className="text-gray-600 truncate" aria-live="polite">
                                    {resumeFile ? resumeFile.name : formData.resumeFileName ? `${formData.resumeFileName} (${t('formReselectFile')})` : t('formNoFileSelected')}
                                </span>
                            </div>
                            {errors.resumeFileName && <p id="resume-error" className="text-red-500 text-sm mt-1">{errors.resumeFileName}</p>}
                             <p className="text-sm text-gray-500 mt-2">{t('formMaxFileSize')}</p>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">{t('formLabelMessage')}</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('formPlaceholderMessage')}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                            ></textarea>
                        </div>
                        
                        <div>
                            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition duration-300 shadow-md text-lg">
                                {t('formSubmitButton')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default JobApplicationForm;