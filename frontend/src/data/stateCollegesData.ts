export interface CollegeInfo {
  id: string;
  name: string;
  aicte_id: string;
  city: string;
  district: string;
  state: string;
  type: string;
  established_year: number;
  approved_intake: number;
  student_count: number;
  compliance_status: 'Fully Compliant' | 'Intake Verified' | 'Review Underway';
  rating: string;
  featured?: boolean;
}

export interface StateCollegeData {
  state_name: string;
  total_colleges: number;
  total_students: number;
  sanctioned_intake: number;
  compliance_rate: number;
  colleges: CollegeInfo[];
}

export const STATE_COLLEGES_DATA: Record<string, StateCollegeData> = {
  "Delhi": {
    state_name: "Delhi",
    total_colleges: 148,
    total_students: 132400,
    sanctioned_intake: 145000,
    compliance_rate: 98.4,
    colleges: [
      {
        id: "bpit-delhi",
        name: "Bhagwan Parshuram Institute of Technology (BPIT)",
        aicte_id: "AICTE/DEMO/10021",
        city: "Rohini, New Delhi",
        district: "North West Delhi",
        state: "Delhi",
        type: "Affiliated Autonomous Engineering College",
        established_year: 2007,
        approved_intake: 660,
        student_count: 648,
        compliance_status: "Fully Compliant",
        rating: "A+ Grade",
        featured: true
      },
      {
        id: "dtu-delhi",
        name: "Delhi Technological University (DTU)",
        aicte_id: "AICTE/DEL/0001",
        city: "Bawana Road, Delhi",
        district: "North Delhi",
        state: "Delhi",
        type: "State Technical University",
        established_year: 1941,
        approved_intake: 2500,
        student_count: 2460,
        compliance_status: "Fully Compliant",
        rating: "NAAC A++"
      },
      {
        id: "nsut-delhi",
        name: "Netaji Subhas University of Technology (NSUT)",
        aicte_id: "AICTE/DEL/0002",
        city: "Dwarka, New Delhi",
        district: "South West Delhi",
        state: "Delhi",
        type: "State Technical University",
        established_year: 1983,
        approved_intake: 1800,
        student_count: 1780,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "mait-delhi",
        name: "Maharaja Agrasen Institute of Technology (MAIT)",
        aicte_id: "AICTE/DEL/0015",
        city: "Rohini, New Delhi",
        district: "North West Delhi",
        state: "Delhi",
        type: "Private Autonomous",
        established_year: 1999,
        approved_intake: 960,
        student_count: 940,
        compliance_status: "Intake Verified",
        rating: "A Grade"
      },
      {
        id: "igdtuw-delhi",
        name: "Indira Gandhi Delhi Technical University for Women",
        aicte_id: "AICTE/DEL/0008",
        city: "Kashmere Gate, Delhi",
        district: "Central Delhi",
        state: "Delhi",
        type: "State Women Technical University",
        established_year: 1998,
        approved_intake: 1200,
        student_count: 1180,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "bvcoe-delhi",
        name: "Bharati Vidyapeeth's College of Engineering",
        aicte_id: "AICTE/DEL/0034",
        city: "Paschim Vihar, New Delhi",
        district: "West Delhi",
        state: "Delhi",
        type: "Private Engineering Institute",
        established_year: 1999,
        approved_intake: 600,
        student_count: 585,
        compliance_status: "Fully Compliant",
        rating: "A Grade"
      }
    ]
  },
  "Uttar Pradesh": {
    state_name: "Uttar Pradesh",
    total_colleges: 432,
    total_students: 310500,
    sanctioned_intake: 340000,
    compliance_rate: 96.8,
    colleges: [
      {
        id: "iet-lucknow",
        name: "Institute of Engineering & Technology (IET Lucknow)",
        aicte_id: "AICTE/UP/0001",
        city: "Lucknow",
        district: "Lucknow",
        state: "Uttar Pradesh",
        type: "Autonomous State Institute",
        established_year: 1984,
        approved_intake: 840,
        student_count: 825,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      },
      {
        id: "hbtu-kanpur",
        name: "Harcourt Butler Technical University (HBTU)",
        aicte_id: "AICTE/UP/0002",
        city: "Kanpur",
        district: "Kanpur Nagar",
        state: "Uttar Pradesh",
        type: "State Technical University",
        established_year: 1921,
        approved_intake: 1100,
        student_count: 1080,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "knit-sultanpur",
        name: "Kamla Nehru Institute of Technology (KNIT)",
        aicte_id: "AICTE/UP/0014",
        city: "Sultanpur",
        district: "Sultanpur",
        state: "Uttar Pradesh",
        type: "Government Autonomous College",
        established_year: 1976,
        approved_intake: 540,
        student_count: 520,
        compliance_status: "Fully Compliant",
        rating: "Grade A"
      },
      {
        id: "jss-noida",
        name: "JSS Academy of Technical Education",
        aicte_id: "AICTE/UP/0045",
        city: "Noida",
        district: "Gautam Buddha Nagar",
        state: "Uttar Pradesh",
        type: "Private Engineering Institution",
        established_year: 1998,
        approved_intake: 900,
        student_count: 880,
        compliance_status: "Intake Verified",
        rating: "NBA Accredited"
      },
      {
        id: "akg-ghaziabad",
        name: "Ajay Kumar Garg Engineering College",
        aicte_id: "AICTE/UP/0062",
        city: "Ghaziabad",
        district: "Ghaziabad",
        state: "Uttar Pradesh",
        type: "Private Affiliated College",
        established_year: 1998,
        approved_intake: 1200,
        student_count: 1170,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      }
    ]
  },
  "Punjab": {
    state_name: "Punjab",
    total_colleges: 112,
    total_students: 94800,
    sanctioned_intake: 105000,
    compliance_rate: 97.2,
    colleges: [
      {
        id: "pec-chandigarh",
        name: "Punjab Engineering College (PEC)",
        aicte_id: "AICTE/PB/0001",
        city: "Chandigarh",
        district: "Chandigarh",
        state: "Punjab",
        type: "Deemed Technical University",
        established_year: 1921,
        approved_intake: 1100,
        student_count: 1075,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "gndec-ludhiana",
        name: "Guru Nanak Dev Engineering College",
        aicte_id: "AICTE/PB/0012",
        city: "Ludhiana",
        district: "Ludhiana",
        state: "Punjab",
        type: "Government Aided Autonomous",
        established_year: 1956,
        approved_intake: 840,
        student_count: 810,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      },
      {
        id: "bbsbec-fatehgarh",
        name: "Baba Banda Singh Bahadur Engineering College",
        aicte_id: "AICTE/PB/0025",
        city: "Fatehgarh Sahib",
        district: "Fatehgarh Sahib",
        state: "Punjab",
        type: "Private Engineering College",
        established_year: 1993,
        approved_intake: 600,
        student_count: 570,
        compliance_status: "Intake Verified",
        rating: "Grade A"
      }
    ]
  },
  "Haryana": {
    state_name: "Haryana",
    total_colleges: 156,
    total_students: 118200,
    sanctioned_intake: 126000,
    compliance_rate: 97.9,
    colleges: [
      {
        id: "jcbose-faridabad",
        name: "J.C. Bose University of Science and Technology, YMCA",
        aicte_id: "AICTE/HR/0001",
        city: "Faridabad",
        district: "Faridabad",
        state: "Haryana",
        type: "State Technical University",
        established_year: 1969,
        approved_intake: 1200,
        student_count: 1180,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "dcrust-murthal",
        name: "Deenbandhu Chhotu Ram University of Science & Technology",
        aicte_id: "AICTE/HR/0003",
        city: "Murthal, Sonipat",
        district: "Sonipat",
        state: "Haryana",
        type: "State Technical University",
        established_year: 1987,
        approved_intake: 960,
        student_count: 935,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      },
      {
        id: "dronacharya-gurugram",
        name: "Dronacharya College of Engineering",
        aicte_id: "AICTE/HR/0018",
        city: "Gurugram",
        district: "Gurugram",
        state: "Haryana",
        type: "Private Engineering Institute",
        established_year: 1998,
        approved_intake: 600,
        student_count: 580,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      }
    ]
  },
  "Rajasthan": {
    state_name: "Rajasthan",
    total_colleges: 174,
    total_students: 142000,
    sanctioned_intake: 155000,
    compliance_rate: 96.5,
    colleges: [
      {
        id: "mnit-jaipur",
        name: "Malaviya National Institute of Technology (MNIT Jaipur)",
        aicte_id: "AICTE/RJ/0001",
        city: "Jaipur",
        district: "Jaipur",
        state: "Rajasthan",
        type: "National Institute of Technology",
        established_year: 1963,
        approved_intake: 1300,
        student_count: 1290,
        compliance_status: "Fully Compliant",
        rating: "Institute of National Importance"
      },
      {
        id: "skit-jaipur",
        name: "Swami Keshvanand Institute of Technology (SKIT)",
        aicte_id: "AICTE/RJ/0014",
        city: "Jaipur",
        district: "Jaipur",
        state: "Rajasthan",
        type: "Private Autonomous College",
        established_year: 2000,
        approved_intake: 1140,
        student_count: 1110,
        compliance_status: "Fully Compliant",
        rating: "NAAC A++"
      },
      {
        id: "rtu-kota",
        name: "University College of Engineering, RTU Kota",
        aicte_id: "AICTE/RJ/0005",
        city: "Kota",
        district: "Kota",
        state: "Rajasthan",
        type: "State University Constituent College",
        established_year: 1981,
        approved_intake: 720,
        student_count: 695,
        compliance_status: "Intake Verified",
        rating: "Grade A"
      }
    ]
  },
  "Maharashtra": {
    state_name: "Maharashtra",
    total_colleges: 388,
    total_students: 345000,
    sanctioned_intake: 370000,
    compliance_rate: 97.4,
    colleges: [
      {
        id: "coep-pune",
        name: "COEP Technological University",
        aicte_id: "AICTE/MH/0001",
        city: "Pune",
        district: "Pune",
        state: "Maharashtra",
        type: "Unitary State University",
        established_year: 1854,
        approved_intake: 1200,
        student_count: 1190,
        compliance_status: "Fully Compliant",
        rating: "NAAC A++"
      },
      {
        id: "vjti-mumbai",
        name: "Veermata Jijabai Technological Institute (VJTI)",
        aicte_id: "AICTE/MH/0002",
        city: "Mumbai",
        district: "Mumbai City",
        state: "Maharashtra",
        type: "Autonomous State Institute",
        established_year: 1887,
        approved_intake: 980,
        student_count: 970,
        compliance_status: "Fully Compliant",
        rating: "Grade A+"
      },
      {
        id: "pict-pune",
        name: "Pune Institute of Computer Technology (PICT)",
        aicte_id: "AICTE/MH/0019",
        city: "Dhankawadi, Pune",
        district: "Pune",
        state: "Maharashtra",
        type: "Private Engineering College",
        established_year: 1983,
        approved_intake: 720,
        student_count: 715,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      }
    ]
  },
  "Gujarat": {
    state_name: "Gujarat",
    total_colleges: 165,
    total_students: 138000,
    sanctioned_intake: 148000,
    compliance_rate: 98.1,
    colleges: [
      {
        id: "ldce-ahmedabad",
        name: "L.D. College of Engineering",
        aicte_id: "AICTE/GJ/0001",
        city: "Ahmedabad",
        district: "Ahmedabad",
        state: "Gujarat",
        type: "Government Engineering College",
        established_year: 1948,
        approved_intake: 1200,
        student_count: 1180,
        compliance_status: "Fully Compliant",
        rating: "NBA Accredited"
      },
      {
        id: "bvm-anand",
        name: "Birla Vishvakarma Mahavidyalaya (BVM)",
        aicte_id: "AICTE/GJ/0003",
        city: "Vallabh Vidyanagar",
        district: "Anand",
        state: "Gujarat",
        type: "Autonomous Grant-in-Aid",
        established_year: 1948,
        approved_intake: 900,
        student_count: 885,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      }
    ]
  },
  "Madhya Pradesh": {
    state_name: "Madhya Pradesh",
    total_colleges: 195,
    total_students: 158000,
    sanctioned_intake: 172000,
    compliance_rate: 96.9,
    colleges: [
      {
        id: "sgsits-indore",
        name: "Shri Govindram Seksaria Institute of Technology and Science",
        aicte_id: "AICTE/MP/0001",
        city: "Indore",
        district: "Indore",
        state: "Madhya Pradesh",
        type: "Autonomous Government Aided",
        established_year: 1952,
        approved_intake: 1050,
        student_count: 1020,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      },
      {
        id: "jec-jabalpur",
        name: "Jabalpur Engineering College",
        aicte_id: "AICTE/MP/0004",
        city: "Jabalpur",
        district: "Jabalpur",
        state: "Madhya Pradesh",
        type: "Government Autonomous Institute",
        established_year: 1947,
        approved_intake: 840,
        student_count: 815,
        compliance_status: "Fully Compliant",
        rating: "Grade A"
      }
    ]
  },
  "Uttarakhand": {
    state_name: "Uttarakhand",
    total_colleges: 72,
    total_students: 62000,
    sanctioned_intake: 68000,
    compliance_rate: 97.5,
    colleges: [
      {
        id: "cot-pantnagar",
        name: "College of Technology, Pantnagar",
        aicte_id: "AICTE/UK/0001",
        city: "Pantnagar",
        district: "Udham Singh Nagar",
        state: "Uttarakhand",
        type: "State University Constituent College",
        established_year: 1962,
        approved_intake: 680,
        student_count: 660,
        compliance_status: "Fully Compliant",
        rating: "NAAC A"
      },
      {
        id: "gbpec-pauri",
        name: "G.B. Pant Institute of Engineering & Technology",
        aicte_id: "AICTE/UK/0007",
        city: "Pauri Garhwal",
        district: "Pauri Garhwal",
        state: "Uttarakhand",
        type: "Autonomous State Institute",
        established_year: 1989,
        approved_intake: 480,
        student_count: 450,
        compliance_status: "Intake Verified",
        rating: "Grade A"
      }
    ]
  },
  "Himachal Pradesh": {
    state_name: "Himachal Pradesh",
    total_colleges: 46,
    total_students: 38500,
    sanctioned_intake: 42000,
    compliance_rate: 98.6,
    colleges: [
      {
        id: "nit-hamirpur",
        name: "National Institute of Technology Hamirpur",
        aicte_id: "AICTE/HP/0001",
        city: "Hamirpur",
        district: "Hamirpur",
        state: "Himachal Pradesh",
        type: "Institute of National Importance",
        established_year: 1986,
        approved_intake: 920,
        student_count: 910,
        compliance_status: "Fully Compliant",
        rating: "NIRF Top 100"
      },
      {
        id: "juit-waknaghat",
        name: "Jaypee University of Information Technology",
        aicte_id: "AICTE/HP/0011",
        city: "Waknaghat, Solan",
        district: "Solan",
        state: "Himachal Pradesh",
        type: "State Private University",
        established_year: 2002,
        approved_intake: 600,
        student_count: 580,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      }
    ]
  },
  "Jammu and Kashmir": {
    state_name: "Jammu and Kashmir",
    total_colleges: 38,
    total_students: 29800,
    sanctioned_intake: 33000,
    compliance_rate: 97.1,
    colleges: [
      {
        id: "gcit-jammu",
        name: "Government College of Engineering and Technology, Jammu",
        aicte_id: "AICTE/JK/0001",
        city: "Jammu",
        district: "Jammu",
        state: "Jammu and Kashmir",
        type: "Government Engineering College",
        established_year: 1994,
        approved_intake: 420,
        student_count: 405,
        compliance_status: "Fully Compliant",
        rating: "Grade A"
      }
    ]
  },
  "Bihar": {
    state_name: "Bihar",
    total_colleges: 118,
    total_students: 92000,
    sanctioned_intake: 104000,
    compliance_rate: 96.1,
    colleges: [
      {
        id: "mit-muzaffarpur",
        name: "Muzaffarpur Institute of Technology (MIT)",
        aicte_id: "AICTE/BR/0001",
        city: "Muzaffarpur",
        district: "Muzaffarpur",
        state: "Bihar",
        type: "Government Engineering College",
        established_year: 1954,
        approved_intake: 540,
        student_count: 515,
        compliance_status: "Fully Compliant",
        rating: "Grade A"
      },
      {
        id: "bce-bhagalpur",
        name: "Bhagalpur College of Engineering",
        aicte_id: "AICTE/BR/0003",
        city: "Bhagalpur",
        district: "Bhagalpur",
        state: "Bihar",
        type: "Government Engineering College",
        established_year: 1960,
        approved_intake: 480,
        student_count: 460,
        compliance_status: "Intake Verified",
        rating: "Grade A"
      }
    ]
  },
  "West Bengal": {
    state_name: "West Bengal",
    total_colleges: 210,
    total_students: 178000,
    sanctioned_intake: 192000,
    compliance_rate: 96.7,
    colleges: [
      {
        id: "ju-kolkata",
        name: "Jadavpur University Faculty of Engineering",
        aicte_id: "AICTE/WB/0001",
        city: "Kolkata",
        district: "Kolkata",
        state: "West Bengal",
        type: "State Technical Faculty",
        established_year: 1955,
        approved_intake: 1350,
        student_count: 1330,
        compliance_status: "Fully Compliant",
        rating: "NAAC A++"
      }
    ]
  },
  "Karnataka": {
    state_name: "Karnataka",
    total_colleges: 295,
    total_students: 265000,
    sanctioned_intake: 285000,
    compliance_rate: 97.6,
    colleges: [
      {
        id: "rvce-bengaluru",
        name: "R.V. College of Engineering",
        aicte_id: "AICTE/KA/0001",
        city: "Bengaluru",
        district: "Bengaluru Urban",
        state: "Karnataka",
        type: "Autonomous Private",
        established_year: 1963,
        approved_intake: 1200,
        student_count: 1185,
        compliance_status: "Fully Compliant",
        rating: "NAAC A+"
      }
    ]
  },
  "Tamil Nadu": {
    state_name: "Tamil Nadu",
    total_colleges: 410,
    total_students: 320000,
    sanctioned_intake: 350000,
    compliance_rate: 97.8,
    colleges: [
      {
        id: "ceg-chennai",
        name: "College of Engineering, Guindy (Anna University)",
        aicte_id: "AICTE/TN/0001",
        city: "Chennai",
        district: "Chennai",
        state: "Tamil Nadu",
        type: "State Technical University Campus",
        established_year: 1794,
        approved_intake: 1400,
        student_count: 1380,
        compliance_status: "Fully Compliant",
        rating: "NAAC A++"
      }
    ]
  }
};

const RANDOM_COLLEGE_NAMES = [
  "Aryabhatta Institute of Technology & Management",
  "Atal Bihari Vajpayee Institute of Engineering",
  "Maharishi Dayanand College of Engineering & Research",
  "Sardar Patel Institute of Advanced Studies",
  "Swami Vivekananda College of Science & Technology",
  "Lal Bahadur Shastri Engineering Academy",
  "Chanakya Institute of Technical Studies",
  "Shaheed Bhagat Singh College of Technology",
  "Guru Gobind Singh Institute of Engineering",
  "Pandit Deendayal Petroleum & Technology Campus",
  "Raja Ramanna Institute of Information Technology",
  "Dr. A.P.J. Abdul Kalam Engineering College"
];

// Fallback generator for any state not explicitly expanded above
export function getOrCreateStateData(stateName: string): StateCollegeData {
  if (STATE_COLLEGES_DATA[stateName]) {
    return STATE_COLLEGES_DATA[stateName];
  }
  
  // Deterministic realistic synthetic generation for other GeoJSON states
  const hash = stateName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const collegeCount = 35 + (hash % 110);
  const students = collegeCount * (720 + (hash % 380));
  const intake = Math.round(students * 1.07);
  const compliance = 95.2 + ((hash % 42) / 10);

  const college1Name = RANDOM_COLLEGE_NAMES[hash % RANDOM_COLLEGE_NAMES.length];
  const college2Name = RANDOM_COLLEGE_NAMES[(hash + 3) % RANDOM_COLLEGE_NAMES.length];
  const college3Name = RANDOM_COLLEGE_NAMES[(hash + 7) % RANDOM_COLLEGE_NAMES.length];

  return {
    state_name: stateName,
    total_colleges: collegeCount,
    total_students: students,
    sanctioned_intake: intake,
    compliance_rate: Number(compliance.toFixed(1)),
    colleges: [
      {
        id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-inst-1`,
        name: `${college1Name} (${stateName} Campus)`,
        aicte_id: `AICTE/${stateName.slice(0, 2).toUpperCase()}/1001`,
        city: "State Capital City",
        district: "Central District",
        state: stateName,
        type: "State Technical Institution",
        established_year: 1995 + (hash % 25),
        approved_intake: 720,
        student_count: 698,
        compliance_status: "Fully Compliant",
        rating: "Grade A+"
      },
      {
        id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-inst-2`,
        name: `${college2Name}`,
        aicte_id: `AICTE/${stateName.slice(0, 2).toUpperCase()}/1002`,
        city: "Technology Park",
        district: "North District",
        state: stateName,
        type: "Autonomous Technical College",
        established_year: 2002 + (hash % 18),
        approved_intake: 540,
        student_count: 518,
        compliance_status: "Intake Verified",
        rating: "Grade A"
      },
      {
        id: `${stateName.toLowerCase().replace(/\s+/g, '-')}-inst-3`,
        name: `${college3Name}`,
        aicte_id: `AICTE/${stateName.slice(0, 2).toUpperCase()}/1003`,
        city: "Academic Valley",
        district: "South District",
        state: stateName,
        type: "Private Engineering Institute",
        established_year: 2010 + (hash % 12),
        approved_intake: 480,
        student_count: 462,
        compliance_status: "Fully Compliant",
        rating: "Grade A"
      }
    ]
  };
}
