// Insurance Plans Database
export const insurancePlans = [
  // Plans for 0-18 years (Children)
  {
    id: 1,
    name: "KidsCare Health Plus",
    provider: "HealthFirst Insurance",
    ageGroup: "0-18",
    minAge: 0,
    maxAge: 18,
    monthlyPremium: 89,
    coverage: "$500,000",
    features: ["Pediatric Care", "Vaccinations", "Dental & Vision", "Emergency Care"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Junior Shield Plan",
    provider: "SafeGuard Insurance",
    ageGroup: "0-18",
    minAge: 0,
    maxAge: 18,
    monthlyPremium: 75,
    coverage: "$300,000",
    features: ["Basic Healthcare", "School Injuries", "Preventive Care"],
    rating: 4.5
  },
  {
    id: 3,
    name: "Family Kids Protection",
    provider: "MediCare Plus",
    ageGroup: "0-18",
    minAge: 0,
    maxAge: 18,
    monthlyPremium: 95,
    coverage: "$600,000",
    features: ["Comprehensive Care", "Specialist Visits", "Mental Health", "Dental"],
    rating: 4.9
  },

  // Plans for 19-35 years (Young Adults)
  {
    id: 4,
    name: "Young Professional Plan",
    provider: "HealthFirst Insurance",
    ageGroup: "19-35",
    minAge: 19,
    maxAge: 35,
    monthlyPremium: 120,
    coverage: "$1,000,000",
    features: ["Outpatient Care", "Gym Membership", "Mental Health", "Telemedicine"],
    rating: 4.7
  },
  {
    id: 5,
    name: "Active Life Insurance",
    provider: "SafeGuard Insurance",
    ageGroup: "19-35",
    minAge: 19,
    maxAge: 35,
    monthlyPremium: 110,
    coverage: "$800,000",
    features: ["Sports Injuries", "Wellness Programs", "Emergency Care"],
    rating: 4.6
  },
  {
    id: 6,
    name: "Millennial Health Shield",
    provider: "MediCare Plus",
    ageGroup: "19-35",
    minAge: 19,
    maxAge: 35,
    monthlyPremium: 135,
    coverage: "$1,200,000",
    features: ["Comprehensive Coverage", "Maternity Care", "Dental & Vision", "Prescription Drugs"],
    rating: 4.8
  },
  {
    id: 7,
    name: "Starter Health Plan",
    provider: "WellCare Insurance",
    ageGroup: "19-35",
    minAge: 19,
    maxAge: 35,
    monthlyPremium: 99,
    coverage: "$600,000",
    features: ["Basic Coverage", "Emergency Care", "Preventive Services"],
    rating: 4.4
  },

  // Plans for 36-55 years (Middle Age)
  {
    id: 8,
    name: "Prime Life Coverage",
    provider: "HealthFirst Insurance",
    ageGroup: "36-55",
    minAge: 36,
    maxAge: 55,
    monthlyPremium: 180,
    coverage: "$1,500,000",
    features: ["Chronic Disease Management", "Specialist Care", "Preventive Screenings", "Prescription Coverage"],
    rating: 4.9
  },
  {
    id: 9,
    name: "Family Guardian Plan",
    provider: "SafeGuard Insurance",
    ageGroup: "36-55",
    minAge: 36,
    maxAge: 55,
    monthlyPremium: 165,
    coverage: "$1,200,000",
    features: ["Family Coverage", "Maternity Care", "Mental Health", "Emergency Services"],
    rating: 4.7
  },
  {
    id: 10,
    name: "Executive Health Plus",
    provider: "MediCare Plus",
    ageGroup: "36-55",
    minAge: 36,
    maxAge: 55,
    monthlyPremium: 210,
    coverage: "$2,000,000",
    features: ["Premium Care", "Annual Health Checkups", "Specialist Consultations", "Wellness Programs"],
    rating: 4.9
  },
  {
    id: 11,
    name: "Mid-Life Protection",
    provider: "WellCare Insurance",
    ageGroup: "36-55",
    minAge: 36,
    maxAge: 55,
    monthlyPremium: 155,
    coverage: "$1,000,000",
    features: ["Standard Coverage", "Preventive Care", "Emergency Services"],
    rating: 4.5
  },

  // Plans for 56+ years (Seniors)
  {
    id: 12,
    name: "Senior Care Premium",
    provider: "HealthFirst Insurance",
    ageGroup: "56+",
    minAge: 56,
    maxAge: 100,
    monthlyPremium: 250,
    coverage: "$2,000,000",
    features: ["Comprehensive Senior Care", "Chronic Disease Management", "Home Healthcare", "Prescription Drugs"],
    rating: 4.9
  },
  {
    id: 13,
    name: "Golden Years Plan",
    provider: "SafeGuard Insurance",
    ageGroup: "56+",
    minAge: 56,
    maxAge: 100,
    monthlyPremium: 220,
    coverage: "$1,500,000",
    features: ["Senior Wellness", "Specialist Care", "Emergency Services", "Preventive Screenings"],
    rating: 4.8
  },
  {
    id: 14,
    name: "Retirement Health Shield",
    provider: "MediCare Plus",
    ageGroup: "56+",
    minAge: 56,
    maxAge: 100,
    monthlyPremium: 280,
    coverage: "$2,500,000",
    features: ["Premium Senior Care", "24/7 Support", "Home Visits", "Comprehensive Coverage"],
    rating: 4.9
  },
  {
    id: 15,
    name: "Senior Basic Plan",
    provider: "WellCare Insurance",
    ageGroup: "56+",
    minAge: 56,
    maxAge: 100,
    monthlyPremium: 195,
    coverage: "$1,000,000",
    features: ["Essential Coverage", "Emergency Care", "Prescription Drugs"],
    rating: 4.6
  }
];

// Helper function to filter by age
export const getInsuranceByAge = (age) => {
  return insurancePlans.filter(plan => age >= plan.minAge && age <= plan.maxAge);
};

// Helper function to get all age groups
export const getAgeGroups = () => {
  return [...new Set(insurancePlans.map(plan => plan.ageGroup))];
};
