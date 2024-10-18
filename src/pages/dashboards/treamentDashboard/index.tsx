import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getLiveMapData, getMap, hivMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { retentionData } from '../../../services/main.service';
import { handleSearch } from '../../../utils/helpers';
import { GenericObject } from '../../../types/dseaseData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { StatCard } from '../../../components/StatCard';
import { Check, Bookmark, Lightbulb, MoreHorizontal } from 'lucide-react';

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
			if (!data?.stats?.saturation) {
				throw new Error('Data is undefined');
			}
			const stats = handleSearch(data?.stats?.saturation, userData.stateId);
			const map = await getMap(userData.state ?? undefined);
			const mapData = await getLiveMapData(data.tx_curr_lga);

			setState({
				chartData: hivMap(map, mapData, 'Percentage of Unique Clients by LGA', 820),
				loading: false,
				statsData: data?.stats,
				retentionD: stats,
			});

			console.log(state.chartData)
		} catch (error) {
			console.error('Error fetching map data:', error);
			setState((prevState) => ({ ...prevState, loading: false }));
			window.location.href = '/login'; // Redirect to login page

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
					<div className="grid grid-row-3 gap-2">
						<StatCard
							icon={Check}
							count={1500}
							label="Active HIV patients"
							bgColor="main-card1"
							highlightColor="bg-emerald-500/20"
						/>
						<StatCard
							icon={Lightbulb}
							count={903}
							label="New Patients Enrolled into care"
							bgColor="main-card2"
							highlightColor="bg-amber-500/20"
						/>
						<StatCard
							icon={Bookmark}
							count={1112}
							label="Total Unique Patients"
							bgColor="main-card1"
							highlightColor="bg-slate-700/50"
						/>
							<StatCard
							icon={Bookmark}
							count={1112}
							label="Total Unique Patients"
							bgColor="main-card4"
							highlightColor="bg-slate-700/50"
						/>
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
