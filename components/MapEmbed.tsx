'use client';

export default function MapEmbed() {
  return (
    <div className="w-full h-[450px] overflow-hidden rounded-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.2689309457296!2d-87.12298421585909!3d12.630354390453522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f70f10a089b2103%3A0x7567ff3d3ca1e0c3!2sDragonfly!5e0!3m2!1sen!2sus!4v1774503178889!5m2!1sen!2sus" 
        width="600" 
        height="450" 
        style={{ border: 0, width: '100%', height: '100%' }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
