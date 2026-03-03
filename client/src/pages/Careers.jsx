import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Search } from 'lucide-react';

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const jobs = [
    {
      id: 1,
      title: "Senior Cardiologist",
      department: "Medical",
      location: "New York, NY",
      type: "Full-time",
      salary: "$180,000 - $250,000",
      description: "Seeking experienced cardiologist to join our team",
      requirements: ["MD degree", "Board certified", "5+ years experience"]
    },
    {
      id: 2,
      title: "Registered Nurse",
      department: "Nursing",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$70,000 - $95,000",
      description: "Join our compassionate nursing team",
      requirements: ["RN license", "2+ years experience", "BLS certification"]
    },
    {
      id: 3,
      title: "Medical Receptionist",
      department: "Administration",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$35,000 - $45,000",
      description: "Front desk position at busy medical practice",
      requirements: ["High school diploma", "Customer service experience", "Computer skills"]
    },
    {
      id: 4,
      title: "Pediatrician",
      department: "Medical",
      location: "Houston, TX",
      type: "Full-time",
      salary: "$160,000 - $220,000",
      description: "Pediatric specialist for growing practice",
      requirements: ["MD degree", "Pediatrics board certification", "3+ years experience"]
    },
    {
      id: 5,
      title: "Medical Lab Technician",
      department: "Laboratory",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$45,000 - $60,000",
      description: "Lab tech for diagnostic testing",
      requirements: ["Associate degree", "MLT certification", "Lab experience"]
    },
    {
      id: 6,
      title: "Healthcare IT Specialist",
      department: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$85,000 - $120,000",
      description: "Manage healthcare information systems",
      requirements: ["Bachelor's in IT", "Healthcare IT experience", "HIPAA knowledge"]
    }
  ];

  const departments = ['All', 'Medical', 'Nursing', 'Administration', 'Laboratory', 'Technology'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Join Our Team
          </h1>
          <p className="text-slate-600 text-lg">
            Build your career in healthcare with MedLink
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs or locations..."
                className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedDepartment === dept
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="text-green-600" size={24} />
                </div>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.department}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
              <p className="text-slate-600 mb-4">{job.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={16} className="text-green-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-green-500" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <DollarSign size={16} className="text-green-500" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Requirements:</p>
                <ul className="space-y-1">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Why Join Us */}
        <div className="mt-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Join MedLink?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-bold mb-2">Competitive Benefits</h3>
              <p className="text-green-100 text-sm">Health insurance, retirement plans, and more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-bold mb-2">Growth Opportunities</h3>
              <p className="text-green-100 text-sm">Continuous learning and career advancement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold mb-2">Great Team Culture</h3>
              <p className="text-green-100 text-sm">Work with passionate healthcare professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
