import DashboardLayout from "../components/DashboardLayout";
import FilterSection from "../components/FilterSection";

export default function ETLReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ETL Reports</h1>
          <p className="text-gray-600 mt-1">
            Detailed Economic Threshold Level (ETL) incidence reports
          </p>
        </div>

        {/* Filters */}
        <FilterSection variant="pest-intelligence" />

        {/* Placeholder Content */}
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500">ETL report data and visualizations will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
