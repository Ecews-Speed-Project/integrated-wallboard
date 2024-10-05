import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getCoverageData, getMap, getSuppressionData, hivMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { viralloadData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

highchartsMap(Highcharts);

const VlDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [state, setState] = useState({
    loading: false,
    vlCoverage: {},
    vlSuppression: {},
    statsData: {} as { [key: string]: any },
  });

  const fetchMap = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await viralloadData(userData.stateId);
	  if (!data.vl_lga) {
        throw new Error('Data is undefined');
      }
	
      const map = await getMap(userData.state ?? undefined);
      const suppressionData = await getSuppressionData(data.vl_lga);
      const coverageData = await getCoverageData(data.vl_lga);

      setState({
        loading: false,
        statsData: data?.stats,
        vlCoverage: hivMap(map, coverageData, 'Viralload Coverage by LGA', 800),
        vlSuppression: hivMap(map, suppressionData, 'Viralload Suppression by LGA', 800),
      });
    } catch (error) {
      console.error('Error fetching map data:', error);
	  window.location.href = '/login'; // Redirect to login page
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [userData.state, userData.stateId]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Viralload Report Dashboard" />
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="row">
            <SmallCard title="HIV Clients on Treatment" value={state.statsData.txCurrent} />
            <SmallCard title="Eligible for VL" value={state.statsData.vlEligible} />
            <SmallCard title="Sample Collected" value={state.statsData.vLtoPCRLab} />
            <SmallCard title="Result Received" value={state.statsData.vLenteredEMR} />
            <SmallCard title="Coverage" value={`${Math.round((state.statsData.vLenteredEMR / state.statsData.vlEligible) * 100)}%`} />
            <SmallCard title="Viral load < 1000 cop /mil" value={state.statsData.vlSuppressed} />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <HighchartsReact
            constructorType="mapChart"
            highcharts={Highcharts}
            options={state.vlCoverage}
          />
        </div>
        <div className="col-12 col-md-6">
          <HighchartsReact
            constructorType="mapChart"
            highcharts={Highcharts}
            options={state.vlSuppression}
          />
        </div>
      </div>
    </div>
  );
};

export default VlDashboard;
