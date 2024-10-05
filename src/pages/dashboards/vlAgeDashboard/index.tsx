import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { ageAndSexChart } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { viralloadAgeData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const VlAgeDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);
  //Add TODO Please impliment Unsupressed as part of the cards
  const [state, setState] = useState({
    chartData: {},
    loading: false,
    statsData: {} as { [key: string]: any },
    vlCoverage: {},
    vlSuppression: {},
    showPopup: false,
  });

  const fetchMap = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await viralloadAgeData(userData.stateId);
      if (!data.vl_stats) {
        throw new Error('Data is undefined');
      }
	
      setState((prevState) => ({
        ...prevState,
        statsData: data.vl_stats[0],
        vlCoverage: ageAndSexChart('Viralload Coverage by age and sex'),
        vlSuppression: ageAndSexChart('Viralload suppression by age and sex'),
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      window.location.href = '/login'; // Redirect to login page
    }
  }, [userData.stateId]);

  console.log(state.statsData)

  const checkInternetConnection = useCallback(() => {
    if (!navigator.onLine) {
      setState((prevState) => ({ ...prevState, showPopup: true }));
    }
  }, []);

  useEffect(() => {
    fetchMap();
    const interval = setInterval(checkInternetConnection, 5000);
    return () => clearInterval(interval);
  }, [fetchMap, checkInternetConnection]);

  const handleLogin = () => {
    window.location.reload();
  };

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Viralload Report By Age and Sex Dashboard" />
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="row">
            <SmallCard title="HIV Clients on Treatment" value={state.statsData?.txCurr} />
            <SmallCard title="Eligible for VL" value={state.statsData?.eligible} />
            <SmallCard title="Sample Collected" value={state.statsData?.sampleCollect} />
            <SmallCard title="Result Received" value={state.statsData?.result} />
            <SmallCard title="Viral load < 1000 cop /mil" value={state.statsData?.suppression} />
            <SmallCard title="Viralload > 1000 cop / mi" value="4000" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <HighchartsReact highcharts={Highcharts} options={state.vlCoverage} />
        </div>
        <div className="col-12 col-md-6">
          <HighchartsReact highcharts={Highcharts} options={state.vlSuppression} />
        </div>
      </div>
      {state.showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Internet connection lost. Please log in again.</p>
            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VlAgeDashboard;
