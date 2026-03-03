import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, Star, ArrowLeft, Filter } from 'lucide-react';
import { insurancePlans, getAgeGroups } from '../data/insuranceData';

const Insurance = () => {
  const navigate = useNavigate();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [userAge, setUserAge] = useState('');
  
  const ageGroups = ['All', ...getAgeGroups()];
  
  // Filter plans based on selected age group or user age
  const filteredPlans = insurancePlans.filter(plan => {
    if (userAge) {
      const age = parseInt(userAge);
      return age >= plan.minAge && age <= plan.maxAge;
    }
    if (selectedAgeGroup === 'All') return true;
    return plan.ageGroup === selectedAgeGroup;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9C1] via-[#FEFEA9] to-[#ECDFC0] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-4 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent mb-4">
            Health Insurance Plans
          </h1>
          <p className="text-slate-700 text-lg">
            Find the perfect insurance plan tailored to your age and needs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-amber-600" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Filter Plans</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter Your Age
              </label>
              <input
                type="number"
                value={userAge}
                onChange={(e) => {
                  setUserAge(e.target.value);
                  setSelectedAgeGroup('All');
                }}
                placeholder="e.g., 25"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                min="0"
                max="100"
              />
            </div>

            {/* Age Group Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Or Select Age Group
              </label>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedAgeGroup(group);
                      setUserAge('');
                    }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedAgeGroup === group
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                        : 'bg-[#FEFEA9] text-amber-800 hover:bg-[#F9F9C1]'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {userAge && (
            <div className="mt-4 p-3 bg-[#FEFEA9] border border-amber-300 rounded-xl">
              <p className="text-amber-800 font-medium">
                Showing plans for age: <span className="font-bold">{userAge} years</span>
              </p>
            </div>
          )}
        </div>

        {/* Insurance Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Provider Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FEFEA9] to-[#F9F9C1] rounded-xl flex items-center justify-center">
                    <Shield className="text-amber-700" size={24} />
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-yellow-700">{plan.rating}</span>
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-sm text-amber-700 font-medium mb-4">{plan.provider}</p>

                {/* Age Group Badge */}
                <div className="inline-block bg-[#FEFEA9] border border-amber-300 px-3 py-1 rounded-full mb-4">
                  <span className="text-sm font-medium text-amber-800">Age: {plan.ageGroup}</span>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-800">${plan.monthlyPremium}</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Coverage up to {plan.coverage}</p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check size={16} className="text-amber-600 shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl">
                  Get Quote
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-20 h-20 bg-[#FEFEA9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-amber-700" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Plans Found</h3>
              <p className="text-slate-600">Try adjusting your age or filter selection</p>
            </div>
          )}
        </div>

        {/* Contact Panel */}
        <div className="mt-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-amber-100 mb-6 text-lg">
              Our insurance experts are here to help you find the perfect plan for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+18002633546"
                className="bg-white text-amber-700 px-8 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors shadow-lg"
              >
                Call: +1 (800) MED-LINK
              </a>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
