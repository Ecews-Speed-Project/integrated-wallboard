import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getLiveMapData, getMap, getNigeriaMapData, hivMap, hivStateMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getReportDatesData, retentionData, viralloadAgeData } from '../../../services/main.service';
import { getLastElemnts, getStateById, getStateDetails, Shimmer, State, StateData, Totals } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { StatCard } from '../../../components/StatCard';
import { Check, Bookmark, Lightbulb } from 'lucide-react';
import { ERROR_FETCHING_DATA, TEATMENT_LGA_MAP_TITLE, TREATMENT_MAP_TITLE } from '../../../utils/constants';

highchartsMap(Highcharts);

const TreatmentDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const value = useSelector((state: RootState) => state.menu.value);

  const [state, setState] = useState({
    chartData: {},
    loading: false,
    statsData: {} as { [key: string]: any },
    result: {} as StateData | Totals,
  });

  const fetchMap = useCallback(async (userObject?: any) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    let stateObj: State;
    const reportDates: any = await getReportDatesData(userData.stateId);
    if (userObject !== undefined) {
      stateObj = getStateById(userObject) as State;
    }

    let stateId = userObject !== undefined ? stateObj!.stateId : userData.stateId;
    let stateName = userObject !== undefined ? stateObj!.StateName : userData.state!;

    try {
      const flatFile = await viralloadAgeData(stateId);
      let vl_stats = {
        txCurr: getLastElemnts(flatFile.txCurr),
        txNew: getLastElemnts(flatFile.txNew),
        uniquePatients: getLastElemnts(flatFile.txCurr),
        matchPatients: getLastElemnts(flatFile.txCurr),
      };

      if (reportDates == null) {
        return;
      }

      const data = await retentionData(stateId, getLastElemnts(reportDates.retentionReportDates));
      const map = await getMap(stateName ?? undefined);
      const mapData =
        stateName !== '' ? await getLiveMapData(data.tx_curr_lga) : await getNigeriaMapData(data.tx_cur_states);

      setState({
        chartData:
          stateName !== ''
            ? hivMap(map, mapData, TEATMENT_LGA_MAP_TITLE, 820)
            : hivStateMap(map, mapData, TREATMENT_MAP_TITLE, 820),
        loading: false,
        statsData: vl_stats,
        result: getStateDetails(stateName),
      });
    } catch (error) {
      console.error(ERROR_FETCHING_DATA, error);
      setState((prevState) => ({ ...prevState, loading: true }));
    }
  }, [userData.state, value]);

  const handleValueChange = (newValue: string) => {
    fetchMap(newValue);
  };

  useEffect(() => {
    if (value) {
      handleValueChange(value);
    } else {
      fetchMap();
    }
  }, [fetchMap, value]);

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="HIV Treatment Dashboard" />
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="grid grid-row-3 gap-2">
            {state.loading ? (
              <Shimmer />
            ) : (
              <>
                <StatCard icon={Check} count={state.statsData.txCurr} label="Active HIV patients" bgColor="main-card1" highlightColor="bg-emerald-500/20" />
                <StatCard icon={Lightbulb} count={state.statsData.txNew} label="New Patients Enrolled into care" bgColor="main-card2" highlightColor="bg-amber-500/20" />
                <StatCard icon={Bookmark} count={state.result.ndr_unique} label="Total Unique Patients" bgColor="main-card1" highlightColor="bg-slate-700/50" />
                <StatCard icon={Bookmark} count={state.result.ndr_match_outcome} label="Total Unique Patients" bgColor="main-card4" highlightColor="bg-slate-700/50" />
              </>
            )}
          </div>
        </div>
        <div className="col-12 col-md-8">
        {state.loading ? (
              <Shimmer />
            ) : (
              <>
            <HighchartsReact constructorType="mapChart" highcharts={Highcharts} options={state.chartData} />
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentDashboard;
