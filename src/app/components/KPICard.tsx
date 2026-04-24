import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface KPICardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  color:
    | "green"
    | "blue"
    | "orange"
    | "red"
    | "yellow"
    | "purple";
  trend?: string;
  onClick?: () => void;

  // ✅ NEW (for your requirement)
  split?: {
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
  };
}

const colorClasses = {
  green: {
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    icon: "text-green-600",
    text: "text-green-600",
  },
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    icon: "text-blue-600",
    text: "text-blue-600",
  },
  orange: {
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    icon: "text-orange-600",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    icon: "text-red-600",
    text: "text-red-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    icon: "text-yellow-600",
    text: "text-yellow-600",
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    icon: "text-purple-600",
    text: "text-purple-600",
  },
};

export default function KPICard({
  title,
  value,
  split,
  icon: Icon,
  color,
  trend,
  onClick,
}: KPICardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${colors.bg} rounded-xl p-6 border border-gray-200 cursor-pointer transition-shadow hover:shadow-lg`}
    >
      {/* ICON + TREND */}
      <div className="flex items-start justify-between mb-4">
        <div className={`${colors.iconBg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>

        {trend && (
          <span
            className={`text-xs font-medium ${colors.text}`}
          >
            {trend}
          </span>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>

      {/* ✅ CONDITIONAL CONTENT */}
      {split ? (
        <div className="border border-gray-300 rounded-md overflow-hidden">
          {/* TOP LABELS */}
          <div className="grid grid-cols-2 text-xs text-gray-600 bg-gray-100">
            <div className="p-2 border-r text-center">
              {split.leftLabel}
            </div>
            <div className="p-2 text-center">
              {split.rightLabel}
            </div>
          </div>

          {/* VALUES */}
          <div className="grid grid-cols-2">
            <div className="p-3 border-r text-center font-semibold">
              {split.leftValue}
            </div>
            <div className="p-3 text-center font-semibold">
              {split.rightValue}
            </div>
          </div>
        </div>
      ) : (
        <p className={`text-3xl font-bold ${colors.text}`}>
          {value}
        </p>
      )}
    </motion.div>
  );
}