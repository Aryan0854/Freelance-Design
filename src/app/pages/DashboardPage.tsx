import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import FilterSection from "../components/FilterSection";
import KPICard from "../components/KPICard";
import DetailModal from "../components/DetailModal";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Bug,
  AlertTriangle,
  Search,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Shield,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";

// Mock data for Pest Infestation Intelligence
const districtIncidenceData = [
  {
    name: "Pune",
    surveys: 520,
    etl: 45,
    netl: 78,
    etlPercent: 8.7,
    netlPercent: 15.0,
    suspicious: 12,
  },
  {
    name: "Nashik",
    surveys: 410,
    etl: 38,
    netl: 62,
    etlPercent: 9.3,
    netlPercent: 15.1,
    suspicious: 8,
  },
  {
    name: "Ahmednagar",
    surveys: 450,
    etl: 52,
    netl: 85,
    etlPercent: 11.6,
    netlPercent: 18.9,
    suspicious: 15,
  },
  {
    name: "Solapur",
    surveys: 340,
    etl: 28,
    netl: 48,
    etlPercent: 8.2,
    netlPercent: 14.1,
    suspicious: 6,
  },
  {
    name: "Satara",
    surveys: 380,
    etl: 35,
    netl: 58,
    etlPercent: 9.2,
    netlPercent: 15.3,
    suspicious: 9,
  },
];

const pestIncidenceData = [
  {
    location: "Pune - Haveli",
    pest: "Bollworm",
    crop: "Cotton",
    surveys: 120,
    etl: 12,
    netl: 18,
    suspicious: "5/2",
    prediction: "H",
  },
  {
    location: "Nashik - Dindori",
    pest: "Aphids",
    crop: "Soybean",
    surveys: 95,
    etl: 8,
    netl: 14,
    suspicious: "3/1",
    prediction: "M",
  },
  {
    location: "Ahmednagar - Rahuri",
    pest: "Whitefly",
    crop: "Cotton",
    surveys: 110,
    etl: 15,
    netl: 22,
    suspicious: "7/3",
    prediction: "H",
  },
  {
    location: "Solapur - Barshi",
    pest: "Stem Borer",
    crop: "Sugarcane",
    surveys: 85,
    etl: 6,
    netl: 10,
    suspicious: "2/1",
    prediction: "L",
  },
  {
    location: "Satara - Karad",
    pest: "Bollworm",
    crop: "Cotton",
    surveys: 100,
    etl: 10,
    netl: 16,
    suspicious: "4/2",
    prediction: "M",
  },
];

// Mock data for Survey Cadence & Action
const leaderboardData = [
  {
    rank: 1,
    location: "Ahmednagar",
    etlNetl: 137,
    actions: 125,
    score: 95.2,
  },
  {
    rank: 2,
    location: "Pune",
    etlNetl: 123,
    actions: 110,
    score: 92.8,
  },
  {
    rank: 3,
    location: "Satara",
    etlNetl: 93,
    actions: 85,
    score: 88.5,
  },
  {
    rank: 4,
    location: "Nashik",
    etlNetl: 100,
    actions: 88,
    score: 85.3,
  },
  {
    rank: 5,
    location: "Solapur",
    etlNetl: 76,
    actions: 65,
    score: 81.7,
  },
];

const officerData = [
  {
    name: "Rajesh Kumar",
    geography: "Pune - Haveli",
    completedFixed: 85,
    completedRandom: 35,
    onTime: 95,
    late: 25,
    etl: 12,
    netl: 18,
    nil: 8,
    anomaly: 2,
    actions: 28,
    score: 92.5,
  },
  {
    name: "Priya Sharma",
    geography: "Nashik - Dindori",
    completedFixed: 70,
    completedRandom: 25,
    onTime: 78,
    late: 17,
    etl: 8,
    netl: 14,
    nil: 5,
    anomaly: 1,
    actions: 20,
    score: 88.3,
  },
  {
    name: "Amit Patil",
    geography: "Ahmednagar - Rahuri",
    completedFixed: 90,
    completedRandom: 38,
    onTime: 102,
    late: 26,
    etl: 15,
    netl: 22,
    nil: 6,
    anomaly: 3,
    actions: 35,
    score: 94.8,
  },
  {
    name: "Sunita Desai",
    geography: "Solapur - Barshi",
    completedFixed: 60,
    completedRandom: 20,
    onTime: 65,
    late: 15,
    etl: 6,
    netl: 10,
    nil: 4,
    anomaly: 1,
    actions: 14,
    score: 82.1,
  },
  {
    name: "Vikram Singh",
    geography: "Satara - Karad",
    completedFixed: 75,
    completedRandom: 30,
    onTime: 88,
    late: 17,
    etl: 10,
    netl: 16,
    nil: 7,
    anomaly: 2,
    actions: 24,
    score: 86.9,
  },
];

export default function DashboardPage() {
  const [selectedModal, setSelectedModal] = useState<
    string | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(
    "pest-intelligence",
  );

  const handleKPIClick = (type: string) => {
    setSelectedModal(type);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor pest infestation and survey performance
            across Maharashtra
          </p>
        </div>

        {/* Tabbed Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-2 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="pest-intelligence"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Bug className="w-4 h-4 mr-2" />
              Pest Infestation Intelligence
            </TabsTrigger>
            <TabsTrigger
              value="survey-cadence"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Survey Cadence & Action
            </TabsTrigger>
          </TabsList>

          {/* Pest Infestation Intelligence Tab */}
          <TabsContent
            value="pest-intelligence"
            className="space-y-6 mt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Filters */}
              <FilterSection variant="pest-intelligence" />

              {/* KPI Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Active ETL Villages"
                    value="218"
                    icon={AlertTriangle}
                    color="red"
                    trend="+12 this week"
                    onClick={() => handleKPIClick("active-etl")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Near ETL Villages"
                    value="365"
                    icon={Search}
                    color="orange"
                    trend="+8 this week"
                    onClick={() => handleKPIClick("near-etl")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Suspicious Villages"
                    value="50"
                    icon={Bug}
                    color="yellow"
                    trend="+3 this week"
                    onClick={() => handleKPIClick("suspicious")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Predictive Infested"
                    value="142"
                    icon={TrendingUp}
                    color="blue"
                    trend="+5 this week"
                    onClick={() => handleKPIClick("predictive")}
                  />
                </motion.div>
              </motion.div>

              {/* Map Visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Current Infestation Map
                  </h3>
                  <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg h-80 flex items-center justify-center border-2 border-green-200 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-center relative z-10">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-700 font-medium">
                        Maharashtra ETL/N-ETL Distribution
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm">
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">
                            ETL / N-ETL
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">
                            Farmer Reports
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">
                            Prediction
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">
                            No Incidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Prediction & Alert Map
                  </h3>
                  <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-80 flex items-center justify-center border-2 border-blue-200 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-center relative z-10">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-700 font-medium">
                        Predictive Pest Infestation Analysis
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm">
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">
                            High Risk
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">
                            Medium Risk
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">
                            Low Risk
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">
                            Safe
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* District/Taluka/Village Incidence Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    District / Taluka / Village Incidence
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Surveys
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # N-ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          % ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          % N-ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Suspicious
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {districtIncidenceData.map(
                        (row, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowClick(row)}
                            className="hover:bg-green-50 cursor-pointer transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                              {row.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.surveys}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                {row.etl}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                {row.netl}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.etlPercent}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {row.netlPercent}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                {row.suspicious}
                              </span>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pest Incidence Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pest Incidence
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Pest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Crop
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Surveys
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # N-ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Suspicious
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Prediction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pestIncidenceData.map((row, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(row)}
                          className="hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {row.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.pest}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.crop}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.surveys}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              {row.etl}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                              {row.netl}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.suspicious}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                row.prediction === "H"
                                  ? "bg-red-100 text-red-700"
                                  : row.prediction === "M"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {row.prediction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Survey Cadence & Action Tab */}
          <TabsContent
            value="survey-cadence"
            className="space-y-6 mt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Filters */}
              <FilterSection variant="survey-cadence" />

              {/* KPI Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Survey Completion Stage"
                    icon={CheckCircle2}
                    color="green"
                    trend="+5% this week"
                    split={{
                      leftLabel: "Fixed Plots",
                      leftValue: "XX",
                      rightLabel: "Random Plots",
                      rightValue: "XX",
                    }}
                    onClick={() => handleKPIClick("completion")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="On-Time Completion %"
                    value="76%"
                    icon={Clock}
                    color="blue"
                    trend="+3% this week"
                    onClick={() => handleKPIClick("ontime")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Nil Reporting %"
                    value="12%"
                    icon={XCircle}
                    color="orange"
                    trend="-2% this week"
                    onClick={() => handleKPIClick("nil")}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <KPICard
                    title="Action Taken"
                    value="68%"
                    icon={Shield}
                    color="purple"
                    trend="+8% this week"
                    onClick={() => handleKPIClick("action")}
                  />
                </motion.div>
              </motion.div>

              {/* Leaderboard Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Leaderboard
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          District/Taluka
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # ETL/N-ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          # Actions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Composite Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {leaderboardData.map((row) => (
                        <tr
                          key={row.rank}
                          onClick={() => handleRowClick(row)}
                          className="hover:bg-green-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {row.rank === 1 && (
                                <Trophy className="w-4 h-4 text-yellow-500" />
                              )}
                              {row.rank === 2 && (
                                <Trophy className="w-4 h-4 text-gray-400" />
                              )}
                              {row.rank === 3 && (
                                <Trophy className="w-4 h-4 text-orange-500" />
                              )}
                              <span className="font-medium text-gray-900">
                                #{row.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {row.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.etlNetl}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.actions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                                <div
                                  className="bg-green-600 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${row.score}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {row.score}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Officer-wise Survey Status Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Officer-wise Survey Status
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Officer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Geography
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Completed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Timely
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          ETL/N-ETL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Zero Reporting
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Corrected
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Action Taken
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {officerData.map((row, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(row)}
                          className="hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {row.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {row.geography}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.completedFixed}/
                            {row.completedRandom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="text-green-700">
                              {row.onTime}
                            </span>
                            /
                            <span className="text-red-700">
                              {row.late}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.etl}/{row.netl}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.nil}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.anomaly}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {row.actions}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {row.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* KPI Detail Modal */}
      <DetailModal
        isOpen={selectedModal !== null}
        onClose={() => setSelectedModal(null)}
        title={
          selectedModal === "active-etl"
            ? "Active ETL Villages Details"
            : selectedModal === "near-etl"
              ? "Near ETL Villages Details"
              : selectedModal === "suspicious"
                ? "Suspicious Villages Details"
                : selectedModal === "predictive"
                  ? "Predictive Pest Infested Villages Details"
                  : selectedModal === "completion"
                    ? "Survey Completion Details"
                    : selectedModal === "ontime"
                      ? "On-Time Completion Details"
                      : selectedModal === "nil"
                        ? "Nil Reporting Details"
                        : "Action Taken Details"
        }
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              Overview
            </h4>
            <p className="text-gray-600 text-sm">
              Detailed breakdown and analysis across all
              districts and talukas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">
                Total Villages
              </p>
              <p className="text-2xl font-bold text-blue-900">
                2,845
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">
                Monitored
              </p>
              <p className="text-2xl font-bold text-green-900">
                2,100
              </p>
            </div>
          </div>
        </div>
      </DetailModal>

      {/* Row Detail Modal */}
      <DetailModal
        isOpen={selectedRow !== null}
        onClose={() => setSelectedRow(null)}
        title={
          selectedRow?.name ||
          selectedRow?.location ||
          "Details"
        }
      >
        {selectedRow && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedRow).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-600 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {String(value)}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </DetailModal>
    </DashboardLayout>
  );
}