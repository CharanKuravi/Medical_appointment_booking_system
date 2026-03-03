import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ArrowLeft, Scan, AlertCircle, CheckCircle } from 'lucide-react';

const FaceAnalysis = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert('Camera access denied');
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setImage(canvas.toDataURL('image/jpeg'));
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const analyzeFace = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        skinHealth: Math.floor(Math.random() * 20) + 80,
        hydration: Math.floor(Math.random() * 15) + 75,
        stressLevel: Math.floor(Math.random() * 30) + 20,
        sleepQuality: Math.floor(Math.random() * 20) + 70,
        recommendations: [
          'Increase water intake to improve skin hydration',
          'Consider stress management techniques',
          'Maintain regular sleep schedule (7-8 hours)',
          'Use sunscreen daily for skin protection'
        ],
        concerns: [
          { name: 'Dark Circles', severity: 'Moderate', color: 'yellow' },
          { name: 'Skin Dryness', severity: 'Mild', color: 'green' }
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            AI Face Analysis
          </h1>
          <p className="text-slate-600 text-lg">
            Upload or capture a photo for instant health insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload/Camera Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Capture Image</h2>
            
            {!image && !cameraActive && (
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <Upload size={20} />
                  Upload Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <button
                  onClick={startCamera}
                  className="w-full bg-white border-2 border-green-600 text-green-600 py-4 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-3"
                >
                  <Camera size={20} />
                  Use Camera
                </button>
              </div>
            )}

            {cameraActive && (
              <div className="space-y-4">
                <video ref={videoRef} autoPlay className="w-full rounded-xl" />
                <div className="flex gap-4">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold"
                  >
                    Capture
                  </button>
                  <button
                    onClick={stopCamera}
                    className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {image && (
              <div className="space-y-4">
                <img src={image} alt="Uploaded" className="w-full rounded-xl" />
                <div className="flex gap-4">
                  <button
                    onClick={analyzeFace}
                    disabled={analyzing}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {analyzing ? (
                      <>
                        <Scan className="animate-spin" size={20} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan size={20} />
                        Analyze Face
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setImage(null);
                      setResults(null);
                    }}
                    className="px-6 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Analysis Results</h2>
            
            {!results && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scan className="text-green-600" size={40} />
                </div>
                <p className="text-slate-600">Upload or capture a photo to see results</p>
              </div>
            )}

            {results && (
              <div className="space-y-6">
                {/* Health Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <p className="text-sm text-slate-600 mb-1">Skin Health</p>
                    <p className="text-2xl font-bold text-green-600">{results.skinHealth}%</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-slate-600 mb-1">Hydration</p>
                    <p className="text-2xl font-bold text-blue-600">{results.hydration}%</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <p className="text-sm text-slate-600 mb-1">Stress Level</p>
                    <p className="text-2xl font-bold text-orange-600">{results.stressLevel}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-sm text-slate-600 mb-1">Sleep Quality</p>
                    <p className="text-2xl font-bold text-purple-600">{results.sleepQuality}%</p>
                  </div>
                </div>

                {/* Concerns */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <AlertCircle size={20} className="text-orange-500" />
                    Detected Concerns
                  </h3>
                  <div className="space-y-2">
                    {results.concerns.map((concern, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <span className="text-slate-700">{concern.name}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          concern.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {concern.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare provider for accurate diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaceAnalysis;
