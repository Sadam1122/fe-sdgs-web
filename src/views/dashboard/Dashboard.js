"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import {
  CCard,
  CCardBody,
} from '@coreui/react-pro'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts"

import "./dashboard.css"

// SDG colors mapping - using official SDG colors
const sdgColors = {
  SDGS1: "#E5243B",
  SDGS2: "#DDA63A",
  SDGS3: "#4C9F38",
  SDGS4: "#C5192D",
  SDGS5: "#FF3A21",
  SDGS6: "#26BDE2",
  SDGS7: "#FCC30B",
  SDGS8: "#A21942",
  SDGS9: "#FD6925",
  SDGS10: "#DD1367",
  SDGS11: "#FD9D24",
  SDGS12: "#BF8B2E",
  SDGS13: "#3F7E44",
  SDGS14: "#0A97D9",
  SDGS15: "#56C02B",
  SDGS16: "#00689D",
  SDGS17: "#19486A",
}

// SDG titles
const sdgTitles = {
  SDGS1: "No Poverty",
  SDGS2: "Zero Hunger",
  SDGS3: "Good Health and Well-being",
  SDGS4: "Quality Education",
  SDGS5: "Gender Equality",
  SDGS6: "Clean Water and Sanitation",
  SDGS7: "Affordable and Clean Energy",
  SDGS8: "Decent Work and Economic Growth",
  SDGS9: "Industry, Innovation and Infrastructure",
  SDGS10: "Reduced Inequalities",
  SDGS11: "Sustainable Cities and Communities",
  SDGS12: "Responsible Consumption and Production",
  SDGS13: "Climate Action",
  SDGS14: "Life Below Water",
  SDGS15: "Life on Land",
  SDGS16: "Peace, Justice and Strong Institutions",
  SDGS17: "Partnerships for the Goals",
}

// SDG Icons (using emoji for simplicity, but you can replace with actual SDG icons)
const sdgIcons = {
  SDGS1: "💰",
  SDGS2: "🍞",
  SDGS3: "🏥",
  SDGS4: "🎓",
  SDGS5: "⚧️",
  SDGS6: "💧",
  SDGS7: "⚡",
  SDGS8: "💼",
  SDGS9: "🏭",
  SDGS10: "⚖️",
  SDGS11: "🏙️",
  SDGS12: "♻️",
  SDGS13: "🌡️",
  SDGS14: "🌊",
  SDGS15: "🌳",
  SDGS16: "⚖️",
  SDGS17: "🤝",
}

// Icons components
const Icons = {
  Book: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Globe: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  Search: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-5 w-5 text-white mb-2" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  ChevronDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Filter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
  BarChart2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  BarChartHorizontal: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="13" y2="6"></line>
      <line x1="3" y1="12" x2="19" y2="12"></line>
      <line x1="3" y1="18" x2="9" y2="18"></line>
    </svg>
  ),
  PieChart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>
  ),
  Loader2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  ),
}

function SDGMappingDashboard() {
  // State management
  const [loading, setLoading] = useState(true)
  const [sdgData, setSdgData] = useState([])
  const [facultyList, setFacultyList] = useState([])
  const [programList, setProgramList] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [availableYears, setAvailableYears] = useState([])
  const [lecturerData, setLecturerData] = useState([])
  const [totalPublications, setTotalPublications] = useState(0)
  const [totalLecturers, setTotalLecturers] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeChartType, setActiveChartType] = useState("bar")
  const [expandedLecturers, setExpandedLecturers] = useState({})
  const [displayedLecturerCount, setDisplayedLecturerCount] = useState(5);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [allLecturers, setAllLecturers] = useState([]);

  // Fetch available years
  useEffect(() => {
    axios
      .get("https://api.sdgstelkomuniversity.my.id/model/get-sdgs-count")
      .then((response) => {
        const years = response.data.available_years || []
        // Sort years in descending order
        const sortedYears = years.sort((a, b) => b - a)
        setAvailableYears(sortedYears)
        if (sortedYears.length > 0) {
          setSelectedYear(sortedYears[0]) // Set the latest year as the default
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the available years!", error)
        // Fallback to mock data if API fails
        const mockYears = ["2024", "2023", "2022", "2021", "2020"]
        setAvailableYears(mockYears)
        setSelectedYear("2024")
      })
  }, [])

  // Fetch SDG data based on selected year
  useEffect(() => {
    if (selectedYear) {
      setLoading(true)
      axios
        .get(`https://api.sdgstelkomuniversity.my.id/model/get-sdgs-count?Tahun=${selectedYear}`)
        .then((response) => {
          const data = response.data.sdgs_count

          // Define SDGs range
          const sdgsRange = Array.from({ length: 17 }, (_, i) => `SDGS${i + 1}`)

          // Filter data to include only SDGs present in the response and with non-zero values
          const filteredKeys = sdgsRange
            .filter((key) => data.hasOwnProperty(key) && data[key] > 0)
            .sort((a, b) => Number.parseInt(a.replace("SDGS", "")) - Number.parseInt(b.replace("SDGS", "")))

          // Map to format needed for charts
          const formattedData = filteredKeys.map((key) => ({
            name: key,
            value: data[key],
            fullName: sdgTitles[key],
            icon: sdgIcons[key],
            color: sdgColors[key],
          }))

          setSdgData(formattedData)

          // Calculate total publications
          const totalPubs = Object.values(data).reduce((sum, count) => sum + count, 0)
          setTotalPublications(totalPubs)

          setLoading(false)
        })
        .catch((error) => {
          console.error("There was an error fetching the SDG data!", error)
          // Fallback to mock data if API fails
          generateMockSDGData()
          setLoading(false)
        })
    }
  }, [selectedYear])

  // Fetch lecturer data based on filters
  useEffect(() => {
    if (selectedYear) {
      setLoading(true);
      
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedYear) params.append('tahun', selectedYear);
        
        const perPageQuery = 'per_page=100';
        
        axios.get(`https://api.sdgstelkomuniversity.my.id/model/detail_dosen?${perPageQuery}&${params.toString()}`)
          .then(response => {
            const data = response.data;
            
            // Extract faculty and program lists if not already set
            if (facultyList.length === 0) {
              const faculties = [...new Set(data.map(item => item.lokasi_kerja_sotk))].filter(Boolean);
              setFacultyList(faculties);
            }
            
            if (programList.length === 0) {
              const programs = [...new Set(data.map(item => item.lokasi_kerja))].filter(Boolean);
              setProgramList(programs);
            }
            
            // Store all lecturers
            setAllLecturers(data);
            
            // Apply filters
            applyLecturerFilters(data);
            
            // Count total publications
            const pubCount = data.reduce((sum, lecturer) => {
              return sum + (lecturer.publications ? lecturer.publications.length : 0);
            }, 0);
            
            if (totalPublications === 0) {
              setTotalPublications(pubCount);
            }
            
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching lecturer data:", error);
            // Fallback to mock data
            generateMockLecturerData();
            setLoading(false);
          });
      } catch (error) {
        console.error("Error in lecturer data fetch:", error);
        generateMockLecturerData();
        setLoading(false);
      }
    }
  }, [selectedYear]);

  // Add this new effect to handle filtering:
  useEffect(() => {
    if (allLecturers.length > 0) {
      applyLecturerFilters(allLecturers);
    }
  }, [selectedFaculty, selectedProgram, searchQuery]);

  // Add this new function to apply filters:
  const applyLecturerFilters = (lecturers) => {
    let filtered = [...lecturers];
    
    // Apply faculty filter
    if (selectedFaculty) {
      filtered = filtered.filter(lecturer => 
        lecturer.lokasi_kerja_sotk === selectedFaculty
      );
    }
    
    // Apply program filter
    if (selectedProgram) {
      filtered = filtered.filter(lecturer => 
        lecturer.lokasi_kerja === selectedProgram
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lecturer => 
        lecturer.nama_lengkap.toLowerCase().includes(query) ||
        (lecturer.publications && lecturer.publications.some(pub => 
          pub.Judul.toLowerCase().includes(query) ||
          pub.Penulis.toLowerCase().includes(query)
        ))
      );
    }
    
    setFilteredLecturers(filtered);
    setTotalLecturers(filtered.length);
  };

  // Add this function to handle loading more lecturers:
  const handleLoadMore = () => {
    setDisplayedLecturerCount(prev => prev + 5);
  };

  // Generate mock SDG data for fallback
  const generateMockSDGData = () => {
    const mockData = []

    for (let i = 1; i <= 17; i++) {
      const key = `SDGS${i}`
      mockData.push({
        name: key,
        value: Math.floor(Math.random() * 100) + 10,
        fullName: sdgTitles[key],
        icon: sdgIcons[key],
        color: sdgColors[key],
      })
    }

    setSdgData(mockData)

    // Calculate total publications from mock data
    const totalPubs = mockData.reduce((sum, item) => sum + item.value, 0)
    setTotalPublications(totalPubs)
  }

  // Generate mock lecturer data for fallback
  const generateMockLecturerData = () => {
    // Simulate faculty and program data
    const faculties = [
      'FAKULTAS REKAYASA INDUSTRI', 
      'FAKULTAS TEKNIK ELEKTRO',
      'FAKULTAS INFORMATIKA',
      'FAKULTAS EKONOMI DAN BISNIS',
      'FAKULTAS KOMUNIKASI DAN BISNIS'
    ];
    
    const programs = [
      'PROGRAM STUDI S1 TEKNIK LOGISTIK KAMPUS SURABAYA (FRI)',
      'PROGRAM STUDI S1 TEKNIK INDUSTRI (FRI)',
      'PROGRAM STUDI S1 SISTEM INFORMASI (FRI)',
      'PROGRAM STUDI S1 TEKNIK TELEKOMUNIKASI (FTE)',
      'PROGRAM STUDI S1 INFORMATIKA (FIF)',
      'PROGRAM STUDI S1 AKUNTANSI (FEB)',
      'PROGRAM STUDI S1 ILMU KOMUNIKASI (FKB)'
    ];
    
    if (facultyList.length === 0) {
      setFacultyList(faculties);
    }
    
    if (programList.length === 0) {
      setProgramList(programs);
    }
    
    // Generate random lecturer data
    const lecturers = [];
    const lecturerCount = Math.floor(Math.random() * 150) + 100;
    let pubCount = 0;
    
    for (let i = 1; i <= lecturerCount; i++) {
      const facultyIndex = Math.floor(Math.random() * faculties.length);
      const programIndex = Math.floor(Math.random() * programs.length);
      
      const publicationsCount = Math.floor(Math.random() * 10);
      const publications = [];
      
      for (let j = 0; j < publicationsCount; j++) {
        const sdgsCount = Math.floor(Math.random() * 4) + 1;
        const sdgs = [];
        
        for (let k = 0; k < sdgsCount; k++) {
          const sdgNumber = Math.floor(Math.random() * 17) + 1;
          const sdgKey = `SDGS${sdgNumber}`;
          if (!sdgs.includes(sdgKey)) {
            sdgs.push(sdgKey);
          }
        }
        
        publications.push({
          id: `pub-${i}-${j}`,
          Judul: `Publication on Sustainable Development ${j+1}`,
          Penulis: `Dr. Lecturer ${i} et al.`,
          Tahun: selectedYear,
          Sdgs: sdgs
        });
        
        pubCount++;
      }
      
      lecturers.push({
        id: `10${i}001-1`,
        nama_lengkap: `Dr. Lecturer ${i}`,
        lokasi_kerja_sotk: faculties[facultyIndex],
        lokasi_kerja: programs[programIndex],
        publications: publications
      });
    }
    
    setAllLecturers(lecturers);
    applyLecturerFilters(lecturers);
    
    if (totalPublications === 0) {
      setTotalPublications(pubCount);
    }
  };

  // Toggle lecturer publications
  const toggleLecturerPublications = (lecturerId) => {
    setExpandedLecturers((prev) => ({
      ...prev,
      [lecturerId]: !prev[lecturerId],
    }))
  }

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <p className="text-lg font-bold">
            {data.icon} {data.name.replace("SDGS", "SDG ")}
          </p>
          <p className="text-gray-200">{data.fullName}</p>
          <p className="text-lg mt-2">
            <span className="font-bold">{data.value}</span> publications
          </p>
        </div>
      )
    }
    return null
  }

  // Skeleton component for loading states
  const Skeleton = ({ className }) => <div className={`animate-pulse bg-gray-800 ${className}`}></div>

  // Render pie chart
  const renderPieChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sdgData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name.replace("SDGS", "SDG ")} (${(percent * 100).toFixed(0)}%)`}
            animationDuration={1500}
          >
            {sdgData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => value.replace("SDGS", "SDG ")}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <CCard>
        <CCardBody>
        <h1>Dashboard SDGS</h1>
        <p>Pemetaan 17 Bidang Tujuan Pembangunan Berkelanjutan (SDGs) Dosen Telkom University</p>

          <img
            src="https://dinaspmd.kalselprov.go.id/wp-content/uploads/2023/11/SDGs-Indonesia.jpg"
            alt="Kumpulan data sdgs"
            className="img-fluid"
          />
        </CCardBody>
      </CCard>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r text-white text-transparent bg-clip-text">
            SDG Research Mapping
          </h1>
          <p className="text-gray-400">
            Sustainable Development Goals (SDGs) research contributions from Telkom University lecturers
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            >
              <div className="flex items-center">
                <Icons.Filter />
                <span className="ml-2">Filters</span>
              </div>
              <Icons.ChevronDown className={`transform ${isFilterOpen ? "rotate-180" : ""} transition-transform`} />
            </button>
          </div>

          <div className={`md:block ${isFilterOpen ? "block" : "hidden"}`}>
            <div className="mb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold flex items-center">
                  <Icons.Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <p className="text-gray-400 text-sm mt-1">Filter SDG data by year, faculty, and study program</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Faculty</label>
                    <select
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    >
                      <option value="">All Faculties</option>
                      {facultyList.map((faculty) => (
                        <option key={faculty} value={faculty}>
                          {faculty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Study Program</label>
                    <select
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    >
                      <option value="">All Programs</option>
                      {programList.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-400 mb-2 block">Search</label>
                  <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      placeholder="Search by lecturer name or publication title..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 pl-14 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Lecturers",
              value: totalLecturers,
              description: "Contributing to SDG research",
              icon: <Icons.Users />,
              color: "from-blue-600 to-blue-400",
              delay: 0.2,
            },
            {
              title: "Total Publications",
              value: totalPublications,
              description: "Academic works related to SDGs",
              icon: <Icons.Book />,
              color: "from-green-600 to-green-400",
              delay: 0.3,
            },
            {
              title: "SDGs Covered",
              value: 17,
              description: "All UN Sustainable Development Goals",
              icon: <Icons.Globe />,
              color: "from-purple-600 to-purple-400",
              delay: 0.4,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
            >
              <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10 mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        <motion.p
                          className="text-2xl font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                        >
                          {stat.value.toLocaleString()}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold">SDG Distribution</h2>
                <div className="flex rounded-md overflow-hidden">
                  <button
                    className={`px-4 py-2 flex items-center ${activeChartType === "bar" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                    onClick={() => setActiveChartType("bar")}
                  >
                    <Icons.BarChart2 className="h-4 w-4 mr-2" />
                    Vertical
                  </button>
                  <button
                    className={`px-4 py-2 flex items-center ${activeChartType === "horizontal" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                    onClick={() => setActiveChartType("horizontal")}
                  >
                    <Icons.BarChartHorizontal className="h-4 w-4 mr-2" />
                    Horizontal
                  </button>
                  <button
                    className={`px-4 py-2 flex items-center ${activeChartType === "pie" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                    onClick={() => setActiveChartType("pie")}
                  >
                    <Icons.PieChart className="h-4 w-4 mr-2" />
                    Pie
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <Icons.Loader2 className="h-12 w-12 text-blue-500" />
                </div>
              ) : (
                <div className="h-96">
                  {activeChartType === "bar" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sdgData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#fff" }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          tickFormatter={(value) => value.replace("SDGS", "")}
                        />
                        <YAxis tick={{ fill: "#fff" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" name="Publications" animationDuration={1500}>
                          {sdgData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              className="hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : activeChartType === "horizontal" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={sdgData} margin={{ top: 20, right: 30, left: 120, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis type="number" tick={{ fill: "#fff" }} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          tick={{ fill: "#fff" }}
                          tickFormatter={(value) => `${value.replace("SDGS", "SDG ")} - ${sdgIcons[value]}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" name="Publications" animationDuration={1500}>
                          {sdgData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              className="hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    renderPieChart()
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* SDG Icons Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold">Sustainable Development Goals</h2>
              <p className="text-gray-400 text-sm mt-1">The 17 United Nations Sustainable Development Goals (SDGs)</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Object.keys(sdgTitles).map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center p-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: `${sdgColors[key]}20`,
                      borderLeft: `4px solid ${sdgColors[key]}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full mr-3 text-lg"
                      style={{ backgroundColor: sdgColors[key] }}
                    >
                      {sdgIcons[key]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{key.replace("SDGS", "SDG ")}</p>
                      <p className="text-xs text-gray-400">{sdgTitles[key]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lecturers section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold">Contributing Lecturers</h2>
              <p className="text-gray-400 text-sm mt-1">Telkom University lecturers contributing to SDG research</p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border-b border-gray-800 pb-6">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-24 w-full rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {filteredLecturers.slice(0, displayedLecturerCount).map((lecturer, index) => (
                      <motion.div 
                        key={lecturer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * (index % 5) }}
                        className="border-b border-gray-800 pb-6"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{lecturer.nama_lengkap}</h3>
                              <p className="text-gray-400 text-sm">NIP: {lecturer.id}</p>
                              <p className="text-gray-400 text-sm">Faculty: {lecturer.lokasi_kerja_sotk}</p>
                              <p className="text-gray-400 text-sm">Program: {lecturer.lokasi_kerja}</p>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 bg-opacity-30 text-blue-400 border border-blue-500">
                                {lecturer.publications ? lecturer.publications.length : 0} Publications
                              </span>
                            </div>
                          </div>
                          
                          {lecturer.publications && lecturer.publications.length > 0 && (
                            <button 
                              onClick={() => toggleLecturerPublications(lecturer.id)}
                              className="mt-2 w-full flex items-center justify-between px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-md transition-colors"
                            >
                              <span>View Publications</span>
                              <Icons.ChevronDown className={`h-4 w-4 text-gray-500 transform transition-transform ${expandedLecturers[lecturer.id] ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                          
                          {expandedLecturers[lecturer.id] && lecturer.publications && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 space-y-3 overflow-hidden"
                            >
                              {lecturer.publications.map((pub) => (
                                <motion.div 
                                  key={pub.id || `${lecturer.id}-${pub.Judul}`} 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-gray-800 rounded-lg p-4"
                                >
                                  <p className="font-medium">{pub.Judul}</p>
                                  <p className="text-gray-400 text-sm mb-3">{pub.Penulis} • {pub.Tahun}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {pub.Sdgs && pub.Sdgs.map((sdg) => (
                                      <span 
                                        key={`${pub.id || pub.Judul}-${sdg}`} 
                                        className="px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                        style={{ 
                                          backgroundColor: `${sdgColors[sdg]}20`,
                                          color: sdgColors[sdg],
                                          border: `1px solid ${sdgColors[sdg]}50`
                                        }}
                                      >
                                        {sdgIcons[sdg]} {sdg.replace('SDGS', 'SDG ')}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {filteredLecturers.length > displayedLecturerCount && (
                    <div className="flex justify-center mt-6">
                      <button 
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-colors"
                      >
                        Load More Lecturers
                      </button>
                    </div>
                  )}
                  
                  {filteredLecturers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No lecturers found matching your filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SDGMappingDashboard
