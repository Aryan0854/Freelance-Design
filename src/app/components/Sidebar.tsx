import { useState } from 'react';
import { LayoutDashboard, FileText, ChevronDown, Bug, ClipboardList } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const mainMenuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Reports',
      icon: FileText,
      path: '/reports',
    },
  ];

  const incidenceSubItems = [
    { name: 'ETL Reports', path: '/reports/etl' },
    { name: 'Near ETL Reports', path: '/reports/near-etl' },
  ];

  const surveySubItems = [
    { name: 'Zero Reporting', path: '/reports/zero' },
    { name: 'Fixed Plot Reports', path: '/reports/fixed' },
    { name: 'Random Plot Reports', path: '/reports/random' },
  ];

  const isIncidenceActive = incidenceSubItems.some(item => location.pathname === item.path);
  const isSurveyActive = surveySubItems.some(item => location.pathname === item.path);

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate();
    }
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-[calc(100vh-209px)] sticky top-[209px] transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'
      }`}
    >
      <nav className="p-4 space-y-2">
        {/* Main Menu Items */}
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}

        {/* Incidence Reports Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => toggleMenu('incidence')}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              expandedMenu === 'incidence' || isIncidenceActive
                ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bug className={`w-5 h-5 ${expandedMenu === 'incidence' || isIncidenceActive ? 'text-green-600' : 'text-gray-500'}`} />
              <span>Incidence Reports</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedMenu === 'incidence' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedMenu === 'incidence' && (
            <div className="ml-4 space-y-1">
              {incidenceSubItems.map((subItem) => {
                const isActive = location.pathname === subItem.path;
                return (
                  <button
                    key={subItem.path}
                    onClick={() => handleNavigation(subItem.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FileText className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">{subItem.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Survey Reports Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => toggleMenu('survey')}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              expandedMenu === 'survey' || isSurveyActive
                ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ClipboardList className={`w-5 h-5 ${expandedMenu === 'survey' || isSurveyActive ? 'text-green-600' : 'text-gray-500'}`} />
              <span>Survey Reports</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedMenu === 'survey' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedMenu === 'survey' && (
            <div className="ml-4 space-y-1">
              {surveySubItems.map((subItem) => {
                const isActive = location.pathname === subItem.path;
                return (
                  <button
                    key={subItem.path}
                    onClick={() => handleNavigation(subItem.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FileText className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">{subItem.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}