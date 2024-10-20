import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { ageAndSexChart } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { viralloadAgeData, getReportDatesData} from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { dualAxisChart } from '../../../utils/chatUtils/dualAxisChart';
import patternFill from 'highcharts/modules/pattern-fill';
import { getLastElemnts, removeElemnts, removeLastElemnts } from '../../../utils/helpers';

// Initialize the pattern-fill module
patternFill(Highcharts);
const VlAgeDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState({
  //  chartData: {},
   statsData: {} as { [key: string]: any },
    vlChart: {},
  });

 

  const fetchMap = useCallback(async () => {
    try {
   
      
      const data = await viralloadAgeData(userData.stateId);
      let ageGroups = removeElemnts(data.ageGroups)

      let eligible:[] = data.eligible;
      let sampleCollection:[] = data.sampleCollection;
      let resultRecieved:[] = data.resultRecieved;
      let suppression:[] = data.suppression;
    
      let series = {
        eligible:removeLastElemnts(eligible),
        sampleCollection:removeLastElemnts(sampleCollection),
        resultRecieved:removeLastElemnts(resultRecieved),
        suppression:removeLastElemnts(suppression)
      }

      let vl_stats = {
        txCurr:getLastElemnts(data.txCurr),
        eligible:getLastElemnts(eligible),
        sampleCollection:getLastElemnts(sampleCollection),
        resultRecieved:getLastElemnts(resultRecieved),
        suppression:getLastElemnts(suppression),
        unSuppression:getLastElemnts(resultRecieved) - getLastElemnts(suppression)
      }
   
      console.log(series)
      setState((prevState) => ({
       statsData: vl_stats,
        vlChart: dualAxisChart('Viralload suppression by age and sex', '', '',ageGroups, series),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
     // window.location.href = '/login'; // Redirect to login page
    }
  }, [userData.stateId]);


  useEffect(() => {
    fetchMap();
  }, [userData.stateId]);


  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Viralload Report By Age and Sex Dashboard" />
      <div className="row">
       <div className="col-12 col-md-12">
          <div className="row">
            <div className="col-2 col-md-2">

              <SmallCard title="HIV Clients on Treatment" value={state.statsData?.txCurr} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Eligible for VL" value={state.statsData?.eligible} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Sample Collected" value={state.statsData?.sampleCollection} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Result Received" value={state.statsData?.resultRecieved} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Viral load < 1000 cop /mil" value={state.statsData?.suppression} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Viralload > 1000 cop / mi" value={state.statsData?.unSuppression} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12">
          <HighchartsReact highcharts={Highcharts} options={state.vlChart} />
        </div>
      
      </div>
    
    </div>
  );
};

export default VlAgeDashboard;
