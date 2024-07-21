import React  from "react";
import {useRoutes} from "react-router-dom"
import SummaryBoard from "./pages/summaryDashboard";
import NcdsDashboard from "./pages/NcdDashboard";
import VlDashboard from "./pages/vlDashboard";
import TreamentDashboard from "./pages/treamentDashboard";
import Somas from "./pages/somasDashboard";
import SaturationDashboard from "./pages/saturationDashboard";
import VlAgeDashboard from "./pages/vlAgeDashboard";
import MentalHealthDashboard from "./pages/mentalHealthDashboard";


const ProjectRoutes = () => {
    let element =  useRoutes(
        [
            {path:"/", element:<SummaryBoard/>},
            {path:"/ncd", element:<NcdsDashboard/>},
            {path:"/mental-health", element:<MentalHealthDashboard/>},
            {path:"/vl", element:<VlDashboard/>},
            {path:"/vl-age-sex", element:<VlAgeDashboard/>},
            {path:"/treatment", element:<TreamentDashboard/>},
            {path:"/saturation", element:<SaturationDashboard/>},
            {path:"/somas", element:<Somas/>},

        ]
    )
    return element
}

export default ProjectRoutes