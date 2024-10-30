import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getCoverageData, getMap, getNigeriaMapData, getNigeriaMapForCoverageData, getNigeriaMapForSupressionData, getSuppressionData, hivMap, hivStateMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { getReportDatesData, viralloadAgeData, viralloadData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getLastElemnts, getStateById, Shimmer, State } from '../../../utils/helpers';
import { ERROR_FETCHING_DATA, VLC_BY_LGA_MAP_TITLE, VLC_BY_STATE_MAP_TITLE, VLS_BY_LGA_MAP_TITEL, VLS_BY_STATE_MAP_TITLE } from '../../../utils/constants'
highchartsMap(Highcharts);

const VlDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const filteredState = useSelector((state: RootState) => state.menu.value);

  const [state, setState] = useState({
    loading: false,
    vlCoverage: {},
    vlSuppression: {},
    statsData: {} as { [key: string]: any },
  });

  const fetchMap = useCallback(async (userObject?: any) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {

      let stateObj: State;
      if (userObject !== undefined) {
        stateObj = getStateById(userObject) as State;
      }
      let stateId = userObject !== undefined ? stateObj!.stateId : userData.stateId;
      let stateName = userObject !== undefined ? stateObj!.StateName : userData.state!;

      const statsData = await viralloadAgeData(stateId);
      const reportDates: any = await getReportDatesData(stateId);

      let vl_stats = {
        txCurr: getLastElemnts(statsData.txCurr),
        eligible: getLastElemnts(statsData.eligible),
        sampleCollection: getLastElemnts(statsData.sampleCollection),
        resultRecieved: getLastElemnts(statsData.resultRecieved),
        suppression: getLastElemnts(statsData.suppression),
        unSuppression: getLastElemnts(statsData.resultRecieved) - getLastElemnts(statsData.suppression)
      }
      if (reportDates == null) {
        return;
      }
      const data = await viralloadData(stateId, getLastElemnts(reportDates.retentionReportDates));
      if (!data.vl_lga) {
        throw new Error('Data is undefined');
      }

      const map = await getMap(stateName?? undefined);
      const suppressionData = (stateName !== '') ? await getSuppressionData(data.vl_lga) : await getNigeriaMapForSupressionData(data.vl_states);
      const coverageData = (stateName !== '') ? await getCoverageData(data.vl_lga) : await getNigeriaMapForCoverageData(data.vl_states);

      setState({
        loading: false,
        statsData: vl_stats,
        vlCoverage: (stateName !== '') ? hivMap(map, coverageData, VLC_BY_LGA_MAP_TITLE, 800) :
          hivStateMap(map, coverageData, VLC_BY_STATE_MAP_TITLE, 820),
        vlSuppression: (stateName !== '') ? hivMap(map, suppressionData, VLS_BY_LGA_MAP_TITEL, 800) :
          hivStateMap(map, suppressionData, VLS_BY_STATE_MAP_TITLE, 820),
      });
    } catch (error) {
      console.error(ERROR_FETCHING_DATA, error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [userData.state, userData.stateId]);

  const handleValueChange = (newValue: string) => {
    fetchMap(newValue);
  };

  useEffect(() => {

    if (filteredState) {
      handleValueChange(filteredState);
    } else {
      fetchMap();
    }
  }, [fetchMap, filteredState]);

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Viralload Report Dashboard" />
      <div className="row">
        {state.loading ? (
          <Shimmer />
        ) : (<div className="col-12 col-md-12">
          <div className="row">
            <div className="col-2 col-md-2">

              <SmallCard title="HIV Clients on Treatment" value={state.statsData.txCurr} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Eligible for VL" value={state.statsData.eligible} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Sample Collected" value={state.statsData.sampleCollection} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Result Received" value={state.statsData.resultRecieved} />
            </div>
            <div className="col-2 col-md-2">

              <SmallCard title="Viral load < 1000 cop /mil" value={state.statsData.suppression} />
            </div>
            <div className="col-1 col-md-1">

              <SmallCard title="Coverage" value={`${Math.round((state.statsData.resultRecieved / state.statsData.eligible) * 100)}%`} />
            </div>
            <div className="col-1 col-md-1">

              <SmallCard title="Supression" value={`${Math.round((state.statsData.suppression / state.statsData.resultRecieved) * 100)}%`} />
            </div>

          </div>
        </div>)}
        {state.loading ? (
          <Shimmer />
        ) : (
          <div className="col-12 col-md-6">
            <HighchartsReact
              constructorType="mapChart"
              highcharts={Highcharts}
              options={state.vlCoverage}
            />
          </div>)}
        {state.loading ? (
          <Shimmer />
        ) : (
          <div className="col-12 col-md-6">
            <HighchartsReact
              constructorType="mapChart"
              highcharts={Highcharts}
              options={state.vlSuppression}
            />
          </div>)}
      </div>
    </div>
  );
};

export default VlDashboard;
