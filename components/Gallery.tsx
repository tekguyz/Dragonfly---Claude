'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BRAND } from '@/constants/brand';
import { Instagram, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", alt: "Sushi plating", height: "h-64" },
  { src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80", alt: "Tuna roll", height: "h-80" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", alt: "Ribeye steak plate", height: "h-72" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", alt: "Craft cocktail", height: "h-96" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Restaurant interior dark", height: "h-72" },
  { src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80", alt: "Asian appetizer", height: "h-64" },
  { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", alt: "Artisan pizza", height: "h-80" },
  { src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80", alt: "Shrimp dish", height: "h-64" },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section id="gallery" className="bg-background py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="gold-heading text-4xl md:text-5xl mb-4">{t('gallery.heading')}</h2>
          <p className="text-textMuted">
            {t('gallery.subheading')} <a href={BRAND.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@dragonfly_chinandega</a>
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 mb-16">
          {IMAGES.map((img, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div 
                className={`relative w-full rounded-xl overflow-hidden cursor-pointer group break-inside-avoid ${img.height}`}
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col items-center text-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Search size={32} className="mb-2" />
                    <span className="font-semibold tracking-wider uppercase text-sm">View</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="glass-card p-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <Instagram size={48} className="text-accent mb-4" />
          <h3 className="font-display text-2xl text-accent mb-2">@dragonfly_chinandega</h3>
          <a
            href={BRAND.INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-accent text-accent font-bold rounded-xl px-8 py-3 transition-all duration-300 hover:bg-accent hover:text-background"
          >
            {t('gallery.instagram.cta')}
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-accent hover:text-white transition-colors z-50 w-[44px] h-[44px] flex items-center justify-center bg-black/20 md:bg-transparent rounded-full"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>
          
          <button 
            className="absolute bottom-6 left-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-10 text-white/80 hover:text-white transition-colors z-50 w-[60px] h-[60px] flex items-center justify-center bg-black/50 md:bg-transparent rounded-full md:rounded-none"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={36} className="md:w-12 md:h-12" />
          </button>

          <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] mx-0 md:mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={IMAGES[currentIndex].src}
              alt={IMAGES[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button 
            className="absolute bottom-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-10 text-white/80 hover:text-white transition-colors z-50 w-[60px] h-[60px] flex items-center justify-center bg-black/50 md:bg-transparent rounded-full md:rounded-none"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={36} className="md:w-12 md:h-12" />
          </button>

          <div className="absolute bottom-10 md:bottom-8 left-1/2 -translate-x-1/2 text-textMuted font-body tracking-widest z-50 pointer-events-none">
            {currentIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
