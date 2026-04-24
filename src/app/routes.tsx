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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/reports",
    Component: ReportsPage,
  },
  {
    path: "/reports/etl",
    Component: ETLReportsPage,
  },
  {
    path: "/reports/near-etl",
    Component: NearETLReportsPage,
  },
  {
    path: "/reports/zero",
    Component: ZeroReportingPage,
  },
  {
    path: "/reports/fixed",
    Component: FixedPlotReportsPage,
  },
  {
    path: "/reports/random",
    Component: RandomPlotReportsPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
]);
