import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { viralloadAgeData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { dualAxisChart } from '../../../utils/chatUtils/dualAxisChart';
import patternFill from 'highcharts/modules/pattern-fill';
import { getLastElemnts, getStateById, removeElemnts, removeLastElemnts, Shimmer, State } from '../../../utils/helpers';

// Initialize the pattern-fill module
patternFill(Highcharts);
const VlAgeDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);
  const filteredState = useSelector((state: RootState) => state.menu.value);

  const [state, setState] = useState({
    statsData: {} as { [key: string]: any },
    vlChart: {},
    loading: false
  });



  const fetchMap = useCallback(async (userObject?: any) => {
    setState((prevState) => ({ ...prevState, loading: true }));

    try {

      let stateObj: State;
      if (userObject !== undefined) {
        stateObj = getStateById(userObject) as State;
      }
      let stateId = userObject !== undefined ? stateObj!.stateId : userData.stateId;

      const data = await viralloadAgeData(stateId);
      let ageGroups = removeElemnts(data.ageGroups)

      let eligible: [] = data.eligible;
      let sampleCollection: [] = data.sampleCollection;
      let resultRecieved: [] = data.resultRecieved;
      let suppression: [] = data.suppression;

      let series = {
        eligible: removeLastElemnts(eligible),
        sampleCollection: removeLastElemnts(sampleCollection),
        resultRecieved: removeLastElemnts(resultRecieved),
        suppression: removeLastElemnts(suppression)
      }

      let vl_stats = {
        txCurr: getLastElemnts(data.txCurr),
        eligible: getLastElemnts(eligible),
        sampleCollection: getLastElemnts(sampleCollection),
        resultRecieved: getLastElemnts(resultRecieved),
        suppression: getLastElemnts(suppression),
        unSuppression: getLastElemnts(resultRecieved) - getLastElemnts(suppression)
      }

      setState((prevState) => ({
        statsData: vl_stats,
        loading: false,
        vlChart: dualAxisChart('Viralload suppression by age and sex', '', '', ageGroups, series),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prevState) => ({ ...prevState, loading: true }));
    }
  }, [userData.stateId]);

  const handleValueChange = (newValue: string) => {
    fetchMap(newValue);
  };



  useEffect(() => {

    if (filteredState) {
      handleValueChange(filteredState);
    } else {
      fetchMap();
    }

  }, [userData.stateId, filteredState]);


  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Viralload Report By Age and Sex Dashboard" />
      <div className="row">
        {state.loading ? (
          <Shimmer />
        ) : (<div className="col-12 col-md-12">
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
        </div>)}
        {state.loading ? (
          <Shimmer />
        ) : (<div className="col-12 col-md-12">
          <HighchartsReact highcharts={Highcharts} options={state.vlChart} />
        </div>)}

      </div>

    </div>
  );
};

export default VlAgeDashboard;
