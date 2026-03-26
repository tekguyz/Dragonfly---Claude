'use client';

export default function MapEmbed() {
  return (
    <div className="teal-border-card w-full h-64 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Placeholder for actual iframe */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center opacity-10" />
      <div className="relative z-10">
        <div className="text-3xl mb-2">📍</div>
        <h4 className="text-white font-bold mb-1">Plaza Farallones, Modulo #3</h4>
        <p className="text-textMuted text-sm mb-4">Chinandega, Nicaragua</p>
        <a 
          href="https://www.google.com/maps/search/Plaza+Farallones+Chinandega+Nicaragua" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary px-4 py-2 text-sm"
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
}
