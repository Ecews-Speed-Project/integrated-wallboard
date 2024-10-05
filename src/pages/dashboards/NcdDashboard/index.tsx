import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { dualColumn, getMap, getMapData, stateMaps } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

highchartsMap(Highcharts);

const NcdDashboard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [state, setState] = useState({
    chartData: {},
    columnChartData: {},
    loading: false,
  });

  const fetchMap = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const map = await getMap(userData.state ?? undefined);
      const mapData = await getMapData(userData.state ?? undefined);
      setState({
        chartData: stateMaps(map, mapData, `No of Clients with elevated BP by LGA`, 500),
        columnChartData: dualColumn('Elevated BP cascade'),
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching map data:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [userData.state]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  return (
    <div className="bg-container container-fluid mt-2">
      <BreadCrumb state={userData.state ?? 'Unknown State'} page="Noncommunicable Diseases Dashboard" />
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="border">
            <div className="card mb-2 yellow-card">
              <div className="card-body">
                <h5 className="medium-card-title">89%</h5>
                <p className="medium-card-text">of ART clinic attendees screened for BP</p>
              </div>
            </div>
            <div className="card mb-2 green-card">
              <div className="card-body">
                <h5 className="medium-card-title">21%</h5>
                <p className="medium-card-text">Had elevated BP</p>
              </div>
            </div>
            <div className="card mb-3 light-green-card">
              <div className="card-body">
                <h5 className="medium-card-title card-title light-green">70%</h5>
                <p className="medium-card-text card-text light-green">With Elevated BP, Diagnosed</p>
              </div>
            </div>
            <div className="card mb-3 dark-green-card">
              <div className="card-body">
                <h5 className="medium-card-title card-title dark-green">70%</h5>
                <p className="medium-card-text card-text dark-green">Commenced treatment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="mb-4">
            <HighchartsReact
              constructorType="mapChart"
              highcharts={Highcharts}
              options={state.chartData}
            />
          </div>
          <HighchartsReact
            constructorType="mapChart"
            highcharts={Highcharts}
            options={state.columnChartData}
          />
        </div>
      </div>
    </div>
  );
};

export default NcdDashboard;
