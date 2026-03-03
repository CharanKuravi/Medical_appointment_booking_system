import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Phone, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useWebRTC from '../hooks/useWebRTC';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useSignLanguage from '../hooks/useSignLanguage';
import SubtitleOverlay from './SubtitleOverlay';

const VideoCallModal = ({ onClose, onCallStatusChange }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null); // 'sign' or 'voice'
  const [roomId, setRoomId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [copied, setCopied] = useState(false);
  const [remoteSubtitles] = useState([]);
  const [localTranslation, setLocalTranslation] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callTimerRef = useRef(null);

  // WebRTC hook
  const {
    localStream,
    remoteStream,
    isConnected,
    error: webrtcError,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    sendData
  } = useWebRTC(roomId);

  // Speech recognition hook (for voice users)
  const {
    transcript: speechTranscript,
    isListening,
    error: speechError,
    startListening,
    stopListening
  } = useSpeechRecognition();

  // Sign language detection hook (for sign language users)
  const {
    detectedSign: signText,
    isDetecting,
    error: signError,
    startDetection,
    stopDetection
  } = useSignLanguage(localVideoRef);

  // Generate random room ID on mount
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 10);
    setRoomId(randomId);
  }, []);

  // Set up video streams
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Call timer
  useEffect(() => {
    if (isConnected) {
      onCallStatusChange(true);
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      onCallStatusChange(false);
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isConnected]);

  // Send speech transcript to remote peer
  useEffect(() => {
    if (speechTranscript && isConnected && role === 'voice') {
      sendData({ type: 'speech-transcript', text: speechTranscript });
    }
  }, [speechTranscript, isConnected, role]);

  // Send sign language translation to remote peer
  useEffect(() => {
    if (signText && isConnected && role === 'sign') {
      setLocalTranslation(signText);
      sendData({ type: 'sign-translation', text: signText });
      
      // Convert to speech for remote user
      try {
        const utterance = new SpeechSynthesisUtterance(signText);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Speech synthesis error:', err);
      }
    }
  }, [signText, isConnected, role]);

  // Handle incoming data from remote peer
  useEffect(() => {
    // This would be set up in the WebRTC hook's data channel
    // For now, simulating with a placeholder
  }, []);

  const handleJoinRoom = async () => {
    if (!role) {
      alert('Please select your communication mode');
      return;
    }
    
    if (!user) {
      alert('Please login to use Live Assistant');
      onClose();
      return;
    }
    
    try {
      await joinRoom(user.id, role);
      setIsJoined(true);
      
      // Start appropriate detection based on role
      if (role === 'voice') {
        startListening();
      } else if (role === 'sign') {
        startDetection();
      }
    } catch (err) {
      console.error('Failed to join room:', err);
    }
  };

  const handleEndCall = () => {
    stopListening();
    stopDetection();
    leaveRoom();
    onClose();
  };

  const handleToggleMute = () => {
    toggleAudio();
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    toggleVideo();
    setIsVideoOff(!isVideoOff);
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center">
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/20 flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-bold text-lg">Live Assist Call</h2>
            {isConnected && (
              <span className="text-green-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Connected • {formatTime(callDuration)}
              </span>
            )}
          </div>
          <button
            onClick={handleEndCall}
            className="p-2 rounded-full bg-white/10 hover:bg-red-500 text-white transition-all hover:scale-110"
            aria-label="Close Live Assistant"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {!isJoined ? (
          /* Role Selection Screen */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Communication Mode</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => setRole('sign')}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    role === 'sign'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-6xl mb-4">🤟</div>
                  <h4 className="text-xl font-bold text-white mb-2">Sign Language</h4>
                  <p className="text-purple-200 text-sm">I will use sign language to communicate</p>
                </button>

                <button
                  onClick={() => setRole('voice')}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    role === 'voice'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-6xl mb-4">🎤</div>
                  <h4 className="text-xl font-bold text-white mb-2">Voice</h4>
                  <p className="text-blue-200 text-sm">I will use my voice to communicate</p>
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-white text-sm mb-2">Room ID:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-purple-300 font-mono">
                    {roomId}
                  </code>
                  <button
                    onClick={copyRoomLink}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleJoinRoom}
                disabled={!role}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Call
              </button>

              {(webrtcError || speechError || signError) && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                  {webrtcError || speechError || signError}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Call Screen */
          <div className="flex-1 flex relative">
            {/* Main Video Area */}
            <div className="flex-1 relative bg-black">
              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {!remoteStream && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video size={40} className="text-white/50" />
                    </div>
                    <p className="text-white/70">Waiting for other user...</p>
                  </div>
                </div>
              )}

              {/* Subtitle Overlay for Remote Speech */}
              {role === 'sign' && remoteSubtitles.length > 0 && (
                <SubtitleOverlay subtitles={remoteSubtitles} />
              )}

              {/* Local Video (Picture-in-Picture) */}
              <div className="absolute bottom-6 left-6 w-64 h-48 bg-black rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {isVideoOff && (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <VideoOff size={32} className="text-white/50" />
                  </div>
                )}
              </div>
            </div>

            {/* Side Panel for Translations */}
            <div className="w-96 bg-black/50 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto">
              {role === 'sign' ? (
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤟</span>
                    Your Sign Translation
                  </h4>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 min-h-[100px]">
                    {isDetecting ? (
                      <p className="text-purple-200 text-lg">{localTranslation || 'Detecting signs...'}</p>
                    ) : (
                      <p className="text-white/50 italic">Sign detection paused</p>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    Your signs are converted to speech for the other user
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎤</span>
                    Your Speech
                  </h4>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 min-h-[100px]">
                    {isListening ? (
                      <p className="text-blue-200 text-lg">{speechTranscript || 'Listening...'}</p>
                    ) : (
                      <p className="text-white/50 italic">Microphone muted</p>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    Your speech is shown as subtitles to the other user
                  </p>
                </div>
              )}

              <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/70 text-xs">
                  🔐 Privacy: All processing happens in your browser. Video is peer-to-peer encrypted.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        {isJoined && (
          <div className="flex items-center justify-center gap-4 px-6 py-6 bg-black/30 backdrop-blur-md border-t border-white/10">
            <button
              onClick={handleToggleMute}
              className={`p-4 rounded-full transition-all ${
                isMuted
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
            </button>

            <button
              onClick={handleToggleVideo}
              className={`p-4 rounded-full transition-all ${
                isVideoOff
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              aria-label={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
            >
              {isVideoOff ? <VideoOff size={24} className="text-white" /> : <Video size={24} className="text-white" />}
            </button>

            <button
              onClick={handleEndCall}
              className="p-4 px-8 rounded-full bg-red-500 hover:bg-red-600 transition-all flex items-center gap-2"
              aria-label="End call"
            >
              <Phone size={24} className="text-white rotate-135" />
              <span className="text-white font-bold">End Call</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallModal;
