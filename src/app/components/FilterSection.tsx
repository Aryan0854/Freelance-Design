import { useState } from "react";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";

export default function FilterSection({
  onFilterChange,
  variant = "pest-intelligence",
}: FilterSectionProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const timelinePresetOptions = ["7 Days", "14 Days", "21 Days", "28 Days", "Custom Range"];
  const isCustomTimelineValue = (val: string) => !timelinePresetOptions.includes(val);

  const defaultFilters =
    variant === "pest-intelligence"
      ? {
          district: "All Districts",
          taluka: "All Talukas",
          crop: "All Crops",
          season: "All Seasons",
          pest: "All Pests",
          disease: "All Diseases",
          timeline: "7 Days",
        }
      : {
          district: "All Districts",
          taluka: "All Talukas",
          officerLevel: "All Levels",
          season: "All Seasons",
          plotType: "All", // ✅ ADDED
          timeline: "7 Days",
        };

  const [filters, setFilters] = useState(defaultFilters);

   const filterOptions: Record<string, string[]> =
     variant === "pest-intelligence"
       ? {
           district: [
             "All Districts",
             "Pune",
             "Nashik",
             "Ahmednagar",
             "Solapur",
             "Satara",
           ],
           taluka: [
             "All Talukas",
             "Haveli",
             "Mulshi",
             "Bhor",
             "Maval",
             "Shirur",
           ],
           crop: [
             "All Crops",
             "Rice",
             "Wheat",
             "Cotton",
             "Sugarcane",
             "Soybean",
           ],
           pest: [
             "All Pests",
             "Bollworm",
             "Aphids",
             "Whitefly",
             "Stem Borer",
             "Leaf Miner",
           ],
           disease: [
             "All Diseases",
             "Bacterial Blight",
             "Leaf Spot",
             "Powdery Mildew",
             "Rust",
             "Wilt",
           ],
           season: ["All Seasons", "Kharif", "Rabi"],
           timeline: ["7 Days", "14 Days", "21 Days", "28 Days", "Custom Range"],
         }
       : {
           district: [
             "All Districts",
             "Pune",
             "Nashik",
             "Ahmednagar",
             "Solapur",
             "Satara",
           ],
           taluka: [
             "All Talukas",
             "Haveli",
             "Mulshi",
             "Bhor",
             "Maval",
             "Shirur",
           ],
           officerLevel: ["All Levels", "AO", "AS"],
           season: ["All Seasons", "Kharif", "Rabi"],
           plotType: ["All", "Fixed", "Random"],
           timeline: ["7 Days", "14 Days", "21 Days", "28 Days", "Custom Range"],
         };

  const handleFilterSelect = (
    filterType: string,
    value: string,
  ) => {
    if (filterType === "timeline" && value === "Custom Range") {
      setFilters((prev) => ({ ...prev, timeline: "Custom Range" }));
      setOpenDropdown("timeline");
      setDateRange({ from: undefined, to: undefined });
      return;
    }

    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (filterType === "timeline") {
      setDateRange({ from: undefined, to: undefined });
    }
    setOpenDropdown(null);
    onFilterChange?.(newFilters);
  };

  const handleDateRangeSelect = () => {
    if (dateRange.from && dateRange.to) {
      const formattedFrom = format(dateRange.from, "MMM d");
      const formattedTo = format(dateRange.to, "MMM d");
      const rangeLabel = `${formattedFrom} - ${formattedTo}`;
      const newFilters = { ...filters, timeline: rangeLabel };
      setFilters(newFilters);
      setOpenDropdown(null);
      onFilterChange?.(newFilters);
    }
  };

  const toggleDropdown = (filterType: string) => {
    setOpenDropdown(
      openDropdown === filterType ? null : filterType,
    );
  };

  const getFilterLabel = (key: string) => {
    const labels: Record<string, string> = {
      district: "District",
      taluka: "Taluka",
      crop: "Crop",
      pest: "Pest",
      disease: "Disease",
      timeline: "Timeline",
      officerLevel: "Officer Level",
      season: "Season",
      plotType: "Plot Type",
    };
    return labels[key] || key;
  };

  const getTimelineDisplayLabel = () => {
    if (filters.timeline === "Custom Range" || !dateRange.from || !dateRange.to) {
      return filters.timeline;
    }
    return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filters
      </h3>

      <div
        className={`grid grid-cols-1 md:grid-cols-3 ${
          variant === "pest-intelligence"
            ? "lg:grid-cols-6"
            : "lg:grid-cols-6" // ✅ UPDATED (was 5)
        } gap-4`}
      >
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getFilterLabel(key)}
            </label>

             <button
               onClick={() => toggleDropdown(key)}
               className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-green-500 transition-colors focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
             >
               <span className="text-sm text-gray-700 truncate">
                 {key === "timeline"
                   ? getTimelineDisplayLabel()
                   : value}
               </span>
               <ChevronDown
                 className={`w-4 h-4 text-gray-500 transition-transform ${
                   openDropdown === key ? "rotate-180" : ""
                 }`}
               />
             </button>

             {/* Dropdown */}
             {openDropdown === key && (
               <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                 {/* Calendar for timeline custom range */}
                 {key === "timeline" && (filters.timeline === "Custom Range" || isCustomTimelineValue(filters.timeline)) && (
                   <div className="p-3 border-b border-gray-100">
                     <div className="flex items-center gap-2 mb-2">
                       <CalendarIcon className="w-4 h-4 text-gray-500" />
                       <span className="text-sm font-medium text-gray-700">
                         {filters.timeline === "Custom Range" ? "Select Date Range" : "Change Date Range"}
                       </span>
                     </div>
                     <Popover>
                       <PopoverTrigger asChild>
                         <button className="w-full mb-2 px-3 py-2 text-sm border border-gray-300 rounded-md text-left text-gray-700 hover:border-green-500">
                           {dateRange.from && dateRange.to
                             ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                             : "Pick a date range"}
                         </button>
                       </PopoverTrigger>
                       <PopoverContent className="w-auto p-0" align="start">
                         <Calendar
                           mode="range"
                           selected={{ from: dateRange.from, to: dateRange.to }}
                           onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                           numberOfMonths={2}
                         />
                       </PopoverContent>
                     </Popover>
                     <button
                       onClick={handleDateRangeSelect}
                       className="w-full px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                       disabled={!dateRange.from || !dateRange.to}
                     >
                       Apply Range
                     </button>
                   </div>
                 )}

                 {/* Options list */}
                 {filterOptions[
                   key as keyof typeof filterOptions
                 ].map((option) => (
                   <button
                     key={option}
                     onClick={() =>
                       handleFilterSelect(key, option)
                     }
                     className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                       value === option ||
                       (key === "timeline" && option === "Custom Range" && isCustomTimelineValue(filters.timeline))
                         ? "bg-green-50 text-green-700 font-medium"
                         : "text-gray-700"
                     }`}
                   >
                     {option}
                   </button>
                 ))}
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}