import  { lazy } from "react";
import {useRoutes } from "react-router-dom";
import MainLayout from "./components/Layout";
import TreamentTrendDashboard from "./pages/dashboards/treamentTrendDashboard";
import Appointments from "./pages/dashboards/appointments";
import CDRDashboard from "./components/Layout/cdr";
import CdrInnerPages from "./components/Layout/cdrInnerPages";
import ExternalLayout from "./components/Layout/external";

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'));
const SignIn = lazy(() => import('./pages/signIn'));
const SummaryBoard = lazy(() => import('./pages/dashboards/summaryDashboard'));
const OvcBoard = lazy(() => import('./pages/dashboards/ovcDashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

const NcdsDashboard = lazy(() => import('./pages/dashboards/NcdDashboard'));
const MentalHealthDashboard = lazy(() => import('./pages/dashboards/mentalHealthDashboard'));
const VlDashboard = lazy(() => import('./pages/dashboards/vlDashboard'));
const VlAgeDashboard = lazy(() => import('./pages/dashboards/vlAgeDashboard'));
const TreamentDashboard = lazy(() => import('./pages/dashboards/treamentDashboard'));
const SaturationDashboard = lazy(() => import('./pages/dashboards/saturationDashboard'));
const Slideshow = lazy(() => import('./pages/dashboards/slideShow'));
const ColeraDashboard = lazy(() => import('./pages/dashboards/coleraDashboard'));
const YellowFeverDashboard = lazy(() => import('./pages/dashboards/yellowFeverDashboard'));
const MeaslesDashboard = lazy(() => import('./pages/dashboards/measlesDashboard'));
const MonkeyPoxDashboard = lazy(() => import('./pages/dashboards/monkeyPoxDashboard'));
const LassaDashboard = lazy(() => import('./pages/dashboards/lassaDashboard'));
const DropZone = lazy(() => import('./pages/reports/uploadData'));
const MainGrid = lazy(() => import('./pages/reports/previousUpload'));
const UploadTracker = lazy(() => import('./pages/reports/lineList/uploadTracker'));
const GenerateLineList = lazy(() => import('./pages/reports/lineList/generateLineList'));

const CdrDashboard = lazy(() => import('./pages/cdr-pages/dashboard'));
const CaseManagerScoreBoard = lazy(() => import('./pages/cdr-pages/caseManagerScoreBoard'));




const routes = [
  { path: '/', element: <SignIn /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/dashboard', element: <SummaryBoard />, layout: MainLayout },
  { path: '/ovc-dashboard', element: <OvcBoard />, layout: ExternalLayout },
  { path: '/user-profile', element: <UserProfile />, layout: CdrInnerPages },
/*   { path: '/upload-data', element: <DropZone />, layout: MainLayout },
  { path: '/previous-upload', element: <MainGrid />, layout: MainLayout },/*  */
/*   { path: '/upload-tracker', element: <UploadTracker />, layout: MainLayout },
  { path: '/generate-linelist', element: <GenerateLineList />, layout: MainLayout },  */
  { path: '/ncd', element: <NcdsDashboard />, layout: MainLayout },
  { path: '/mental-health', element: <MentalHealthDashboard />, layout: MainLayout },
  { path: '/vl', element: <VlDashboard />, layout: MainLayout },
  { path: '/vl-age-sex', element: <VlAgeDashboard />, layout: MainLayout },
  { path: '/treatment', element: <TreamentDashboard />, layout: MainLayout },
  { path: '/treatment-trend', element: <TreamentTrendDashboard />, layout: MainLayout },
  { path: '/saturation', element: <SaturationDashboard />, layout: MainLayout },
  { path: '/slide-show', element: <Slideshow />, layout: MainLayout },
  { path: '/cholera', element: <ColeraDashboard />, layout: MainLayout },
  { path: '/yellow-fever', element: <YellowFeverDashboard />, layout: MainLayout },
  { path: '/measles', element: <MeaslesDashboard />, layout: MainLayout },
  { path: '/monkey-pox', element: <MonkeyPoxDashboard />, layout: MainLayout },
  { path: '/lassa', element: <LassaDashboard />, layout: MainLayout },
  { path: '/appointments', element: <Appointments />, layout: MainLayout },

// CDR pages
  { path: '/cdr-dashboard', element: <CdrDashboard />, layout: CDRDashboard },
  { path: '/casemanagers-score-board', element: <CaseManagerScoreBoard />, layout: CdrInnerPages },
  { path: '/upload-data', element: <DropZone />, layout: CdrInnerPages },
  { path: '/previous-upload', element: <MainGrid />, layout: CdrInnerPages },
  { path: '/upload-tracker', element: <UploadTracker />, layout: CdrInnerPages },
  { path: '/generate-linelist', element: <GenerateLineList />, layout: CdrInnerPages },

  { path: '/cdr-vl', element: <VlDashboard />, layout: CdrInnerPages },
  { path: '/cdr-vl-age-sex', element: <VlAgeDashboard />, layout: CdrInnerPages },
  { path: '/cdr-treatment', element: <TreamentDashboard />, layout: CdrInnerPages },
  { path: '/cdr-treatment-trend', element: <TreamentTrendDashboard />, layout: CdrInnerPages },

];

const ProjectRoutes = () => {
  const element = useRoutes(
    routes.map(({ path, element, layout: LayoutComponent }) => ({
      path,
      element: LayoutComponent ? <LayoutComponent>{element}</LayoutComponent> : element,
    }))
  );

  return element;
};

export default ProjectRoutes;
