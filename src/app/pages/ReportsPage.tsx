import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import FilterSection from '../components/FilterSection';
import { Search, Download, FileText, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock report data
const reportData = [
  { id: 1, date: '2026-04-15', district: 'Pune', taluka: 'Haveli', officer: 'Rajesh Kumar', crop: 'Rice', pest: 'Bollworm', severity: 'High', status: 'Action Taken' },
  { id: 2, date: '2026-04-14', district: 'Nashik', taluka: 'Mulshi', officer: 'Priya Sharma', crop: 'Wheat', pest: 'Aphids', severity: 'Medium', status: 'Under Review' },
  { id: 3, date: '2026-04-14', district: 'Ahmednagar', taluka: 'Bhor', officer: 'Amit Patil', crop: 'Cotton', pest: 'Whitefly', severity: 'High', status: 'Action Taken' },
  { id: 4, date: '2026-04-13', district: 'Solapur', taluka: 'Maval', officer: 'Sunita Desai', crop: 'Sugarcane', pest: 'Stem Borer', severity: 'Low', status: 'Monitoring' },
  { id: 5, date: '2026-04-13', district: 'Satara', taluka: 'Shirur', officer: 'Vikram Singh', crop: 'Soybean', pest: 'Leaf Miner', severity: 'Medium', status: 'Action Taken' },
  { id: 6, date: '2026-04-12', district: 'Pune', taluka: 'Haveli', officer: 'Rajesh Kumar', crop: 'Cotton', pest: 'Bollworm', severity: 'High', status: 'Action Taken' },
  { id: 7, date: '2026-04-12', district: 'Nashik', taluka: 'Mulshi', officer: 'Priya Sharma', crop: 'Rice', pest: 'Aphids', severity: 'Low', status: 'Monitoring' },
  { id: 8, date: '2026-04-11', district: 'Ahmednagar', taluka: 'Bhor', officer: 'Amit Patil', crop: 'Wheat', pest: 'Whitefly', severity: 'Medium', status: 'Under Review' },
];

type SortField = 'date' | 'district' | 'crop' | 'severity' | 'status';
type SortDirection = 'asc' | 'desc' | null;

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [showExportConfirm, setShowExportConfirm] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = (format: string) => {
    setShowExportConfirm(format);
    setTimeout(() => {
      setShowExportConfirm(null);
    }, 3000);
  };

  // Filter and sort data
  let filteredData = reportData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (sortField && sortDirection) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = String(a[sortField]);
      const bValue = String(b[sortField]);
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-green-600" />
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and export detailed survey reports</p>
        </div>

        {/* Filters */}
        <FilterSection />

        {/* Search and Export */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
              />
              {searchQuery && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {filteredData.length} results
                </span>
              )}
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-2">
                      Date
                      <SortIcon field="date" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('district')}
                  >
                    <div className="flex items-center gap-2">
                      District
                      <SortIcon field="district" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taluka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Officer</th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('crop')}
                  >
                    <div className="flex items-center gap-2">
                      Crop
                      <SortIcon field="crop" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pest</th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('severity')}
                  >
                    <div className="flex items-center gap-2">
                      Severity
                      <SortIcon field="severity" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon field="status" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{row.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.taluka}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.officer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.crop}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.pest}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.severity === 'High'
                            ? 'bg-red-100 text-red-700'
                            : row.severity === 'Medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Action Taken'
                            ? 'bg-green-100 text-green-700'
                            : row.status === 'Under Review'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No reports found matching your search</p>
            </div>
          )}

          {/* Pagination Info */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{reportData.length}</span> reports
            </p>
          </div>
        </div>
      </div>

      {/* Export Confirmation Toast */}
      <AnimatePresence>
        {showExportConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p className="font-medium">Export Started</p>
              <p className="text-sm text-green-100">
                Downloading {showExportConfirm.toUpperCase()} file...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
