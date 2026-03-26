'use client';

import { useState } from 'react';
import { BRAND } from '@/constants/brand';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import MapEmbed from './MapEmbed';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setIsSuccess(true);
    } catch (err) {
      setError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, oklch(74% 0.14 80 / 4%) 0%, oklch(4% 0 0) 60%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Info */}
        <RevealOnScroll delay={100}>
          <div>
            <h2 className="gold-heading text-4xl md:text-5xl mb-6">{t('contact.heading')}</h2>
            <div className="w-12 h-[2px] bg-accent mb-10" />

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <div className="text-textMuted text-sm mb-1">{t('contact.label.location')}</div>
                  <div className="text-white font-bold">{BRAND.LOCATION}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <div className="text-textMuted text-sm mb-1">{t('contact.label.phone')}</div>
                  <a href={`tel:${BRAND.PHONE_PRIMARY.replace(/\s+/g, '')}`} className="text-white font-bold hover:text-primary transition-colors">
                    {BRAND.PHONE_PRIMARY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <div className="text-textMuted text-sm mb-1">{t('contact.label.secondary')}</div>
                  <a href={`tel:${BRAND.PHONE_SECONDARY.replace(/\s+/g, '')}`} className="text-white font-bold hover:text-primary transition-colors">
                    {BRAND.PHONE_SECONDARY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <div className="text-textMuted text-sm mb-1">{t('contact.label.email')}</div>
                  <a href={`mailto:${BRAND.EMAIL}`} className="text-white font-bold hover:text-primary transition-colors break-all">
                    {BRAND.EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <div className="text-textMuted text-sm mb-1">{t('contact.label.hours')}</div>
                  <div className="text-white font-bold">{BRAND.HOURS_DISPLAY}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mb-12">
              <a href={BRAND.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-primary transition-colors">
                <Instagram size={28} />
              </a>
              <a href={BRAND.FACEBOOK_URL} className="text-textMuted hover:text-primary transition-colors">
                <Facebook size={28} />
              </a>
            </div>

            <MapEmbed />
          </div>
        </RevealOnScroll>

        {/* Right Column: Form */}
        <RevealOnScroll delay={300}>
          <div>
            <h2 className="section-heading mb-4">{t('contact.form.heading')}</h2>
            <p className="text-textMuted mb-10">
              {t('contact.form.subheading')}
            </p>

            {isSuccess ? (
              <div className="teal-border-card p-10 text-center flex flex-col items-center">
                <CheckCircle2 size={64} className="text-primary mb-6" />
                <h3 className="gold-heading text-3xl mb-4">{t('contact.form.success.heading')}</h3>
                <p className="text-textMuted mb-8">
                  {t('contact.form.success.body')}
                </p>
                <a
                  href={BRAND.WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4"
                >
                  {t('contact.form.success.whatsapp')}
                </a>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className={`glass-card ${error ? 'border-red-500/50' : ''} p-6 md:p-8 space-y-6`}
                data-netlify="true"
                name="dragonfly-contact"
              >
                <input type="hidden" name="form-name" value="dragonfly-contact" />
                <p className="hidden">
                  <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" aria-hidden="true" /></label>
                </p>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-textMuted mb-2">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 min-h-[48px] text-white input-focus"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textMuted mb-2">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 min-h-[48px] text-white input-focus"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-textMuted mb-2">{t('contact.form.phone')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 min-h-[48px] text-white input-focus"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-textMuted mb-2">{t('contact.form.inquiryType')}</label>
                  <select 
                    id="type" 
                    name="type" 
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 min-h-[48px] text-white input-focus"
                  >
                    <option value="General Question">{t('contact.form.inquiry.general')}</option>
                    <option value="Reservation">{t('contact.form.inquiry.reservation')}</option>
                    <option value="Private Event">{t('contact.form.inquiry.event')}</option>
                    <option value="Menu Information">{t('contact.form.inquiry.menu')}</option>
                    <option value="Other">{t('contact.form.inquiry.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-textMuted mb-2">{t('contact.form.message')}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white input-focus resize-none"
                  ></textarea>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.submitting')}
                    </>
                  ) : t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
