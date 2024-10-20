import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getLiveMapData, getMap, getNigeriaMapData, hivMap, hivStateMap } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { retentionData, viralloadAgeData } from '../../../services/main.service';
import { getLastElemnts} from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { StatCard } from '../../../components/StatCard';
import { Check, Bookmark, Lightbulb, MoreHorizontal } from 'lucide-react';
import { ERROR_FETCHING_DATA, TEATMENT_LGA_MAP_TITLE, TREATMENT_MAP_TITLE } from '../../../utils/constants';

highchartsMap(Highcharts);

const TreamentDashboard: FunctionComponent = () => {
	const userData = useSelector((state: RootState) => state.auth);

	const [state, setState] = useState({
		chartData: {},
		loading: false,
		statsData: {} as { [key: string]: any },
	});

	const fetchMap = useCallback(async () => {
		setState((prevState) => ({ ...prevState, loading: true }));
		try {
			const flatFile = await viralloadAgeData(userData.stateId);

			let vl_stats = {
				txCurr: getLastElemnts(flatFile.txCurr),
				txNew: getLastElemnts(flatFile.txNew),
				uniquePatients: getLastElemnts(flatFile.txCurr),
				matchPatients: getLastElemnts(flatFile.txCurr),
			}

			const data = await retentionData(userData.stateId);
			const map = await getMap(userData.state ?? undefined);
			const mapData = (userData.state !== '') ? await getLiveMapData(data.tx_curr_lga) : await getNigeriaMapData(data.tx_cur_states);

			setState({
				chartData: (userData.state !== '') ?
					hivMap(map, mapData, TEATMENT_LGA_MAP_TITLE, 820) :
					hivStateMap(map, mapData, TREATMENT_MAP_TITLE, 820),
				loading: false,
				statsData: vl_stats,
			});

		} catch (error) {
			console.error(ERROR_FETCHING_DATA, error);
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
					<div className="grid grid-row-3 gap-2">
						<StatCard
							icon={Check}
							count={state.statsData.txCurr}
							label="Active HIV patients"
							bgColor="main-card1"
							highlightColor="bg-emerald-500/20"
						/>
						<StatCard
							icon={Lightbulb}
							count={state.statsData.txNew}
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
							label="Total Match Patients"
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
