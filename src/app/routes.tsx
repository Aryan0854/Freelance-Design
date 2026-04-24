import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ETLReportsPage from "./pages/ETLReportsPage";
import NearETLReportsPage from "./pages/NearETLReportsPage";
import ZeroReportingPage from "./pages/ZeroReportingPage";
import FixedPlotReportsPage from "./pages/FixedPlotReportsPage";
import RandomPlotReportsPage from "./pages/RandomPlotReportsPage";

// Get base path from environment or default for GitHub Pages
const basePath = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter([
  {
    path: basePath,
    Component: LoginPage,
  },
  {
    path: `${basePath}dashboard`,
    Component: DashboardPage,
  },
  {
    path: `${basePath}reports`,
    Component: ReportsPage,
  },
  {
    path: `${basePath}reports/etl`,
    Component: ETLReportsPage,
  },
  {
    path: `${basePath}reports/near-etl`,
    Component: NearETLReportsPage,
  },
  {
    path: `${basePath}reports/zero`,
    Component: ZeroReportingPage,
  },
  {
    path: `${basePath}reports/fixed`,
    Component: FixedPlotReportsPage,
  },
  {
    path: `${basePath}reports/random`,
    Component: RandomPlotReportsPage,
  },
  {
    path: `${basePath}forgot-password`,
    Component: ForgotPasswordPage,
  },
]);
