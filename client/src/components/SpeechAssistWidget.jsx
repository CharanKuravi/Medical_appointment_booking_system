import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const SpeechAssistWidget = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    if (!recognitionRef.current) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = () => setIsListening(false);
      recognitionInstance.onend = () => setIsListening(false);

      recognitionRef.current = recognitionInstance;
    }

    return () => {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {}
    }
  }, [isListening]);

  const speakText = useCallback(() => {
    if (!userInput.trim()) return;
    const utterance = new SpeechSynthesisUtterance(userInput);
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [userInput]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  if (!isSupported) {
    return (
      <div className="text-red-300 text-sm">
        Speech features not supported in this browser.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Speech to Text */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-white">🎙️ Speak (Live Subtitles)</label>
          <button
            onClick={toggleListening}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            {isListening ? 'Stop' : 'Listen'}
          </button>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl p-3 min-h-[80px] max-h-[120px] overflow-y-auto backdrop-blur-sm">
          {transcript ? (
            <p className="text-sm text-white">{transcript}</p>
          ) : (
            <p className="text-sm text-purple-200 italic">
              {isListening ? 'Listening...' : 'Click "Listen" to start speech recognition'}
            </p>
          )}
        </div>
        {transcript && (
          <button
            onClick={() => setTranscript('')}
            className="text-xs text-teal-300 hover:text-teal-200"
          >
            Clear subtitles
          </button>
        )}
      </div>

      {/* Text to Speech */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white">⌨️ Type to Speak</label>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-purple-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none backdrop-blur-sm"
          rows="3"
        />
        <button
          onClick={isSpeaking ? stopSpeaking : speakText}
          disabled={!userInput.trim() && !isSpeaking}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-teal-500 hover:bg-teal-600 text-white disabled:bg-white/10 disabled:text-purple-200'
          }`}
        >
          {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {isSpeaking ? 'Stop Audio' : '🔊 Play Audio'}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-2">
        <p className="text-xs text-purple-200">
          🔐 Privacy: No data stored. All processing happens in your browser.
        </p>
      </div>
    </div>
  );
};

export default SpeechAssistWidget;
