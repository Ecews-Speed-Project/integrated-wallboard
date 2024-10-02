import React, { lazy }  from "react";
import {Navigate, useRoutes} from "react-router-dom"
import Layout from "./components/Layout";
import { useAuth } from "./auth/authContext ";
import ColeraDashboard from "./pages/coleraDashboard";
import YellowFeverDashboard from "./pages/yellowFeverDashboard";
import MeaslesDashboard from "./pages/measlesDashboard";
import MonkeyPoxDashboard from "./pages/monkeyPoxDashboard";
import LassaDashboard from "./pages/lassaDashboard";
import DropZone from "./pages/uploadData";
import MainGrid from "./pages/previousUpload";
import UploadTracker from "./pages/lineListUpload/uploadTracker";
import GenerateLineList from "./pages/lineListUpload/generateLineList";


const SignIn = lazy(() => import('./pages/signIn'));
const SummaryBoard = lazy(() => import('./pages/summaryDashboard'));
const NcdsDashboard = lazy(() => import('./pages/NcdDashboard'));
const MentalHealthDashboard = lazy(() => import('./pages/mentalHealthDashboard'));
const VlDashboard = lazy(() => import('././pages/vlDashboard'));
const VlAgeDashboard = lazy(() => import('./pages/vlAgeDashboard'));
const TreamentDashboard = lazy(() => import('./pages/treamentDashboard'));
const SaturationDashboard = lazy(() => import('./pages/saturationDashboard'));
const Somas = lazy(() => import('./pages/somasDashboard'));
const Slideshow = lazy(() => import('./pages/slideShow'));

const ProjectRoutes = () => {

    const { isLoggedIn } = useAuth();

    let element =  useRoutes(

        [
            { path: '/login', element: <SignIn /> },
            {
                path: '/',
                
                 element: isLoggedIn ? <Layout /> : <SignIn />,
                children: [
                    {path:"", element:<SummaryBoard/>},
                    {path:"/summary", element:<SummaryBoard/>},
                    {path:"/upload-data", element:<DropZone/>},
                    {path:"/previous-upload", element:<MainGrid/>},
                    {path:"/upload-tracker", element:<UploadTracker/>},
                    {path:"/generate-linelist", element:<GenerateLineList/>},

                    {path:"/soma", element:<Somas/>},

                    {path:"/ncd", element:<NcdsDashboard/>},
                    {path:"/mental-health", element:<MentalHealthDashboard/>},
                    {path:"/vl", element:<VlDashboard/>},
                    {path:"/vl-age-sex", element:<VlAgeDashboard/>},
                    {path:"/treatment", element:<TreamentDashboard/>},
                    {path:"/saturation", element:<SaturationDashboard/>},
                    {path:"/slide-show", element:<Slideshow/>},
                    //somas
                    {path:"/cholera", element:<ColeraDashboard/>},
                    {path:"/yellow-fever", element:<YellowFeverDashboard/>},
                    {path:"/measles", element:<MeaslesDashboard/>},
                    {path:"/monkey-pox", element:<MonkeyPoxDashboard/>},
                    {path:"/lassa", element:<LassaDashboard/>},
                    // Add other routes here
                ],
            },
        ]
      
    )
    return element
}

export default ProjectRoutes