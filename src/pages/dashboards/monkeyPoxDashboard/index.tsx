import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getMap, getSomaLiveMapData, stateMaps } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { summaryApiData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DiseaseData, ConfirmedCasesByLGA, LGAData, Totals } from '../../../types/interfaces';

highchartsMap(Highcharts);

const MonkeyPoxDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [monkeyPoxCases, setMonkeyPoxCases] = useState<DiseaseData>({
    suspectedCases: 0,
    confirmedCases: 0,
    evaluatedCases: 0,
    rdtRapidDiagnostictestPositive: 0,
    cultured: 0,
  });

  const fetchMap = useCallback(async () => {
    setLoading(true);
    try {
      const data: { diseaseCascade: LGAData[] } = await summaryApiData(userData.stateId);
      const confirmedCases: ConfirmedCasesByLGA = {};

      const totals: Totals = {
        cholera: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        lassa: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        measles: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        yellowFever: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        monkeyPox: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        covid19: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
        diphtheria: { suspectedCases: 0, confirmedCases: 0, evaluatedCases: 0, rdtRapidDiagnostictestPositive: 0, cultured: 0 },
      };

      data.diseaseCascade.forEach((current) => {
        const { monkeyPox, lga } = current;
        totals.monkeyPox.suspectedCases += monkeyPox.suspectedCases;
        totals.monkeyPox.confirmedCases += monkeyPox.confirmedCases;
        totals.monkeyPox.evaluatedCases += monkeyPox.evaluatedCases;
        totals.monkeyPox.rdtRapidDiagnostictestPositive += monkeyPox.rdtRapidDiagnostictestPositive;
        totals.monkeyPox.cultured += monkeyPox.cultured;

        confirmedCases[lga] = (confirmedCases[lga] || 0) + monkeyPox.confirmedCases;
      });

      setMonkeyPoxCases(totals.monkeyPox);

      const map = await getMap(userData.state);
      const mapData = await getSomaLiveMapData(Object.entries(confirmedCases).map(([lga, value]) => ({ lgaName: lga, value })));

      setChartData(stateMaps(map, mapData, `Confirmed cases of Monkey Pox by LGA in ${userData.state} state`, 800));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [userData.state, userData.stateId]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Monkey Pox Dashboard" />
      <div className="row">
        <div className="col-12 col-md-12 row">
            <SmallCard title="Total Suspected Cases of Monkey Pox" value={monkeyPoxCases.suspectedCases.toString()} />
            <SmallCard title="Total Patients Evaluated" value={monkeyPoxCases.evaluatedCases.toString()} />
            <SmallCard title="Confirmed Cases" value={monkeyPoxCases.confirmedCases.toString()} />
        </div>
        <div className="col-12 col-md-12">
          <HighchartsReact
            constructorType={'mapChart'}
            highcharts={Highcharts}
            options={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default MonkeyPoxDashboard;
