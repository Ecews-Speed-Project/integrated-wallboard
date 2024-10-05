import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./components/Layout";

// Lazy load components
const SignIn = lazy(() => import('./pages/signIn'));
const SummaryBoard = lazy(() => import('./pages/dashboards/summaryDashboard'));
const NcdsDashboard = lazy(() => import('./pages/dashboards/NcdDashboard'));
const MentalHealthDashboard = lazy(() => import('./pages/dashboards/mentalHealthDashboard'));
const VlDashboard = lazy(() => import('./pages/dashboards/vlDashboard'));
const VlAgeDashboard = lazy(() => import('./pages/dashboards/vlAgeDashboard'));
const TreamentDashboard = lazy(() => import('./pages/dashboards/treamentDashboard'));
const SaturationDashboard = lazy(() => import('./pages/dashboards/saturationDashboard'));
const Somas = lazy(() => import('./pages/dashboards/somasDashboard'));
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

const routes = [
  { path: '/', element: <SignIn /> },
  { path: '/dashboard', element: <SummaryBoard />, layout: MainLayout },
  { path: '/upload-data', element: <DropZone />, layout: MainLayout },
  { path: '/previous-upload', element: <MainGrid />, layout: MainLayout },
  { path: '/upload-tracker', element: <UploadTracker />, layout: MainLayout },
  { path: '/generate-linelist', element: <GenerateLineList />, layout: MainLayout },
  { path: '/ncd', element: <NcdsDashboard />, layout: MainLayout },
  { path: '/mental-health', element: <MentalHealthDashboard />, layout: MainLayout },
  { path: '/vl', element: <VlDashboard />, layout: MainLayout },
  { path: '/vl-age-sex', element: <VlAgeDashboard />, layout: MainLayout },
  { path: '/treatment', element: <TreamentDashboard />, layout: MainLayout },
  { path: '/saturation', element: <SaturationDashboard />, layout: MainLayout },
  { path: '/slide-show', element: <Slideshow />, layout: MainLayout },
  { path: '/cholera', element: <ColeraDashboard />, layout: MainLayout },
  { path: '/yellow-fever', element: <YellowFeverDashboard />, layout: MainLayout },
  { path: '/measles', element: <MeaslesDashboard />, layout: MainLayout },
  { path: '/monkey-pox', element: <MonkeyPoxDashboard />, layout: MainLayout },
  { path: '/lassa', element: <LassaDashboard />, layout: MainLayout },
];

const ProjectRoutes = () => {
  const isLoggedIn = false;

  const element = useRoutes(
    routes.map(({ path, element, layout: LayoutComponent }) => ({
      path,
      element: LayoutComponent ? <LayoutComponent>{element}</LayoutComponent> : element,
    }))
  );

  return element;
};

export default ProjectRoutes;
