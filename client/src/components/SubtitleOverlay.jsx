import { useEffect, useState } from 'react';

const SubtitleOverlay = ({ subtitles }) => {
  const [displayedSubtitles, setDisplayedSubtitles] = useState([]);

  useEffect(() => {
    if (subtitles && subtitles.length > 0) {
      const latest = subtitles[subtitles.length - 1];
      const newSubtitle = {
        id: Date.now(),
        text: latest,
        timestamp: Date.now()
      };
      
      setDisplayedSubtitles(prev => [...prev, newSubtitle]);

      // Remove subtitle after 5 seconds
      setTimeout(() => {
        setDisplayedSubtitles(prev => prev.filter(sub => sub.id !== newSubtitle.id));
      }, 5000);
    }
  }, [subtitles]);

  if (displayedSubtitles.length === 0) return null;

  return (
    <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-2 px-6 pointer-events-none">
      {displayedSubtitles.map((subtitle, index) => (
        <div
          key={subtitle.id}
          className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl max-w-4xl animate-fade-in"
          style={{
            animation: `fadeIn 0.3s ease-in, ${index === displayedSubtitles.length - 1 ? '' : 'fadeOut 0.5s ease-out 4.5s forwards'}`
          }}
        >
          <p className="text-white text-xl font-medium text-center leading-relaxed">
            {subtitle.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SubtitleOverlay;
