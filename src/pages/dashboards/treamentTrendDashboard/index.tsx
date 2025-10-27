import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import { Check, Bookmark, Lightbulb } from 'lucide-react';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { StatCard } from '../../../components/StatCard';
import { buildLineChat, seriesDataObj } from '../../../utils/chatUtils/lineChart';
import { butterFly } from '../../../utils/chatUtils/butterflyChart';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { treamenTtrend, viralloadAgeData } from '../../../services/main.service';
import { getLastElemnts, getStateById, getStateDetails, Shimmer, State, StateData, Totals } from '../../../utils/helpers';



interface DataItem {
	month: string;
	year: number;
	value: number;
}


const Dashboard: React.FC = () => {

	const hasFetched = useRef(false);
	const userData = useSelector((state: RootState) => state.auth);
	const filteredState = useSelector((state: RootState) => state.menu.value);

	const [state, setState] = useState({
		chartData: {},
		ageAndSex: {},
		loading: false,
		result: {} as StateData | Totals,
		statsData: {} as { [key: string]: any },

	});

	useEffect(() => {
		setState((prevState) => ({ ...prevState, loading: true }));
		const fetchMap = async (userObject?: any) => {
			try {
				let stateObj: State;
				if (userObject !== undefined) {
					stateObj = getStateById(userObject) as State;
				}
				let stateId = userObject !== undefined ? stateObj!.stateId : userData.stateId;
				let stateName = userObject !== undefined ? stateObj!.StateName : userData.state!;

				const data = await treamenTtrend(stateId);
				const flatFile = await viralloadAgeData(stateId);

				let vl_stats = {
					txCurr: getLastElemnts(flatFile.txCurr),
					txNew: getLastElemnts(flatFile.txNew),
					uniquePatients: getLastElemnts(flatFile.txCurr),
					matchPatients: getLastElemnts(flatFile.txCurr),
				}

				let categoriesData: string[] = [];
				let seriesData: any = [];
				if (data.dhis_data.tX_CURR != null) {
					data.dhis_data.tX_CURR.trends.filter((trend: any) => trend.month !== "November" && trend.month !== "December")
						.map((trend: any) =>
							trend.month === "October" ? { ...trend, value: getLastElemnts(flatFile.txCurr) } : trend
						).forEach((item: DataItem) => {
							categoriesData.push(`${item.month} ${item.year}`);
							seriesData.push(item.value);
						});
				}

				setState((prevState) => ({
					chartData: buildLineChat(`TX_CURR Trend for the last ${seriesData.length} months`, categoriesData, seriesDataObj(stateName, seriesData), 600),
					ageAndSex: butterFly('TX_CURR by age and sex', 'Percentage of Unique Clients', categoriesData),
					statsData: vl_stats,
					loading: false,
					result: getStateDetails(stateName)
				}));
				console.log(state.chartData)
			} catch (error) {
				console.error('Error fetching map data:', error);
				setState((prevState) => ({ ...prevState, loading: true }));
			}
		};

		if (!hasFetched.current) {
			fetchMap();
			hasFetched.current = true;
		}

		const handleValueChange = (newValue: string) => {
			fetchMap(newValue);
		};

		if (filteredState) {
			handleValueChange(filteredState);
		} else {
			fetchMap();
		}

	}, [userData.stateId, filteredState]);

	return (
		<div className={`max-w-12xl mx-auto p-6 space-y-6  transition-opacity duration-500`}>
			<DynamicBreadCrumb page="HIV Treatment Dashboard" />
			{state.loading ? (
				<Shimmer />
			) : (<Card className="bg-emerald-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 banner" >
				<CardContent className="p-8 flex justify-between items-center">
					<div className="space-y-3 max-w-lg">
						<h1 className="banner-text text-3xl font-bold  tracking-tight" style={{ color: '#000 !importent' }}>Quarter ends in 33  days</h1>
						<h2 className="banner-text text-2xl font-bold  tracking-tight">TX_CURR on the NDR today is {state.result.ndr_tx_curr}</h2>
						<p className=" banner-text text-white/90 text-sm leading-relaxed">
							22 Reporting Facilities  have upload (100%)
						</p>
					</div>
					<div className="relative">
						<img
							src="/icons/hiv.svg"
							alt="Student"
							style={{ width: '150px' }}
							className="rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
						/>
					</div>
				</CardContent>
			</Card>
			)
			}

			{state.loading ? (
				<Shimmer />
			) : (
				<div className="grid grid-cols-3 gap-6">
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
						count={state.result.ndr_unique}
						label="Total Unique Patients"
						bgColor="main-card1"
						highlightColor="bg-slate-700/50"
					/>
				</div>)}

			<div className="flex gap-6">
				<Card className="col-md-12 flex-grow rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
					<HighchartsReact
						highcharts={Highcharts}
						options={state.chartData}
					/>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;

