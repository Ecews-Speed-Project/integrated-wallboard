import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getLiveMapData, getMap, hivMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { retentionData } from '../../../services/main.service';
import { handleSearch } from '../../../utils/helpers';
import { GenericObject } from '../../../types/dseaseData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';

highchartsMap(Highcharts);

const TreamentDashboard: FunctionComponent = () => {
	const userData = useSelector((state: RootState) => state.auth);

	const [state, setState] = useState({
		chartData: {},
		loading: false,
		statsData: {} as { [key: string]: any },
		retentionD: {} as GenericObject,
	});

	const fetchMap = useCallback(async () => {
		setState((prevState) => ({ ...prevState, loading: true }));
		try {
			const data = await retentionData(userData.stateId);
			const stats = handleSearch(data?.stats?.saturation, userData.stateId);
			const map = await getMap(userData.state ?? undefined);
			const mapData = await getLiveMapData(data.tx_curr_lga);

			setState({
				chartData: hivMap(map, mapData, 'Percentage of Unique Clients by LGA', 800),
				loading: false,
				statsData: data?.stats,
				retentionD: stats,
			});
		} catch (error) {
			console.error('Error fetching map data:', error);
			setState((prevState) => ({ ...prevState, loading: false }));
		}
	}, [userData.state, userData.stateId]);

	useEffect(() => {
		fetchMap();
	}, [fetchMap]);

	return (
		<div className="bg-container container-fluid mt-2">
			<DynamicBreadCrumb page="HIV Treatment Dashboard" />

			<div className="row">
				<div className="col-12 col-md-4">
					<div className="border">
						<div className="card mb-2 yellow-card">
							<div className="card-body">
								<h5 className="card-title font68">{state.retentionD?.facilities ?? ''}</h5>
								<p className="card-text">
									Total facilities offering HIV care to patients in {userData.state ?? 'Unknown'} state.
								</p>
							</div>
						</div>
						<div className="card mb-2 green-card">
							<div className="card-body">
								<h5 className="card-title font68">{state.statsData?.tx_curr}</h5>
								<p className="card-text">
									Total patients receiving HIV treatment across all facilities in {userData.state ?? 'Unknown'} state.
								</p>
							</div>
						</div>
						<div className="card mb-2 light-green-card">
							<div className="card-body">
								<h5 className="card-title light-green font68">{state.statsData?.uniqueFingerprints}</h5>
								<p className="card-text light-green">
									Total patients with Unique Fingerprints across all facilities in {userData.state ?? 'Unknown'} state.
								</p>
							</div>
						</div>
						<div className="card mb-3 dark-green-card">
							<div className="card-body">
								<h5 className="card-title dark-green font68">{state.retentionD?.saturation1 ?? ''}%</h5>
								<p className="card-text dark-green">Treatment Saturation.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-8">
					<HighchartsReact
						constructorType="mapChart"
						highcharts={Highcharts}
						options={state.chartData}
					/>
				</div>
			</div>
		</div>
	);
};

export default TreamentDashboard;
