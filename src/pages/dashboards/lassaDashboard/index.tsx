import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getMap, getNigeriaMapForSomasData, getSomaLiveMapData, hivStateMap, mapChat, somasMap, stateMaps } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import SmallCard from '../../../components/SmallCard';
import { summaryApiData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DiseaseData, ConfirmedCasesByLGA, LGAData, Totals } from '../../../types/interfaces';
import SmallCard20x from '../../../components/SmallCard20x';

highchartsMap(Highcharts);

const LassaDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [chartData, setChartData] = useState({});
  const [chart1Data, setChart1Data] = useState({});

  const [loading, setLoading] = useState(false);
  const [lassaCases, setLassaCases] = useState<DiseaseData>({
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
        const { lassa, lga } = current;
        totals.lassa.suspectedCases += lassa.suspectedCases;
        totals.lassa.confirmedCases += lassa.confirmedCases;
        totals.lassa.evaluatedCases += lassa.evaluatedCases;
        totals.lassa.rdtRapidDiagnostictestPositive += lassa.rdtRapidDiagnostictestPositive;
        totals.lassa.cultured += lassa.cultured;

        confirmedCases[lga] = (confirmedCases[lga] || 0) + lassa.confirmedCases;
      });

      setLassaCases(totals.lassa);

      const map = await getMap(userData.state);
      const mapData = await getSomaLiveMapData(Object.entries(confirmedCases).map(([lga, value]) => ({ lgaName: lga, value })));

      setChartData(somasMap(map, mapData, `Confirmed cases of Lassa fever by LGA in ${userData.state} state`, 800));
      setChart1Data(mapChat(map, mapData, `Lassa in ${userData.state} state`, 800));

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [userData.state, userData.stateId]);

  const fetchMapBysate = useCallback(async () => {
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
        const { lassa, lga } = current;
        totals.lassa.suspectedCases += lassa.suspectedCases;
        totals.lassa.confirmedCases += lassa.confirmedCases;
        totals.lassa.evaluatedCases += lassa.evaluatedCases;
        totals.lassa.rdtRapidDiagnostictestPositive += lassa.rdtRapidDiagnostictestPositive;
        totals.lassa.cultured += lassa.cultured;

        confirmedCases[lga] = (confirmedCases[lga] || 0) + lassa.confirmedCases;
      });

      setLassaCases(totals.lassa);

      const map = await getMap(userData.state);
      const mapData = await getNigeriaMapForSomasData(confirmedCases);

      setChartData(hivStateMap(map, mapData, `Confirmed cases of Lassa Fever by states`, 800));
      setChart1Data(mapChat(map, mapData, `Lassa cases  trend  by state`, 800))

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [userData.state, userData.stateId]);

  useEffect(() => {
    if (userData.state !== '') {
      fetchMap();
    } else {
      fetchMapBysate()
    }
  }, [fetchMap]);

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Lassa Fever Dashboard" />
      <div className="row">
        <div className="col-6 col-md-6">
          <div className="col-12 col-md-12 row">
            <div className="col-6 col-md-6">
              <SmallCard20x title="Total Suspected Cases of Cholera" color={"green1"} value={lassaCases.suspectedCases.toString()} />
            </div>
            <div className="col-6 col-md-6">
              <SmallCard20x title="Total Patients with Rapid Diagnosis Test" color={"green2"} value={lassaCases.evaluatedCases.toString()} />
            </div>

            <div className="col-12 col-md-12">
              <SmallCard20x title="Total Patients Cultured" color={"green3"} fontColourNumber={"white-color-number"} fontColour={"white-color"} value={lassaCases.confirmedCases.toString()} />
            </div>
          </div>

          <div className="col-12 col-md-12">
            <HighchartsReact
              highcharts={Highcharts}
              options={chart1Data}
            />
          </div>
        </div>

        <div className="col-6 col-md-6">
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

export default LassaDashboard;
