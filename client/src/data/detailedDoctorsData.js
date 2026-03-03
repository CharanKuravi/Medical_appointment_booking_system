// Detailed doctor data with complete profiles
export const detailedDoctors = [
  {
    id: "doc-001",
    name: "Dr. Ethan Walker",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 18,
    consultationFee: 121,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  },
  {
    id: "doc-002",
    name: "Dr. Olivia Brooks",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 17,
    consultationFee: 174,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  },
  {
    id: "doc-003",
    name: "Dr. Mason Reed",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 11,
    consultationFee: 227,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  },
  {
    id: "doc-004",
    name: "Dr. Ava Collins",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 13,
    consultationFee: 199,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  },
  {
    id: "doc-005",
    name: "Dr. Liam Foster",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 18,
    consultationFee: 174,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  },
  {
    id: "doc-006",
    name: "Dr. Sophia Bennett",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 11,
    consultationFee: 138,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  }
];

// Helper function to get doctor by ID
export const getDoctorById = (id) => {
  return detailedDoctors.find(doc => doc.id === id);
};
